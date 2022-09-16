const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").userModel;
const jwt = require("jsonwebtoken");

router.use((req,res,next) =>{
    console.log("A request is coming into the router");
    next();
});
router.get("/testAPI",(req,res) =>{
    const msgObj = {
        message:"Test API is working",
    };
    return res.json(msgObj);
});

router.post("/register", async (req,res) =>{
    // on check the validation 
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check the exist of the user
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email has already been registered");
    //register the user
    const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
    });
    try{
        const savedUser = await newUser.save();
        res.status(200).send({
            msg: "success",
            savedObject: savedUser,
        });
    }catch(err){
        res.status(400).send("user is not saved");
    }
});

router.post("/login",(req,res) =>{
    // check the validation of the data
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    User.findOne({email: req.body.email},function(err,user){
        if(err) return res.status(400).send(err);
        if(!user){
            res.status(401).send("User is not found");
        }else{
            user.comparePassword(req.body.password,function(err,isMatch){
                if (err) return res.status(400).send(err);
                if(isMatch){
                    const tokenObject = {_id:user._id,email:user.email};
                    const token = jwt.sign(tokenObject,process.env.PASSPORT_SECRET);
                    res.send({success: true , token:"JWT " + token , user})
                }else{
                    console.log(err);
                    res.status(401).send("wrong password");
                };
            });
        }
    })
})

module.exports = router;