/*
import React, { useState ,useEffect} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "./authConfig"
import { useLocation } from "react-router-dom";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Write =() => {
    const state=useLocation().state
    const [value,setValue]=useState(state?.desc || "");
    const [title,setTitle]=useState(state?.title || "");
    const [file,setFile]=useState(null);
    const [cat,setCat]=useState(state?.cat || "");

    

    const upload = async ()=>{
        try{
            const formData = new FormData();
            formData.append("file",file);
            const res = await axios.post("/upload",formData);
            return res.data;
        }catch(err){
            console.log(err)
        }
    }
   

    const handleClick = async (e)=>{
        e.preventDefault();
        const imgUrl = await upload();
        try {
            state
              ? await axios.put(`/posts/${state.id}`, {
                  title,
                  desc: value,
                  cat,
                  img: file ? imgUrl : state?.img,  
                })
              : await axios.post(`/posts`, {
                  title,
                  desc: value,
                  cat,
                  img: file ? imgUrl : "",
                  date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                });
        } catch(err) {
            console.log(err);
        }
    }
       
    
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="add">
            {currentUser==null && <h1>please login to write</h1>}
            {currentUser!=null && <div className="content">
                <input className="text" value={title} placeholder='Title' onChange={e=>setTitle(e.target.value)}/>
                <div className="editorContainer">
                    <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
                </div>
            </div>}
            {currentUser!=null && <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b> Draft
                    </span>
                    <span>
                        <b>Visibility: </b> Public
                    </span>
                    <input style={{display:"none"}} type="file" id="file" onChange={e=>setFile(e.target.files[0])}/>
                    <label className="file" htmlFor="file">Upload image</label>
                    <div className="buttons">
                        <button>Save as draft</button>
                        <button onClick={handleClick}>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                    <input type="radio" checked={cat==="software"} name="cat" value="software" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="software">Software </label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={cat==="consulting"} name="cat" value="consulting" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="consulting">Consulting</label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={cat==="finance"} name="cat" value="finance" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="finance">Finance </label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={cat==="quant"} name="cat" value="quant" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="quant">Quant </label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={cat==="analytics"} name="cat" value="analytics" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="analytics">Analytics </label>
                    </div>
                    
                    <div className="cat">
                    <input type="radio" checked={cat==="core"} name="cat" value="core" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="core">Core </label>
                    </div>
                </div>
             </div>}
        </div>
    )
}

export default Write
*/
import React, { useState, useEffect, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "./authConfig";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/authContext";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const [successMsg, setSuccessMsg] = useState("");

  const { currentUser } = useContext(AuthContext);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = file ? await upload() : state?.img;
    try {
      if (state) {
        await axios.put(`/posts/${state.id}`, {
          title,
          desc: value,
          cat,
          img: imgUrl,
        });
      } else {
        await axios.post(`/posts`, {
          title,
          desc: value,
          cat,
          img: imgUrl || "",
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        });
      }
      setSuccessMsg("✅ Post published successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (successMsg) {
      const timeout = setTimeout(() => {
        setSuccessMsg("");
      }, 3000); // Hide message after 3 sec

      return () => clearTimeout(timeout);
    }
  }, [successMsg]);

  return (
    <div className="add">
      {/* ✅ Success Message */}
      {successMsg && (
        <div className="success-message">
          {successMsg}
        </div>
      )}

      {currentUser == null && <h1>please login to write</h1>}
      {currentUser != null && (
        <div className="content">
          <input
            className="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="editorContainer">
            <ReactQuill
              className="editor"
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
      )}
      {currentUser != null && (
        <div className="menu">
          <div className="item">
            <h1>Publish</h1>
            <span>
              <b>Status: </b> Draft
            </span>
            <span>
              <b>Visibility: </b> Public
            </span>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label className="file" htmlFor="file">
              Upload image
            </label>
            <div className="buttons">
              <button>Save as draft</button>
              <button onClick={handleClick}>Publish</button>
            </div>
          </div>
          <div className="item">
            <h1>Category</h1>
            {[
              "software",
              "consulting",
              "finance",
              "quant",
              "analytics",
              "core",
            ].map((category) => (
              <div className="cat" key={category}>
                <input
                  type="radio"
                  checked={cat === category}
                  name="cat"
                  value={category}
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Write;
