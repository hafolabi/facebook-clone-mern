const router = require('express').Router();
const User = require('../models/Users')
const bcrypt = require('bcrypt');

//REGISTER

router.post("/register", async (req, res)=>{
    
    try{
        //generate new password
        const salt = await bcrypt.genSalt(10)
        const hassedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser = await new User({
            username:req.body.username,
            email:req.body.email,
            password:hassedPassword,
        })

        //save user and return response
        const user = await newUser.save();
        res.status(200).json(user)

    }catch(err){
        res.status(500).json(err);
    }

})

//LOGIN
router.post('/login',async (req, res)=>{
    try{
        const user = await User.findOne({email:req.body.email}).collation(
            { locale: "en", 
             strength: 2 })
        if(!user) return res.status(404).json("user not found")

        const validPassword = await bcrypt.compare(req.body.password, user.password )
        if(!validPassword) return res.status(400).json("wrong password")

        const {password,email, isAdmin, updatedAt, ...other} = user._doc
        res.status(200).json(other)
    }catch(err){
        res.status(500).json(err);
    }
})
module.exports = router