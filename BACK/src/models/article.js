import mongoose from "mongoose";

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
        
    },
    inscri: { type: [String], default: [] },
    userlist: { type: [String], default: [] },
  
})

export default mongoose.model("Article", articleSchema);
