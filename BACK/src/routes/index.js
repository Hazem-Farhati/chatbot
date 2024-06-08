import { Router } from "express";
import userRoutes from "./user-routes.js"
//import chatRoutes from "./chat-routes.js"
import geminiRoutes from "./chat-routes.js"
import articleRoutes from "./article-routes.js";
import sousarticleRoutes from "./sousarticle-routes.js";

const appRouter = Router();
appRouter.use("/chat", geminiRoutes);
appRouter.use("/user", userRoutes); //domain/api/v1/user
appRouter.use("/article", articleRoutes); //domain/api/v1/user
appRouter.use("/sous-article", sousarticleRoutes); //domain/api/v1/user

//appRouter.use("/chat", chatRoutes); //domain/api/v1/chats

export default appRouter;
