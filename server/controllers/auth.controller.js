const UserSchema=require("../models/user.model");
const {createToken}=require("../util/Token");
const bcrypt=require("bcryptjs");


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
      token: token, // Send the token in the response JSON
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
