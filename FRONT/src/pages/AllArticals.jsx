import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import './all-articals.css'
const AllArticals = () => {
  const auth = useAuth();
  const [articles, setArticles] = useState([]);
  const [sousArticles, setSousArticles] = useState([]);
  const navigate = useNavigate();
  const [reload, setReload] = useState(false)
  console.log(reload,"tt")
useEffect(() => {

}, [reload])

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/article/all-articles");
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [reload]);

  useEffect(() => {
    const fetchSousArticles = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/sous-article/all-sous-articles`);
        setSousArticles(response.data);
      } catch (error) {
        console.error("Error fetching sous articles:", error);
      }
    };
    fetchSousArticles();
  }, [reload]);

  const handleDemande = async (id) => {
    try {
      const user_id = auth?.user?._id;
      if (user_id) {
        const response = await axios.get(`http://localhost:5000/api/v1/article/getbyid-articles/${id}`);
        const existingInscri = response.data.inscri || [];
        const updatedInscri = [...existingInscri, user_id];
        const result = await axios.put(`http://localhost:5000/api/v1/article/demande/${id}`, { inscri: updatedInscri });
        console.log("Demande result:", result.data);
        setReload(!reload); // Reload the page

      } else {
        console.error("User ID is not available");
      }
    } catch (error) {
      console.error("Error in handleDemande:", error);
    }
  }; 

  const handlediscard = async (id) => {
    try {
      const user_id = auth?.user?._id;
      if (user_id) {
        const response = await axios.get(`http://localhost:5000/api/v1/article/getbyid-articles/${id}`);
        const existingInscri = response.data.inscri || [];
        const updatedInscri = existingInscri.filter(userId => userId !== user_id);
        const result = await axios.put(`http://localhost:5000/api/v1/article/demande/${id}`, { inscri: updatedInscri });
        console.log("Discard result:", result.data);
        setReload(!reload); // Reload the page

      } else {
        console.error("User ID is not available");
      }
    } catch (error) {
      console.error("Error in handlediscard:", error);
    }
  };

  return (
    <>
<div className='all-ar-card'>
<div  className='artical-wrapper'>

  {articles?.map((ar) => (
      <div className='artical-card'>
      
        <div className="ar-card-button">
          
        <h3> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-text" viewBox="0 0 16 16">
  <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
  <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
</svg>
{ar.title && ar.title.slice(0, 15)}</h3>
        <div>
        {ar.userlist && ar.userlist.includes(auth?.user?._id) ? null : (
          <>
            {ar.inscri && ar.inscri.includes(auth?.user?._id) ? (
              <button style={{width:"70px",height:"30px",backgroundColor:"red",color:"white",border:"none",borderRadius:"5px"}} onClick={() => handlediscard(ar._id)}>Discard</button>
            ) : (
              <button style={{width:"70px",height:"30px",backgroundColor:"#06bd06b5",color:"white",border:"none",borderRadius:"5px"}} onClick={() => handleDemande(ar._id)}>Request</button>
            )}
          </>
        )}
        </div>
       
        </div>
    
      
        <hr />
        {sousArticles?.filter((sa) => sa?.article_id === ar._id).map((sa) => (
          <>
            {ar.userlist && ar.userlist.includes(auth?.user?._id) ? (
              <div style={{ cursor: 'pointer',textAlign:"left",paddingLeft:"10px",width:"140px",fontSize:"14px",fontWeight:"400",marginTop:"10px" }} key={sa._id} onClick={() => navigate(`/all-articals-deatails/${sa._id}`)}>
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-text" viewBox="0 0 16 16">
  <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
  <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
</svg>
                {sa.title} <br />
              </div>
            ) : (
              <div key={sa._id} style={{ cursor: 'not-allowed',textAlign:"left",paddingLeft:"10px",fontSize:"14px",width:"140px",fontWeight:"400" ,marginTop:"10px" }}>
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-text" viewBox="0 0 16 16">
  <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
  <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
</svg>
                {sa.title} <br />
              </div>
            )}
          </>
        ))}
      </div>
   
  ))}
   </div>
</div>






 
    </>
  );
};

export default AllArticals;
