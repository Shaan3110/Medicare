const express=require('express');
const router=express.Router();

router.get('/login',(req,res)=>{
    obj={
        email:"Rohan",
        password:"123456"
    }
    res.json(obj);
})

module.exports=router;