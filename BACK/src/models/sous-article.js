import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sousarticleSchema = new Schema({
    article_id: {
        type: String,
    },
    title: {
        type: String,
       
    },
    image: {
        type: String,
    },
    content: {
        type: String,   
    },

  
})

export default mongoose.model("Sousarticle", sousarticleSchema);
