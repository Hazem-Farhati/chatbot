import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserChats } from "../../helpers/api-communicator";
import SpinnerOverlay from "../../components/shared/SpinnerOverlay";
import { Button } from "@mui/material";
import { IoIosLogIn, IoIosTrash } from "react-icons/io";
import styles from "./AllChats.module.css";
import { useAuth } from "../../context/AuthContext";
import botAvatar from "../../assets/logos/bot.png";
import userAvatar from "../../assets/images/user-avatar/user5.jpg";

const AllChats = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoadingChats, setIsLoadingChats] = useState(false);
  const [deleteChatToggle, setDeleteChatToggle] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (auth?.isLoggedIn && auth.token) {
          setIsLoadingChats(true);
          const data = await getUserChats(auth.token.token);
          setChatMessages(data);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setIsLoadingChats(false);
      }
    };

    fetchData();
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth, navigate]);

  const handleClearChats = () => {
    setChatMessages([]);
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatMessages}>
        {isLoadingChats ? (
          <SpinnerOverlay />
        ) : (
          <>
            <h1 className={styles.heading}>Chat Messages</h1>
            {chatMessages.map((chat, index) => (
              <div key={index} className={styles.message}>
                <div className={styles.userMessage}>
                  <img src={userAvatar} alt="User Avatar" className={styles.avatar} />
                  <div>
                     {chat.user.message}
                  </div>
                </div>
                <div className={styles.modelMessage}>
                  <img src={botAvatar} alt="Bot Avatar" className={styles.avatar} />
                  <div>
                   {chat.model.text}
                  </div>
                </div>
              </div>
            ))}
            <div className={styles.buttonContainer}>
              <Button
                onClick={handleClearChats}
                type="submit"
                sx={{
                  px: 2,
                  py: 1,
                  mt: 2,
                  mx: 20,
                  width: "400px",
                  borderRadius: 2,
                  bgcolor: "#689f38",
                  color: "black",
                  boxShadow: "2px 5px 2px #fff",
                  ":hover": {
                    boxShadow: "2px 5px 2px 5px #fff",
                    color: "white",
                    bgcolor: "red",
                    borderRadius: 5,
                  },
                }}
                endIcon={<IoIosTrash />}
              >
                Clear Chats
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllChats;
