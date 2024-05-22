import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const generateJWT = (payload)=>{
    return new Promise((resolve, reject)=>{
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: "4h"},
            (err, token)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(token);
                }
            }
        );
    });
};

export const verifyJWT = (token)=>{
    return new Promise((resolve, reject)=>{
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            if(err){
                reject(err);
            }else{
                resolve(decoded);
            }
        })
    });
}

export const authMiddMe = async(req, res, next)=>{
    try{
        if(!req.headers.authorization){
            res.status(401).send("Make log in!");
        }else{
            const decoded = await verifyJWT(
                req.headers.authorization.replace("Bearer ", "")
            );
            
            if(decoded.exp){
                delete decoded.iat
                delete decoded.exp
                
                const me = await User.findOne({...decoded});
                if(me){
                    req.user = me;
                    next();
                }else{
                    res.status(401).send("User not Found!");
                }
            }
        }
    }catch(err){
        res.status(401).send("Log in again!");
    }
}

export const authMidd = async(req, res, next)=>{
    try{
        if(!req.headers.authorization){
            res.status(401).send("Make log in!");
        }else{
            next();
        }
    }catch(err){
        res.status(401).send("Log in again!");
    }
}