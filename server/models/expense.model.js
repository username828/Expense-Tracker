const mongoose=require('mongoose')
const ExpenseSchema = new mongoose.Schema({
  title:{
    type:String,
    require:true,
    trim:true,
    maxLength:50
},
amount:{
    type:Number,
    required: true,
    maxLength:20,
    trim: true 
},
type:{
    type:String,
    default:"expense"
},
date:{
    type:Date,
    maxLength:20,
    trim: true 
},
category: {
    type: String,
    trim: true,
    required: 'Category is required'
},
description:{
    type:String,
    required:true,
    maxLength:100,
    trim:true
},
recorded_by: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
 }
},{timestamps:true})

module.exports=mongoose.model('Expense', ExpenseSchema)