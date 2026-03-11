const User = require("../models/User");
const bcrypt = require("bcryptjs");


// SIGNUP
const signupController = async (req,res)=>{
  try{

    const {name,email,password} = req.body;

    if(!name || !email || !password){
      return res.status(400).send({
        success:false,
        message:"All fields are required"
      });
    }

    const existingUser = await User.findOne({email});

    if(existingUser){
      return res.status(400).send({
        success:false,
        message:"User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = new User({
      name,
      email,
      password:hashedPassword
    });

    await user.save();

    res.status(201).send({
      success:true,
      message:"Signup successful"
    });

  }catch(error){
    res.status(500).send({
      success:false,
      message:"Error in signup"
    });
  }
};



// LOGIN
const loginController = async (req,res)=>{
  try{

    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user){
      return res.status(404).send({
        success:false,
        message:"User not found"
      });
    }

    const match = await bcrypt.compare(password,user.password);

    if(!match){
      return res.status(400).send({
        success:false,
        message:"Invalid password"
      });
    }

    res.status(200).send({
      success:true,
      message:"Login successful",
      user:{
        name:user.name,
        email:user.email
      }
    });

  }catch(error){
    res.status(500).send({
      success:false,
      message:"Error in login"
    });
  }
};

module.exports = {signupController,loginController};