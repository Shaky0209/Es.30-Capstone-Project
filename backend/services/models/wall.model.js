import {Schema, model} from 'mongoose';

const wallSchema = new Schema(
    {
        posts:[
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
    },
    {
        collection:"fabrianowall"
    },
);

export default model ("Wall", wallSchema);