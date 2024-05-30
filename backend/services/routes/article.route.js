import { Router } from 'express';
import { authMidd } from '../authentication/index.js';
import cloudArticleMidd from '../middleware/multerArticle.js';
import Article from '../models/article.model.js';

export const articleRoute = Router();

articleRoute.post("/new", authMidd, async(req, res, next)=>{
    try{
        let article = await Article.create({
            category: req.body.category,
            title: req.body.title,
            description: req.body.description,
            city: req.body.city,
            province: req.body.province,
            contact: req.body.contact,
            user: req.body.user,
            comments:[],
        });
        res.send(article).status(200);
    }catch(err){
        next(err);
    }
});

articleRoute.get("/all", authMidd, async(req, res, next)=>{
    try{
        let articles = await Article.find();
        res.send(articles);
    }catch(err){
        next(err);
    }
});

articleRoute.patch("/new/img/:id", cloudArticleMidd, async(req, res, next)=>{
    try{
        let newImg = await Article.findByIdAndUpdate(req.params.id, {img: req.file.path}, {new: true});
        res.send(newImg);
    }catch(err){
        next(err);
    }
});

articleRoute.post("/category", authMidd, async(req, res, next)=>{
    try{
        const articles = await Article.find({category: req.body.category});
        res.send(articles);
    }catch(err){
        next(err);
    }
});

articleRoute.get("/my/:id", authMidd, async(req, res, next)=>{
    try{
        const myArticles = await Article.find({user: req.params.id});
        res.send(myArticles);
    }catch(err){
        next(err);
    }
});

articleRoute.get("/get/:id", authMidd,async(req, res, next)=>{
    try{
        let article = await Article.findById(req.params.id);
        res.send(article);
    }catch(err){
        next(err)
    }
});

articleRoute.delete("/delete/:id", authMidd, async(req, res, next)=>{
    try{
        let article = await Article.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    }catch(err){
        next(err);
    }
});

articleRoute.put("/edit/:id", async(req, res, next)=>{
    try{
        let newArticle = await Article.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.send(newArticle);
    }catch(err){
        next(err)
    }
});

