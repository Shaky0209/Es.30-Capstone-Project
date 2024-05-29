import { Router } from "express";
import Post from '../models/post.model.js';
import Wall from '../models/wall.model.js'

export const postRoute = Router();

postRoute.get("/post/:id", async(req, res, next)=>{
    try{
        let post = await Post.findById(req.params.id);
        res.send(post);
    }catch(err){
        next(err);
    }
})

postRoute.patch("/edit/:id", async(req, res, next)=>{
    try{
        let post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.send(post);
    }catch(err){
        next(err);
    }
})

postRoute.delete("/delete/:id/:wall_id", async(req, res, next)=>{
    try{
        let post = await Post.findByIdAndDelete(req.params.id);
        let wall = await Wall.findById(req.params.wall_id);
        let post_id = wall.posts.filter((el)=>{return el._id == req.params.id});
        if(post_id){
            wall.posts.pull(post_id);
            await wall.save();
            res.sendStatus(204);
        }else{
            res.sendStatus(404);
        }
    }catch(err){
        next(err)
    }
})