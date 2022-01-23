const dotenv = require('dotenv');
dotenv.config();
const mongoose=require('mongoose');


//database address
const dbaddress=process.env.MONGODB_URL;


//connection
const connectaccount = () =>{
    mongoose.connect(dbaddress).then(()=>{
        console.log("connection successful");
    }).catch((err)=>{
        console.log(err);
    })
}


module.exports=connectaccount;