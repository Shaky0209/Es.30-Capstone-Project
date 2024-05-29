import { Router } from 'express';
import { generateJWT, authMidd} from '../authentication/index.js';
import cloudUserMidd from '../middleware/multerUser.js';
import bcrypt from 'bcrypt';
import passport from 'passport';
import User from '../models/user.model.js';

export const userRoute = Router();

userRoute.post("/register", async(req, res, next)=>{
    try{
        let  registered = await User.find({email: req.body.email});
        
        if(registered.lenght > 0){
            // res.send("This email already exists in the database.").sendStatus(600);
            res.status(600).send("This e-mail already exists in the database.");
        }else{
            let user = await User.create({
                ...req.body,
                password: await bcrypt.hash(req.body.password, 11),
            });
            res.send(user);
        }
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

userRoute.delete("/delete/:id", authMidd, async(req, res, next)=>{
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

userRoute.put("/edit/:id", authMidd, async(req, res, next)=>{
    try{
        let userEdit = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.send(userEdit);
    }catch(err){
        next(err);
    }
});

userRoute.post("/avanced/src", async(req, res, next)=>{
    try{
        const sex = req.body.sex;
        const province = req.body.province;
        const city = req.body.city;
        const ageMin = req.body.ageMin;
        const ageMax = req.body.ageMax;

        const filter = {$and:[]};

        if(sex){
            filter['$and'].push({sex:{$eq: sex}});
        }

        if(province){
            filter['$and'].push({province:{$eq: province}});
        }

        if(city){
            filter['$and'].push({city:{$eq: city}});
        }

        if(ageMin){
            filter['$and'].push({age:{$gte: ageMin}});
        }

        if(ageMax){
            filter['$and'].push({age:{$lte: ageMax}});
        }   
        
        let users = await User.find(filter)
        res.send(users);
    }catch(err){
        next(err);
    }
});

userRoute.patch("/:id/user-img", cloudUserMidd, async(req, res, next)=>{
    try{
        let updatedUserImg = await User.findByIdAndUpdate(req.params.id, {image: req.file.path},{new: true});
        res.send(updatedUserImg);
    }catch(err){
        next(err);
    }
    
});

userRoute.post("/message/:id", async(req, res, next)=>{
    try{
        let user = await User.findById(req.params.id);
        if(user){
            user.msgBox.push(req.body);
            await user.save();
            res.send(user.msgBox);
        }else{
            res.send("There was an error loading the message.");
        }
    }catch(err){
        next(err);
    }
});

userRoute.delete("/message/delete/:msgId/:userId", async(req, res, next)=>{
    try{
        let user = await User.findById(req.params.userId);
        if(user){
            let msg = await user.msgBox.id(req.params.msgId);
            if(msg){
                user.msgBox.pull(msg);
                await user.save();
                res.sendStatus(204);
            }else{
                res.sendStatus(404);
            }
        }else{
            res.sendStatus(404);
        }
    }catch(err){
        next(err);
    }
});