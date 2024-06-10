import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Box, IconButton, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { tokens } from "../../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const ArticleUser = ({selectedArticleId}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  const [Reload, setReload] = useState(false)
console.log(articles,"articleeeeeee");
useEffect(() => {
  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/article/all-articles");
      setArticles(response.data);
      setReload(!Reload)
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  fetchArticles();
}, [Reload]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/article/all-articles");
        setArticles(response.data);
      setReload(!Reload)

      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [Reload]);

    
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/user/all-users");
        setUsers(response.data.users);
      setReload(!Reload)

      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [users,Reload]);

  const handleDelete = async (id) => {
  try {
      await axios.delete('/user/delete', { data: { id } });  // Sending the user ID in the request body

    setUsers(users.filter(user => !user.userId));
    toast.success(" User Deleted  Successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

// Your columns configuration remains the same
const columns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    headerAlign: "left",
    align: "left",
  },
  {
    field: "phone",
    headerName: "Phone Number",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "accessLevel",
    headerName: "Access Level",
    flex: 1,
    renderCell: ({ row }) => {
      return (
        <Box
          width="60%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={
            row.isAdmin
              ? colors.greenAccent[600]
              : colors.greenAccent[700]
          }
          borderRadius="4px"
        >
          {row.isAdmin ? (
            <AdminPanelSettingsOutlinedIcon />
          ) : (
            <LockOpenOutlinedIcon />
          )}
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            {row.isAdmin ? "admin" : "user"}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "_id",
    headerName: "Delete",
    flex: 0.5,
    renderCell: ({ row }) => {
      return (
        <IconButton
          onClick={() => handleDelete(row._id)}
          color="secondary"
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      );
    },
  },
];


  const rows = users.map((user, index) => ({
    id: index + 1, // Generate IDs from 1 to the number of users
    ...user,
  }));

  const handleaccept = async (id ,ins) => {
    try {
      const user_id = ins;
      if (user_id) {
        const response = await axios.get(`http://localhost:5000/api/v1/article/getbyid-articles/${id}`);
        const existinguserlist = response.data.userlist || [];
        const updateduserlist = [...existinguserlist, user_id];
        const result = await axios.put(`http://localhost:5000/api/v1/article/userListe/${id}`, { userlist: updateduserlist });
        console.log("Demande result:", result.data);
        // setReload(!reload); // Reload the page

      } else {
        console.error("User ID is not available");
      }
    } catch (error) {
      console.error("Error in handleDemande:", error);
    }
  }; 

  const handlediscard = async (id,ins) => {
    try {
      const user_id = ins;
      if (user_id) {
        const response = await axios.get(`http://localhost:5000/api/v1/article/getbyid-articles/${id}`);
        const existingInscri = response.data.inscri || [];
        const updatedInscri = existingInscri.filter(userId => userId !== user_id);
        const result = await axios.put(`http://localhost:5000/api/v1/article/demande/${id}`, { inscri: updatedInscri });
        console.log("Discard result:", result.data);
        // setReload(!reload); // Reload the page

      } else {
        console.error("User ID is not available");
      }
    } catch (error) {
      console.error("Error in handlediscard:", error);
    }
  };

  const handlediscarduserlist = async (id,ul) => {
    try {
      const user_id = ul;
      if (user_id) {
        const response = await axios.get(`http://localhost:5000/api/v1/article/getbyid-articles/${id}`);
        const existinguserlist = response.data.userlist || [];
        const updateduserlist = existinguserlist.filter(userId => userId !== user_id);
        const result = await axios.put(`http://localhost:5000/api/v1/article/userListe/${id}`, { userlist: updateduserlist });
        console.log("Discard result:", result.data);
        // setReload(!reload); // Reload the page

      } else {
        console.error("User ID is not available");
      }
    } catch (error) {
      console.error("Error in handlediscard:", error);
    }
  };
  return (
    <Box m="20px">
      <Header title="ARTICALS" subtitle="Artical requests" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        {articles?.filter((ar)=>selectedArticleId==ar?._id).map((ar)=><>
        
        <div style={{width:"100%",backgroundColor:"#3e4396",display:"flex",alignItems:"center",justifyContent:"center",padding:"10px 0",marginBottom:"20px"}}> 
          <div style={{width:"90%",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          {ar.inscri.map((ins)=><>
          {users?.filter((user)=>user?._id==ins).map((user)=><>
          <div style={{display:"flex",alignItems:"center", gap:"20px"}}>
            <h4>
            Name : {user?.name} 
            </h4>
            <h4>Email : {user?.email}  </h4>
          </div>
          <div style={{display:"flex",gap:"10px"}}>
          <button style={{width:"70px",height:"30px",backgroundColor:"#06bd06b5",color:"white",border:"none",borderRadius:"5px"}} onClick={() => {handleaccept(ar._id,ins);handlediscard(ar._id,ins)}} >accept</button> 
          <button style={{width:"70px",height:"30px",backgroundColor:"red",color:"white",border:"none",borderRadius:"5px"}} onClick={() => {handleaccept(ar._id,ins);handlediscard(ar._id,ins)}} onClick={() => {handlediscard(ar._id,ins)}}>delete</button> <br />
          </div>
   
          </>)}
         </>)}
         </div>
         </div>
         <Header title="ACCEPTED" subtitle="Accepted Artical requests" />
         <div style={{width:"100%",backgroundColor:"#3e4396",display:"flex",alignItems:"center",justifyContent:"center",padding:"10px 0"}}>
         <div style={{width:"90%",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
     
         {ar.userlist.map((ul)=><>
          {users?.filter((user)=>user?._id==ul).map((user)=><>
          <div style={{display:"flex",alignItems:"center", gap:"20px"}}>
          <h4>
            Name : {user?.name} 
            </h4>
            <h4>Email : {user?.email}  </h4>
          </div>
       <div>
       <button style={{width:"70px",height:"30px",backgroundColor:"red",color:"white",border:"none",borderRadius:"5px"}} onClick={() => {handleaccept(ar._id,ins);handlediscard(ar._id,ins)}} onClick={() => {handlediscarduserlist(ar._id,ul)}}>delete</button> <br />

       </div>
          </>)}
         </>)}
         </div>
         </div>
        
   
        </>)}
       
      </Box>
    </Box>
  );
};

export default ArticleUser;
