import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";
import './sous-artical.css'
const SousArticalDetails = () => {
    const {id} = useParams();
  const [sousArticles, setSousArticles] = useState([]);
console.log(sousArticles,"sa")
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
      }, []);
  return (
    <>
     {sousArticles?.filter((sa)=>sa?._id == id).map((sa)=><>

    <div className="sous-article">
  <div className="sous-a-title">
    <h1>
    {sa?.title}
    </h1>
  </div>
  <div className="sous-adetails">
  <div className="sous-a-content">
      <p>{sa?.content}</p>
    </div>
    <div className="sous-a-image">
    <img src={sa?.image} alt="" />
    </div>
 
  </div>
</div>
    </>)}

    </>
  )
}

export default SousArticalDetails