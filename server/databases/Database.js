const mongoose=require('mongoose');


//database address
const dbaddress='mongodb+srv://mediocareteam:mediocareteam@cluster0.6dm6o.mongodb.net/Mediocare?retryWrites=true&w=majority';

//connection
const connectaccount = () =>{
    mongoose.connect(dbaddress).then(()=>{
        console.log("connection successful");
    }).catch((err)=>{
        console.log(err);
    })
}


module.exports=connectaccount;