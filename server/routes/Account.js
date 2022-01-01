const express = require('express');
const {body,validationResult} = require('express-validator');
//for hashing of password
const bcrypt = require('bcryptjs');

//all module imports
const User = require('../models/Account');
const tokengen = require('../token/GentokenUser');

//middleware for token
const Userdata= require('../middleware/Userdata');

const router = express.Router();




//register route
router.post('/register',

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
      let user = await User.findOne({
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
      //salt is added to the user's password so that the users who are having weak password cannot get hacked
      let salt = await bcrypt.genSalt(10);


      //awaiting the function as it return a promise
      let secPass = await bcrypt.hash(req.body.password, salt);
      //in case of no error create the data on the database
      //used await for getting the user data created first and check for errors the res.json will return null as it would be executed earlier
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        contact: req.body.contact,
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







  //login route
  router.post('/login',

  //this will return invalid email and password in case of not valid formats which we got with the package express-validator
  [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
  ],


  //validating the email and password 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }


    //checking if the email exists in the database and if yes then checking if the password is correct
    try {


      //destructuring email and password from the req body
      const {email,password}=req.body;


      //checking if the email is there on the database and storing it on variable user
      let user = await User.findOne({email});


      //if there is no account registered to this email then returning the error to the server with status 400
      if(!user)
      {
         return res.status(400).json({
          "errors": [{
            "value": email,
            "msg": "Please check your email id or password",
            "param": "email",
            "location": "body"
          }]
        })
      }

      //comparing the hashes of the users password with the database using the bcrypth compare method
      const comparepass=await bcrypt.compare(password,user.password);

      //if the password is wrong then sending error to the client with 400 status code
      if(!comparepass)
      {
        return res.status(400).json({
          "errors": [{
            "value": password,
            "msg": "Please check your email id or password",
            "param": "email",
            "location": "body"
          }]
        })
      }
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






  //account details route
  router.post('/account',

  //middleware adding to fetch details of the user with the token
  Userdata,
  //validating the email and password 
  async (req, res) => {
    try {
      userId=req.user.id;

      //select -password don't share the password into the parameter
      //here we can also use findOne({id:userId}).select("-password") which would return the same response
      const details=await User.findById(userId).select("-password");

      //sharing the row as the response
      res.send(details);
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


//updating route for account
  router.post('/update',
  Userdata,
  async (req, res) => {
      try {
          //destructuring the contact and name from body 
          const {name,contact} = req.body;

          //checking if the contact is of length less than 9 and contact changed to string first for length function
          if(contact.toString().length< 9)
          {
              return res.status(400).json({
                  "errors": [{
                      "value": "no-value",
                      "msg": "Invalid contact or name",
                      "param": "no-param",
                      "location": "server"
                  }]
              });
          }
          if(req.user)
          {
              let user = await User.findById(req.user.id);
              if(!user)
              {
                  return res.status(500).json({
                      "errors": [{
                          "value": "no-value",
                          "msg": "Sorry for the inconvinience some internal server error occurred",
                          "param": "no-param",
                          "location": "server"
                      }]
                  });
              }
              else
              {
                  let updatedUser= {};
                  updatedUser.contact=contact;
                  updatedUser.name=name;
                  user= await User.findByIdAndUpdate(req.user.id,{$set:updatedUser},{new:true});
                  res.status(200).send(user);
              }
          }
          else
          {
              return res.status(401).json({
                  "errors": [{
                      "value": "no-value",
                      "msg": "Your session has expired",
                      "param": "no-param",
                      "location": "server"
                  }]
              });
          }
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