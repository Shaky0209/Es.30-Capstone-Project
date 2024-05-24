import {Schema, model} from 'mongoose';

const postSchema = new Schema(
    {
        author:{
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        msg:{
            type: "String",
            require: true,
        },
        posted:{
            type: "String",
            require: true,
        },
    },
    {
        collection: "wall-posts",
        timestamps: true,
    }
);

export default model("Post", postSchema);