import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import swiverLogo from "../../assets/swiver.jpeg";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <Link to={"/"}>
        <img
          src={ swiverLogo }
          alt="logo"
          width={"50px"}
          height={"50px"}
          borderRadius= {"50px"}
          className="image-inverted"
        />
         </Link>
           <Link to={"/"}>
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          mr: "auto",
          fontWeight: "800",
          textShadow: "2px 2px 20px #000",
          color:"white"
        }}
      >
        <span style={{ fontSize: "20px", color:"white" }}>Swiver</span>-GPT
      </Typography>
        </Link>
    </div>
  );
};

export default Logo;
