const mongoose=require('mongoose');
const BudgetSchema=new mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    recorded_by: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }

},{timestamps:true})

module.exports=mongoose.model('Budget', BudgetSchema)