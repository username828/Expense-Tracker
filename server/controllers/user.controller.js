const UserSchema=require("../models/user.model")
const jwt = require('jsonwebtoken')

exports.getUsers=async(req,res)=>{
    try{
        const users=await UserSchema.find()
        res.status(200).json(users)
    } catch(error){
        res.status(500).json({message:"Server Error"})
    }
}

exports.getUserById=async(req,res)=>{
    
    const token=req.cookies.token
    console.log('Received token:', token); 
    
    if (!token) return res.status(401).json({ message: 'Unauthorized access' });
  
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY); // Verify the JWT token
      console.log('Decoded token:', decoded); 
      const user = await UserSchema.findById(decoded.id).select('-password'); // Find user by ID, exclude password
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({user}); // Return user data
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Invalid token' });
    }
  

}