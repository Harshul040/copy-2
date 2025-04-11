import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    console.log("Register endpoint hit");
    console.log("Request Body:", req.body);

    const q = "SELECT * FROM \"user\" WHERE email = $1 OR username = $2";
    db.query(q, [req.body.email, req.body.username], (err, result) => {
        if (err) {
            console.error("Error in SELECT query:", err);
            return res.status(500).json("Database error during user lookup");
        }

        if (result.rows.length) {
            console.log("User already exists:", result.rows);
            return res.status(409).json("User already exists");
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        console.log("Hashed Password:", hash);

        const insertQuery = "INSERT INTO \"user\" (username, email, password) VALUES ($1, $2, $3)";
        const values = [req.body.username, req.body.email, hash];

        db.query(insertQuery, values, (err, result) => {
            if (err) {
                console.error("Error in INSERT query:", err);
                return res.status(500).json("Database error during user creation");
            }
            console.log("User created:", result);
            return res.status(200).json("User has been created");
        });
    });
};

export const login = (req, res) => {
    const q = "SELECT * FROM \"user\" WHERE username = $1";

    db.query(q, [req.body.username], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.rows.length === 0) return res.status(404).json("User not found!");

        const user = result.rows[0];

        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!isPasswordCorrect)
            return res.status(400).json("Wrong username or password!");

        const token = jwt.sign({ id: user.id }, "jwtkey");
        const { password, ...other } = user;

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: false, // change to true if using HTTPS
            sameSite: 'strict',
        }).status(200).json(other);
    });
};

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true,
    }).status(200).json("User has been logged out.");
};
