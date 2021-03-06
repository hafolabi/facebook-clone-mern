const Post = require("../models/Posts");
const User = require("../models/Users");

const router = require("express").Router();

//CREATE A POST

router.post("/",async (req, res)=>{
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err)
    }
})

//UPDATE A POST

router.put("/:id", async (req, res)=>{
 try {
     const post = await Post.findById(req.params.id)
    if(post.userId===req.body.userId){
        await post.updateOne({$set:req.body},{new:true})
        res.status(200).json("post has been updated")
    }else{
        res.status(403).json("you can update only your post")
    }
  }catch(err){
      res.status(500).json(err)
  }
})

//DELETE A POST

router.delete("/:id", async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id)
       if(post.userId===req.body.userId){
           await post.deleteOne()
           res.status(200).json("post has been deleted")
       }else{
           res.status(403).json("you can delete only your post")
       }
     }catch(err){
         res.status(500).json(err)
     }
   })

//LIKE /Dislike A POST

router.put("/:id/like", async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id)

        // if the post doesnot include the userId insert the userId into the likes array
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json("the post has been liked")
        }else{
            await post.updateOne({$pull:{likes:req.body.userId}})
            res.status(200).json("the post has been disliked")
        }
    }catch(err){
        res.status(500).json(err)
    }
})

//GET A POST

router.get("/:id", async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err)
    }
})

//GET TIMELINE POST i.e (all the users am followings and the followings post.)

router.get("/timeline/:userId", async(req, res)=>{
    try{
        const currentUser = await User.findById(req.params.userId)
        const userPosts = await Post.find({userId:currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId)=>{
               return Post.find({userId:friendId})
            })
        );
            res.status(200).json(userPosts.concat(...friendPosts))
    }catch(err){
        res.status(500).json(err)
    }
})

//GET USER ALL POST 

router.get("/profile/:username", async(req, res)=>{
    try{
        const user = await User.findOne({username:req.params.username})
        const post = await Post.find({userId:user._id})
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router