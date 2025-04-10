import React from 'react'
import axios from "./authConfig";
import { useEffect } from "react";
import { useState } from "react";
import DOMPurify from "dompurify";
import { Link, useNavigate,useLocation } from "react-router-dom";
const Home = () => {

  const [posts, setPosts] = useState([]);

  const cat = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

 
    const { pathname } = useLocation();

  return (
    <div className="home">
      {pathname=="/" &&( <div className="compass"> 
        <p className="intro"> Welcome to <b className="career">Career Compass</b> ,your trusted platform for connecting with individuals who share their career journeys. Discover inspiring experiences, gain valuable insights, and share your own story to guide and empower others on their path to success. 
        </p>
        </div>)}
     
     
    <div className="posts">
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <div className="img">
            <img src={`./upload/${post.img}`} alt="" />
          </div>
          <div className="content">
            <div className="link">
              <h1>{post.title}</h1>
            </div>
            <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p> 
           <Link  to={`/post/${post.id}`}><button>Read More</button></Link> 
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Home 


