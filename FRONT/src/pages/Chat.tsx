import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Typography, IconButton } from "@mui/material";
import styles from "./Chat.module.css";
import ChatItem from "../components/chat/ChatItem";
import sendIcon from "../assets/logos/send-icon.png";
import noMsgBot from "../assets/logos/no-msg2.png";
import upArrow from "../assets/logos/up-arrow.png";
import { useAuth } from "../context/AuthContext";
import { sendChatRequest, getUserChats, deleteUserChats } from "../helpers/api-communicator";
import toast from "react-hot-toast";

const Chat = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteChatToggle, setDeleteChatToggle] = useState(false);
  const inputRef = useRef(null);
  const messageContainerRef = useRef(null);
  const socket = io("http://localhost:5000");

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth, navigate]);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = async () => {
    const userId = auth?.user?._id;
    const content = inputRef.current?.value.trim();
    if (!content) return;
    inputRef.current!.value = "";
    setIsLoading(true);
    socket.emit("message", { content, userId }); // Send message to server
    setChatMessages((prevMessages) => [...prevMessages, { role: "user", content }]);
    try {
    const responseData = await sendChatRequest(content, auth?.token.token);
    let aiResponse;
    if (responseData.geminiResponse) {
      aiResponse = responseData.geminiResponse;
    } else {
      aiResponse = responseData.chatHistory.messages[0].message.gemini[0].content.parts[0].text;
    }
    setChatMessages((prevMessages) => [...prevMessages,  { role: "model", content: aiResponse }]);
    setIsLoading(false);
  } catch (error) {
    console.error("Error sending message:", error);
    toast.error("Failed to send message");
    setIsLoading(false);
  }

  };

  // Event handler for sending messages on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const deleteChatsToggle = () => {
    setDeleteChatToggle((prevState) => !prevState);
  };
  return (
    <div className={styles.parent}>
      {chatMessages.length === 0 && (
        <div className={styles.newchatmain}>
          <div className={styles.textsection}>
            <h1>Hello, {auth?.user?.name.split(" ")[0]}.</h1>
            <h2>How can I help you today?</h2>
          </div>
        </div>
      )}
      {chatMessages.length > 0 && (
        <div className={styles.chat} ref={messageContainerRef}>
          {chatMessages.map((message, index) => (
            <ChatItem key={index} content={message.content} role={message.role} />
          ))}
        </div>
      )}
      <div className={styles.inputContainer}>
        <div className={styles.inputArea}>
          <input
            type="text"
            maxLength={1500}
            ref={inputRef}
            disabled={isLoading}
            placeholder="Enter your query here"
            onKeyDown={handleKeyDown}
          />
          <motion.button className={styles.icon} onClick={sendMessage} whileTap={{ scale: 1.9 }}>
            <img alt="icon" src={sendIcon} />
          </motion.button>
        </div>
      </div>
    </div>
  );

};

export default Chat;
