import { Router } from 'express';
import { generateJWT, authMidd } from '../authentication/index.js';
import { authFetchMidd } from '../middleware/authFetchMidd.js';
import bcrypt from 'bcrypt';
import passport from 'passport';
import User from '../models/user.model.js';

export const userRoute = Router();

userRoute.post("/register", async(req, res, next)=>{
    try{
        let user = await User.create({
            ...req.body,
            password: await bcrypt.hash(req.body.password, 11),
        });
        res.send(user);
    }catch(err){
        next(err);
    }
});

userRoute.post("/login", async(req, res, next)=>{
    try{
        let incomingUser = await User.findOne({email: req.body.email});
        if(incomingUser){
            const passVerify = await bcrypt.compare(req.body.password, incomingUser.password);
            if(passVerify){
                const token = await generateJWT({
                    _id: incomingUser._id
                });
                res.send({user: incomingUser, token});
            }else{
                res.status(400).send("You entered the wrong password!");
            }
        }else{
            res.status(400).send("User not found!");
        }
    }catch(err){
        next(err);
    }
});

userRoute.get("/me", authMidd, async(req, res, next)=>{
    try{
        let user = await User.findById(req.user.id);
        res.send(user)
    }catch(err){
        next(err)
    }
});

userRoute.get("/googleLogin", passport.authenticate("google", {scope:["profile", "email"]}));

userRoute.get("/callback", passport.authenticate("google", {session: false}),
    (req, res, next)=>{
        try{
            res.redirect(`${process.env.CLIENT_URL}/?accToken=${req.user.accToken}`)
        }catch(err){
            next(err);
        }
    }
);

userRoute.get("/friends", authMidd, async(req, res, next)=>{
    try{
        let users = await User.find()
        res.send(users);
    }catch{
        next(err);
    }
});

userRoute.delete("/delete/:id", async(req, res, next)=>{
    try{
        const user = await User.deleteOne({_id: req.params.id});
        res.sendStatus(204);
    }catch(err){
        next(err);
    }
});

userRoute.get("/get/:id", async(req, res, next)=>{
    try{
        let user = await User.findById(req.params.id);
        res.send(user);
    }catch(err){
        next(err);
    }
});

userRoute.put("/edit/:id", async(req, res, next)=>{
    try{
        let userEdit = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.send(userEdit);
    }catch(err){
        next(err);
    }
});

userRoute.post("/avanced/src", async(req, res, next)=>{

    let age = req.body.ageMin || false;
    let sex = req.body.sex || false;
    let city = req.body.city || false;
    let province = req.body.province || false;

    try{  
        if(age && sex && city && province){
            let users = await User.find({age: age, sex: sex, city: city, province: province,});
            res.send(users);
        }else if(age && sex && city){
            let users = await User.find({age: age, sex: sex, city: city});
            res.send(users);
        }else if(age && sex && province){
            let users = await User.find({age: age, sex: sex, province: province,});
            res.send(users);
        }else if(age && city && province){
            let users = await User.find({age: age, city: city, province: province,});
            res.send(users);
        }else if(sex && city && province){
            let users = await User.find({sex: sex, city: city, province: province,});
            res.send(users);
        }else if(age && sex){            
            let users = await User.find({age: age, sex: sex});
            res.send(users);
        }else if (age && city){
            let users = await User.find({age: age, city: city});
            res.send(users);
        }else if(age && province){
            let users = await User.find({age: age, province: province,});
            res.send(users);
        }else if(sex && city){
            let users = await User.find({sex: sex, city: city});
            res.send(users);
        }else if(sex && province){
            let users = await User.find({sex: sex, province: province,});
            res.send(users);
        }else if(city && province){
            let users = await User.find({city: city, province: province,});
            res.send(users);
        }else if(age){
            let users = await User.find({age: age});       
            res.send(users);         
        }else if(sex){
            let users = await User.find({sex: sex});
            res.send(users);
        }else if(city){
            let users = await User.find({city: city});
            res.send(users);
        }else if(province){
            let users = await User.find({province: province});
            res.send(users);
        }else{
            let users = await User.find();
            res.send(users);
        }
        
    }catch(err){
        next(err);
    }
});