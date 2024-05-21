import {Schema, model} from 'mongoose';

const articleSchema = new Schema(
    {
        img:{
            type:"String",
            require: false,
        },
        category:{
            type:"String",
            require: true,
        },
        title:{
            type:"String",
            require: true,
        },
        description:{
            type:"String",
            require: true,
        },
        city:{
            type:"String",
            require: true,
        },
        province:{
            type:"String",
            require: true,
        },
        contact:{
            type:"String",
            require: false,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref:"User",
        },
        comments:[
            {
                author:{
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },
                description:{
                    type:"String",
                    require: true,
                },
            },
        ]
    },
    {
        collection:"articles",
        timestamps: true,
    }
    
);

export default model("Article", articleSchema);