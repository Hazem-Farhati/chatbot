import Sousarticle from "../models/sous-article.js";

export const getAllSousarticles = async (req, res) => {
    try {
        const sousarticles = await Sousarticle.find();
        res.json(sousarticles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSousarticleById = async (req, res) => {
    const { id } = req.params;
    try {
        const sousarticle = await Sousarticle.findById(id);
        if (sousarticle) {
            res.json(sousarticle);
        } else {
            res.status(404).json({ message: "Sousarticle not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createSousarticle = async (req, res) => {
    const { article_id,title,image,content } = req.body;
    const newSousarticle = new Sousarticle({ article_id,title,image,content });
    try {
        const savedSousarticle = await newSousarticle.save();
        res.status(201).json(savedSousarticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateSousarticle = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const sousarticle = await Sousarticle.findByIdAndUpdate(id, { title, content }, { new: true });
        if (sousarticle) {
            res.json(sousarticle);
        } else {
            res.status(404).json({ message: "Sousarticle not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteSousarticle = async (req, res) => {
    const { id } = req.params;
    try {
        const sousarticle = await Sousarticle.findByIdAndDelete(id);
        if (sousarticle) {
            res.json({ message: "Sousarticle deleted" });
        } else {
            res.status(404).json({ message: "Sousarticle not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
