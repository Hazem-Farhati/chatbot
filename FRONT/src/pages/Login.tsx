import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { toast } from "react-hot-toast";
import CustomizedInput from "../components/shared/CustomizedInput";
import loginImg from "../assets/Swiver.jpg";
import { IoIosLogIn } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { useNavigate , Link } from 'react-router-dom';

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signed In Successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "login" });
    }
  };
  console.log("auth",auth.user);
  useEffect(() => {
    if (auth?.isLoggedIn) {
      if (auth.user?.role == "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/chat");
      }
    }
  }, [auth]);


  return (
    <Box mt={9} width={"100%"} height={"100%"} display="flex" marginTop="10px" flex={1}>
      <Box display={{ md: "flex", sm: "none", xs: "none" }}>
        <img src={loginImg } alt="Robots" style={{ width: "500px",height: "450px", marginLeft:"50px", marginTop:"50px",borderRadius:"100px",border:"5px solid white" }} />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"10px"}
        mt={-7}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "30px",
            padding: "40px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={3}
              fontWeight={600}
            >
              Login
            </Typography>
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "white",
                color: "black",
                boxShadow: "2px 5px 2px #fff",
                ":hover": {
                 boxShadow: "2px 5px 2px 5px #fff",
                  color: "white",
                  bgcolor: "black",
                  borderRadius: 5,
                },
              }}
              endIcon={<IoIosLogIn />}
            >
              login
            </Button>
            <Typography variant="body2" textAlign="center" mt={2}>
              New here ?{" "}
              <Link to="/signup" sx={{ color: "white", cursor: "pointer" }}>
                SignUp
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
