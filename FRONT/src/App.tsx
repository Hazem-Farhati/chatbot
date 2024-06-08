import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useAuth } from './context/AuthContext';

//import Admin from "./AdminRoutes";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import AllChats from './pages/AllChats/AllChats';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import Topbar from "./Admin/scenes/global/Topbar";
import Sidebar from "./Admin/scenes/global/Sidebar";
import Dashboard from "./Admin/scenes/dashboard/Dashboard";

import Users from "./Admin/scenes/users";
import Article from "./Admin/scenes/article/Article.jsx";

import Bar from "./Admin/scenes/bar";
import Form from "./Admin/scenes/form";
import Line from "./Admin/scenes/line";
import Pie from "./Admin/scenes/pie";
import Geography from "./Admin/scenes/geography";
import Sidebar from "./Admin/scenes/global/Sidebar";
import Topbar from "./Admin/scenes/global/Topbar";
import { ThemedApp } from './theme';
// import Article from './Admin/article/Article';

function App() {
    const auth = useAuth();

    return (
      <ThemedApp>
          <CssBaseline />
          <div style={{ display: 'flex' }}>
            {auth?.isLoggedIn && auth?.user?.role == "admin" ? <Sidebar /> : null}
            <div style={{ flexGrow: 1 }}>
              {!auth?.isLoggedIn || !auth?.user || !(auth.user?.role == "admin") ? <Header /> : null}
              {auth?.isLoggedIn && !auth.user?.role == "admin" ? <Topbar /> : null}
              {auth?.user?.role == "admin"  ? console.log('conneté') : console.log('noooo')}
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />

              
                      <>
                          <Route path="/admin/dashboard" element={<Dashboard />} />

                          <Route path="/admin/users" element={<Users />} />
                          <Route path="/admin/article" element={<Article />} />

                          <Route path="/admin/form" element={<Form />} />
                          <Route path="/admin/bar" element={<Bar />} />
                          <Route path="/admin/pie" element={<Pie />} />
                          <Route path="/admin/line" element={<Line />} />

                          <Route path="/admin/geography" element={<Geography />} />
                          <Route path="/admin/*" element={<NotFound />} />
                      </>
                
                  {auth?.isLoggedIn && !auth.isAdmin && (
                      <>
                          <Route path="/chat" element={<Chat />} />
                          <Route path="/all-chats" element={<AllChats />} />
                      </>
                  )}
                  <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
      </ThemedApp>
    );
}


export default App ;
