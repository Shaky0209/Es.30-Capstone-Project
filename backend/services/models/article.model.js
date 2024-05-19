import {Schema, model} from 'mongoose';

const Article = new Schema(
    {
        img:{
            type:"String",
            require: false,
        },
        category:{
            type:"String",
            require: true,
        },
        location:{
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
        posted:{
            type:"String",
            require: true,
        },
        comments:[
            {
                author:{
                    type: Schema.Types.ObjectId,
                    ref: "Comment",
                }
            }
        ]
    },
    {
        collection:"article",
        timestamps: true,
    }
    
)