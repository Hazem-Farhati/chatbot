import axios from "axios";

export const loginUser = async (email: string, password: string) =>{
    const res = await axios.post("/user/login", {email, password });
    if(res.status !== 200){
        throw new Error("Unable to login");
    }
    const data = await res.data;
    return data;
};

export const signupUser = async (name: string, email: string, password: string) =>{
    const res = await axios.post("/user/signup", {name, email, password });
    if(res.status !== 201){
        throw new Error("Unable to Signup");
    }
    const data = await res.data;
    return data;
};

export const checkAuthStatus = async () =>{
    const res = await axios.get("/user/auth-status");
    if(res.status !== 200){
        throw new Error("Unable to Authenticate");
    }
    const data = await res.data;
    return data;
};

export const sendChatRequest = async (message: string, token: string) =>{
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };
    const res = await axios.post("/chat/new", { message }, config);
    if(res.status !== 200){
        throw new Error("Unable to send chat");
    }
    const data = await res.data;
  //  console.log("data:", data);
    return data;
};




export const getUserChats = async (token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const res = await axios.get("/chat/all-chats", config);
    if(res.status !== 200){
        throw new Error("Unable to send chat");
    }
    const data = await res.data.chatHistory;
    console.log("Userdata:",data);
        return data;
};



export const deleteUserChats = async () =>{
    const res = await axios.delete("/chat/delete");
    if(res.status !== 200){
        throw new Error("Unable to delete chat");
    }
    const data = await res.data;
    return data;
};

export const logoutUser = async () =>{
    const res = await axios.get("/user/logout");
    if(res.status !== 200){
        throw new Error("Unable to logout user");
    }
    const data = await res.data;
    return data;
};
