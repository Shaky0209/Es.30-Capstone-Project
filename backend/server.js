import { config } from 'dotenv';
import { userRoute } from './services/routes/user.route.js';
import { articleRoute } from './services/routes/article.route.js';
import { wallRoute } from './services/routes/wall.route.js';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
import googleStrategy from './services/authentication/passport.js';

config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

passport.use("google", googleStrategy);
app.use("/user", userRoute );
app.use("/articles", articleRoute);
app.use("/wall", wallRoute);

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