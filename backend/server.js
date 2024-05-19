import express from 'express';
import { config } from 'dotenv';
import { userRoute } from './services/routes/user.route.js';
import passport from 'passport';
import mongoose from 'mongoose';
import googleStrategy from './services/authentication/passport.js'
import cors from 'cors';

config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

passport.use("google", googleStrategy);
app.use("/user", userRoute );

const initServer = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to the Database!");
        app.listen(PORT, ()=>{
            console.log(`Server connected at the port ${PORT}`);
        });
    }catch(err){
        console.error("Database Connection Failed! ", err);
    }
}

initServer();