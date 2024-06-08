import React from 'react'
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from '@mui/material/Button';
import Logo from './shared/Logo';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import NavigationLink from './shared/NavigationLink';

const Header = () => {
  const auth = useAuth();
  const location = useLocation();

  return (
    <AppBar sx={{ position: "static", boxShadow: "none", borderRadius: 2, backgroundColor: "#192734" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <Button
                variant="outlined"
                size="small"
                style={{
                  borderRadius: 15,
                  boxShadow: "1px 1px 5px #fff",
                  color: "white",
                  "&:hover": {
                    color: "white",
                  },
                }}
              >
                {location.pathname === '/all-chats' ? (
                  <NavigationLink to="/chat" bg="black" text="Go to Chat" textColor="white" borderRadius="50px" />
                ) : (
                  <NavigationLink to="/all-chats" bg="black" text="View All Chats" textColor="white" borderRadius="50px" />
                )}
              </Button>
              <Button
                variant="outlined"
                size="small"
                style={{
                  borderRadius: 15,
                  boxShadow: "1px 1px 5px #fff",
                  color: "white",
                  "&:hover": {
                    color: "white", // Change to white on hover
                  },
                }}
              >
                <NavigationLink bg="black" to="/" text="logout" textColor="white" onClick={auth.logout} />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                size="small"
                style={{
                  borderRadius: 15,
                  boxShadow: "1px 1px 5px #fff",
                  color: "white",
                  "&:hover": {
                    color: "white",
                  },
                }}
              >
                <NavigationLink to="/login" bg="black" text="Login" textColor="white" borderRadius="50px" />
              </Button>
              <Button
                variant="outlined"
                size="small"
                style={{
                  borderRadius: 15,
                  boxShadow: "1px 1px 5px #fff",
                  color: "white",
                  "&:hover": {
                    color: "white",
                  },
                }}
              >
                <NavigationLink bg="black" to="/signup" text="Signup" textColor="white" borderRadius="50px" />
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
