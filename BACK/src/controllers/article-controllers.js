import Article from "../models/article.js";

export const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getArticleById = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await Article.findById(id);
        if (article) {
            res.json(article);
        } else {
            res.status(404).json({ message: "Article not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createArticle = async (req, res) => {
    const { title } = req.body;
    const newArticle = new Article({ title });
    try {
        const savedArticle = await newArticle.save();
        res.status(201).json(savedArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateArticle = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const article = await Article.findByIdAndUpdate(id, { title, content }, { new: true });
        if (article) {
            res.json(article);
        } else {
            res.status(404).json({ message: "Article not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await Article.findByIdAndDelete(id);
        if (article) {
            res.json({ message: "Article deleted" });
        } else {
            res.status(404).json({ message: "Article not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const demande = async (req, res) => {
    try {
        let result = await Article.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: { inscri: req.body.inscri } },
            { new: true }
        );
        res.send({ msg: "article is updated" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Error updating article", error });
    }
};

  
  

export const userliste = async (req, res) => {
    try {
        let result = await Article.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: { userlist: req.body.userlist } },
            { new: true }
        );
        res.send({ msg: "article is updated" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Error updating article", error });
    }
};