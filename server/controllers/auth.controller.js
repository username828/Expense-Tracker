const UserSchema=require("../models/user.model");
const {createToken}=require("../util/Token");
const bcrypt=require("bcryptjs");
const jwt = require('jsonwebtoken')


exports.signUp=async(req,res)=>{

    try{
        const { name, email, password, created } = req.body;
        const existingUser = await UserSchema.findOne({email});
    
        if(existingUser){
            return res.json({message:"User already exists"})
        }
    
        const user=await UserSchema.create({name,email,password,created})
        const token=createToken(user._id)
    
        //jwt cookie set up
        res.cookie("token",token,{
          sameSite: 'strict',  
          httpOnly:true,
        })
        res.status(201).json({message:"User signed in successfully", success: true, user });
    } catch(error){
        console.log(error)
    }

}


exports.login=async (req,res)=>{
    try {
        const { name, password } = req.body;
        if(!name || !password ){
          return res.json({message:'All fields are required'})
        }
        const user = await UserSchema.findOne({ name });
        if(!user){
          return res.json({message:'Incorrect password or name' }) 
        }
        console.log("Password",password,"stored Password",user.password)
        const auth = await bcrypt.compare(password,user.password)
        if (!auth) {
          return res.json({message:'Incorrect password or email' }) 
        }
         const token = createToken(user._id);
         res.cookie("token", token, {
           sameSite: 'strict',
           httpOnly: true,
         });
    // Send the token in the response body so frontend can access it
    return res.status(200).json({
      message: 'User logged in successfully',
      success: true,
      token
       // Send the token in the response JSON
    });
        } catch (error) {
        console.error(error);
      }
}

exports.logout=async(req,res)=>{
  try{
    res.cookie("token","",{
      httpOnly:true,
      sameSite:'strict',
      expires: new Date(0),
    })
    res.status(200).json({message: "User logged out",success:true})
  } catch (error){
    res.status(500).json({ message: "An error occurred during logout", success: false });
  }

}

exports.changePassword = async (req, res) => {

  try {
    // Verify the JWT token
    //const decoded = jwt.verify(token, process.env.TOKEN_KEY); // Ensure TOKEN_KEY is correctly set in your .env

    console.log(req.body)
    const { id,currentPassword, newPassword, confirmNewPassword } = req.body;

    console.log("User Id:",id)
    const user = await UserSchema.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (currentPassword && newPassword && confirmNewPassword) {
      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ message: 'New passwords do not match' });
      }
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect current password' });
      }
      user.password = await bcrypt.hash(newPassword, 12);
      await user.save();
    }
    

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

