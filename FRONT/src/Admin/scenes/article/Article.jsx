// Article.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Box, Button, TextField, IconButton, Typography, Modal } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"; // Import the Edit icon
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import SousArticle from "./SousArticle";
import ArticleUser from "./ArticleUser";

const Article = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [articles, setArticles] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/article/all-articles");
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/article/delete-articles/${id}`);
      setArticles(articles.filter(article => article._id !== id));
      toast.success("Article Deleted Successfully");
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const handleAddArticle = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/article/create-articles", { title, content });
      setArticles([...articles, response.data]);
      setTitle("");
      setContent("");
      setOpen(false);
      toast.success("Article Added Successfully");
    } catch (error) {
      console.error("Error adding article:", error);
    }
  };

  const handleUpdateArticle = async () => {
    try {
      const updatedArticle = { title, content };
      await axios.put(`http://localhost:5000/api/v1/article/update-articles/${selectedArticleId}`, updatedArticle);
      const updatedArticles = articles.map(article => {
        if (article._id === selectedArticleId) {
          return { ...article, ...updatedArticle };
        }
        return article;
      });
      setArticles(updatedArticles);
      setOpen(false);
      toast.success("Article Updated Successfully");
    } catch (error) {
      console.error("Error updating article:", error);
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
    // {
    //   field: "content",
    //   headerName: "Content",
    //   flex: 2,
    // },
    // {
    //   field: "createdAt",
    //   headerName: "Created At",
    //   flex: 1,
    //   renderCell: ({ value }) => {
    //     const date = new Date(value);
    //     return date.toLocaleDateString();
    //   },
    // },
    {
      field: "sousArticles",
      headerName: "Sous Articles",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSelectedArticleId(row._id)}
          >
            View Sous Articles
          </Button>
        );
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.5,
      renderCell: ({ row }) => {
        return (
          <IconButton
            onClick={() => {
              setSelectedArticleId(row._id);
              setTitle(row.title);
              setContent(row.content);
              setOpen(true);
            }}
            color="primary"
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>
        );
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

  const rows = articles.map((article, index) => ({
    id: index + 1,
    ...article,
  }));

  return (
    <Box m="20px">
      <Header title="ARTICLES" subtitle="Managing the Articles" />
      <Button onClick={() => setOpen(true)} variant="contained" color="primary">
        Add New Article
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
            {selectedArticleId ? "Update Article" : "Add New Article"}
          </Typography>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mt: 2 }}
          />
          {/* <TextField
            fullWidth
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mt: 2 }}
          /> */}
          <Button onClick={selectedArticleId ? handleUpdateArticle : handleAddArticle} variant="contained" color="primary" sx={{ mt: 2 }}>
            {selectedArticleId ? "Update Article" : "Add Article"}
          </Button>
        </Box>
      </Modal>
      {selectedArticleId && 
      <>
        <SousArticle
          articleId={selectedArticleId}
          onClose={() => setSelectedArticleId(null)}
          onUpdate={() => handleUpdateArticle(selectedArticleId)} // Fixed typo here
        />
            <ArticleUser selectedArticleId={selectedArticleId}/>
        </>
      }
  
    </Box>
  );
};

export default Article;

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
