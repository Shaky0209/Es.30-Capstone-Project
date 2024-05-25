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

        const filter = {};

        if(sex){
            filter.sex = sex;
        }

        if(province){
            filter.province = province;
        }

        if(city){
            filter.city = city;
        }

        if(ageMin && ageMax){
            filter.age = {$and:[{age:{$gte: ageMin}}, {age:{$lte: ageMax}}]}
        }
        
        let users = await User.find(filter)
        res.send(users);
    }catch(err){
        next(err);
    }
});

userRoute.patch("/:id/user-img", cloudUserMidd, async(req, res, next)=>{
    try{
        let updatedUserImg = await User.findByIdAndUpdate(
            req.params.id,
            {image: req.file.path},
            {new: true}
        );

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

userRoute.get("/author/:id", async(req, res, next)=>{
    try{
        let author = await User.findById(req.params.id);
        res.send(author);
    }catch(err){
        next(err);
    }
})

// userRoute.post("/avanced/src", authMidd, async(req, res, next)=>{

//     let age = req.body.ageMin || false;
//     let sex = req.body.sex || false;
//     let city = req.body.city || false;
//     let province = req.body.province || false;

//     try{  
//         if(age && sex && city && province){
//             let users = await User.find({age: age, sex: sex, city: city, province: province,});
//             res.send(users);
//         }else if(age && sex && city){
//             let users = await User.find({age: age, sex: sex, city: city});
//             res.send(users);
//         }else if(age && sex && province){
//             let users = await User.find({age: age, sex: sex, province: province,});
//             res.send(users);
//         }else if(age && city && province){
//             let users = await User.find({age: age, city: city, province: province,});
//             res.send(users);
//         }else if(sex && city && province){
//             let users = await User.find({sex: sex, city: city, province: province,});
//             res.send(users);
//         }else if(age && sex){            
//             let users = await User.find({age: age, sex: sex});
//             res.send(users);
//         }else if (age && city){
//             let users = await User.find({age: age, city: city});
//             res.send(users);
//         }else if(age && province){
//             let users = await User.find({age: age, province: province,});
//             res.send(users);
//         }else if(sex && city){
//             let users = await User.find({sex: sex, city: city});
//             res.send(users);
//         }else if(sex && province){
//             let users = await User.find({sex: sex, province: province,});
//             res.send(users);
//         }else if(city && province){
//             let users = await User.find({city: city, province: province,});
//             res.send(users);
//         }else if(age){
//             let users = await User.find({age: age});       
//             res.send(users);         
//         }else if(sex){
//             let users = await User.find({sex: sex});
//             res.send(users);
//         }else if(city){
//             let users = await User.find({city: city});
//             res.send(users);
//         }else if(province){
//             let users = await User.find({province: province});
//             res.send(users);
//         }else{
//             let users = await User.find();
//             res.send(users);
//         }
        
//     }catch(err){
//         next(err);
//     }
// });