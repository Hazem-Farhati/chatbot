import { Router } from "express";
import { getAllArticles,deleteArticle,updateArticle,createArticle,getArticleById } from "../controllers/article-controllers.js";

const articleRoutes = Router();

articleRoutes.get("/all-articles", getAllArticles);
articleRoutes.delete("/delete-articles/:id", deleteArticle);
articleRoutes.post("/create-articles", createArticle);
articleRoutes.put("/update-articles/:id", updateArticle);
articleRoutes.get("/getbyid-articles/:id", getArticleById);


export default articleRoutes;
