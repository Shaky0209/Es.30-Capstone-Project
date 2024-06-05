import GoogleStrategy from 'passport-google-oauth20';
import { generateJWT } from './index.js';
import User from '../models/user.model.js';
import "dotenv/config";

const options = {
    clientID:process.env.G_CLIENT_ID,
    clientSecret:process.env.G_CLIENT_SECRET,
    callbackURL:process.env.G_CALLBACK,
}

const googleStrategy = new GoogleStrategy(options, async( _, __, profile, passportNext)=>{

    const {email, given_name, family_name,  sub, picture}= profile._json;

    try{
        const user = await User.findOne({email});

        if(user){
            const accToken = await generateJWT({_id: user._id});
            passportNext(null, {accToken});
        }else{
            const newUser = new User({
                image:"",
                name: "Nome",
                surname:"Cognome",
                email: email,
                birth: "01-01-1990",
                age: new Date().getFullYear() - 1990,
                sex:"male",
                city:"Roma",
                password: sub,
                googleId: sub,
                description:"Ciao...",
                msgBox:[],
                countMsg: 0,
            });

            await newUser.save();

            const accToken = await generateJWT({_id: newUser._id});
            passportNext(null, {accToken});
        };
        
    }catch(err){
        passportNext(err);
    }
});

export default googleStrategy;