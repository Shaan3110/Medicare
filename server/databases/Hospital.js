const mongoose=require('mongoose');


//database address
const dbaddress='mongodb+srv://mediocareteam:mediocareteam@cluster0.6dm6o.mongodb.net/Hospitals?retryWrites=true&w=majority';

//connection
const connectdb = () =>{
    mongoose.connect(dbaddress).then(()=>{
        console.log("connection successful");
    }).catch((err)=>{
        console.log(err);
    })
}


module.exports=connectdb;