import { Router } from "express";
import { getAllSousarticles,deleteSousarticle,updateSousarticle,createSousarticle,getSousarticleById } from "../controllers/sousarticale-contollers.js";

const sousarticleRoutes = Router();

sousarticleRoutes.get("/all-sous-articles", getAllSousarticles);
sousarticleRoutes.delete("/delete-sous-articles/:id", deleteSousarticle);
sousarticleRoutes.post("/create-sous-articles", createSousarticle);
sousarticleRoutes.put("/update-sous-articles/:id", updateSousarticle);
sousarticleRoutes.get("/getbyid-sous-articles/:id", getSousarticleById);


export default sousarticleRoutes;
