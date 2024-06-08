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

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/user/all-users");
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [users]);

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

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
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
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Users;
