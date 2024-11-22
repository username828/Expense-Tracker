const express=require('express')
const cors=require('cors')
const {db}=require('./db/db');

const cookieParser = require("cookie-parser");
const {readdirSync}=require('fs');//read whatever files in routes

//methods for express
const app=express();
require('dotenv').config()
const PORT=process.env.PORT

//middlewares
app.use(express.json())//data in json
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))//which host to be accessed by

app.use(cookieParser())



//routes
readdirSync('./routes').map((route)=>app.use('/api',require('./routes/'+route)))//base api

const server=()=>{    
    db()
    app.listen(PORT,()=>{
        console.log('You are listening to port: ',PORT);
    })
}
server()