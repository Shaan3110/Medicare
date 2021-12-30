const express = require('express');
const {body,validationResult} = require('express-validator');
//for hashing of password
const bcrypt = require('bcryptjs');

//all module imports
const Hospital = require('../models/Hospital');
const tokengen = require('../token/Gentoken');

//middleware for token
// const Userdata= require('../mIddleware/Userdata');

const router = express.Router();




//register route
router.post('/auth/register',

  //this will return invalid email and password in case of not valid formats which we got with the package express-validator
  [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Invalid password').isLength({
      min: 8
    })
  ],


  //validating the email and password 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }


    //checking if the email already exists on the database
    try {
      let user = await Hospital.findOne({
        email: req.body.email
      });
      // console.log(user)
      if (user) {
        return res.status(400).json({
          "errors": [{
            "value": req.body.email,
            "msg": "Account already exist with this email",
            "param": "email",
            "location": "body"
          }]
        });
      }

      //checking if the contact is already present in the database
      user = await Hospital.findOne({
        contact: req.body.contact
      });
      if (user) {
        return res.status(400).json({
          "errors": [{
            "value": req.body.contact,
            "msg": "Account already exist with this contact",
            "param": "contact",
            "location": "body"
          }]
        });
      }
      //salt is added to the user's password so that the users who are having weak password cannot get hacked
      let salt = await bcrypt.genSalt(10);


      //awaiting the function as it return a promise
      let secPass = await bcrypt.hash(req.body.password, salt);
      //in case of no error create the data on the database
      //used await for getting the user data created first and check for errors the res.json will return null as it would be executed earlier
      user = await Hospital.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        beds: 0,
        approve: false,
        contact: req.body.contact,
        location: req.body.location
      })

      //module returns the token in normal form which we will send to the user in json format
      const token=tokengen(user.id);
      //sending authentication token to the user


      res.json({token})
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        "errors": [{
          "value": "no-value",
          "msg": "Sorry for the inconvinience some internal server error occurred",
          "param": "no-param",
          "location": "server"
        }]
      });
    }
  })

  module.exports = router;
