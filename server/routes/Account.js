const express=require('express');
const { body, validationResult } = require('express-validator');
const User=require('../models/Account')

const router=express.Router();

router.post('/login',
    [
        body('email','Invalid email').isEmail(),
        body('password','Invalid password').isLength({ min: 8 })
    ],(req,res)=>{
    const user=new User(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        contact: req.body.contact,
      }).then(user => res.json(user));
})

module.exports=router;