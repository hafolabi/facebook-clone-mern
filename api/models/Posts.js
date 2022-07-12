const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema(
{
    userId:{
        type:String,
        required: true,
    },
    desc:{
        type:String,
        required:true,
        max: 500,
    },
    img:{
        type:String,
    },
    likes:{
        type:Array,
        default:[],
    },
},
{
    timestamps:true,
}
)

module.exports = mongoose.model("Post", PostsSchema)