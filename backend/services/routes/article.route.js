import { Router } from 'express';
import Article from '../models/article.model.js';

export const articleRoute = Router();

articleRoute.post("/new", async(req, res, next)=>{
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

articleRoute.get("/all", async(req, res, next)=>{
    try{
        let articles = await Article.find();
        res.send(articles);
    }catch(err){
        next(err);
    }
});

articleRoute.post("/category", async(req, res, next)=>{
    console.log(req.body);
    try{
        const articles = await Article.find({category: req.body.category});
        res.send(articles);
    }catch(err){
        next(err);
    }
});