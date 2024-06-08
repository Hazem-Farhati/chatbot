import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Box, Button, TextField, IconButton, Typography, Modal } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";

const SousArticle = ({ articleId, onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
console.log(url,"url")
  const [sousArticles, setSousArticles] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchSousArticles = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/sous-article/all-sous-articles`);
        setSousArticles(response.data.filter(sa => sa.article_id === articleId));
      } catch (error) {
        console.error("Error fetching sous articles:", error);
      }
    };

    fetchSousArticles();
  }, [articleId]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/sous-article/delete-sous-articles/${id}`);
      setSousArticles(sousArticles.filter(sa => sa._id !== id));
      toast.success("Sous Article Deleted Successfully");
    } catch (error) {
      console.error("Error deleting sous article:", error);
    }
  };

  const handleAddSousArticle = async () => {
    try {
      // Check if file is selected
      if (!file) {
        toast.error("Please select an image file");
        return;
      }
  
      // Convert the image file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        // Set the base64 string as the image URL
        setUrl(reader.result);
      };
  
      // Wait for the URL to be set
      await new Promise(resolve => {
        reader.onloadend = resolve;
      });
  
      // Create the sous article with the base64 image URL
      const response = await axios.post("http://localhost:5000/api/v1/sous-article/create-sous-articles", { 
        title, 
        content, 
        image: url, // Use the base64 image URL
        article_id: articleId
      });
  
      // Add the created sous article to the state
      setSousArticles([...sousArticles, response.data]);
  
      // Clear the input fields and close the modal
      setTitle("");
      setContent("");
      setFile(null);
      setUrl("");
      setOpen(false);
  
      toast.success("Sous Article Added Successfully");
    } catch (error) {
      console.error("Error adding sous article:", error);
    }
  };
  
  

  const columns = [
    { field: "_id", headerName: "ID", flex: 0.5 },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "content",
      headerName: "Content",
      flex: 2,
    },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      renderCell: ({ value }) => {
        return (
          <img src={value} alt="Sous Article Image" style={{ width: 100, height: 100 }} />
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      renderCell: ({ value }) => {
        const date = new Date(value);
        return date.toLocaleDateString();
      },
    },
    {
      field: "delete",
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
  

  const rows = sousArticles.map((sousArticle, index) => ({
    id: index + 1,
    ...sousArticle,
  }));

  return (
    <Box m="20px">
      <Button onClick={() => setOpen(true)} variant="contained" color="primary">
        Add New Sous Article
      </Button>
      <Button onClick={onClose} variant="contained" color="secondary" sx={{ ml: 2 }}>
        Close
      </Button>
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
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Sous Article
          </Typography>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mt: 2 }}
          />
    <input
  className="choose_file"
  type="file"
  accept="image/*"
  onChange={(e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = function () {
        setUrl(reader.result);
      };
    }
    setFile(selectedFile);
  }}
  sx={{ mt: 2 }}
/>

          <Button onClick={handleAddSousArticle} variant="contained" color="primary" sx={{ mt: 2 }}>
            Add Sous Article
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default SousArticle;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
