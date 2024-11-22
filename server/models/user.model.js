const mongoose=require('mongoose')

const bcrypt=require('bcrypt')
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required: true
    },

    email:{
        type:String,
        trim:true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: true
    },

    password:{
        type:String,
        required:true
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,


    // hashed_password: {
    //     type: String,
    //     required: "Password is required"
    // },
    // salt: String


});

UserSchema.pre("save",async function () {
    this.password=await bcrypt.hash(this.password,12)
})

// //password as virtual field
// UserSchema.virtual('password').set(function(password){
//     this._password=password
//     this.salt=this.makeSalt()
//     this.hashed_password=this.encryptPassword(password)
// })
// .get(function(){
//     return this._password
// })

// UserSchema.path('hashed_password').validate(function(v){

// })
module.exports = mongoose.model('User',UserSchema);