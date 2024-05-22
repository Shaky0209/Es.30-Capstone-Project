import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        image:{
            type:"String",
            require: false,
        },
        name: {
            type:"String",
            require: true,
        }, 
        surname: {
            type:"String",
            require: true,
        },
        email: {
            type:"String",
            require: true,
        },
        birth: {
            type:"String",
            require: true,
        },
        age: {
            type:"String",
            require: true,
        },
        sex: {
            type:"String",
            require: true,
        },
        city: {
            type:"String",
            require: true,
        },
        province: {
            type:"String",
            require: true,
        },
        password: {
            type:"String",
            require: true,
        },
        googleId:{
            type:"String",
            require: false,
        },
        description: {
            type:"String",
            require: false,
        },
        msgBox:[
            {
                author:{
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },
                msg:{
                    type:"String",
                    require: true,
                },
                posted:{
                    type:"String",
                    require: true,
                }
            },
        ],
    },
    {
        collection:"users",
        timestamps: true,
    },
);

export default model ("User", userSchema);