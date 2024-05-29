import { Router } from "express";
import { authMidd } from "../authentication/index.js";
import Wall from '../models/wall.model.js';
import Post from '../models/post.model.js';

export const wallRoute = Router();

wallRoute.post("/attach/:id", async(req, res, next)=>{
    try{
        let wall = await Wall.findById(req.params.id);
        if(wall){
            let post = await Post.create({author:req.body.author, msg:req.body.msg, posted:req.body.posted});
            if(post);{
                wall.posts.push(post._id);
                await wall.save();
                res.send(wall);
            }
        }
    }catch(err){
        next(err);
    };
});

wallRoute.get("/posts/:id", async(req, res, next)=>{
    try{
        let wall = await Wall.findById(req.params.id);
        // wall.populate("posts");
        res.send(wall);
    }catch(err){
        next(err);
    }
});

wallRoute.get("/all/:id/:postId", async(req, res, next)=>{
    try{
        let wall = await Wall.findById(req.params.id);
        let posts = wall.posts;
        let post = posts.filter((el)=>{return el._id == req.params.postId})
        // wall.populate("posts");
        res.send(post);
    }catch(err){
        next(err);
    }
});
