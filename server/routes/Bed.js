const express = require('express');

//all module imports
const Bed = require('../models/Bed');

//middleware for token
const Userdata= require('../middleware/Userdata');


const router = express.Router();



//all beds showing route which are approved by the hospital for the user and same on the hospital side more as a history
router.get('/showtickets/approved',
    Userdata,
    async (req, res) => {
        try {

            //find command returns all the rows of the database
            let ticket;

            //checking if req has hospital or user as the object based on that the search is being made. The user or hospital should be able to
            //see their corresponding tickets only and the token is dcrypted and used that data for showing the result
            //checking for approve to be true for showing all approved token only
            if(req.hospital)
            {
                ticket=await Bed.find({hospital:req.hospital.id,approve:true});
                res.json({"Token type":"Hospital",ticket:ticket});
            }
            //searching for the bed for the user with it's id
            if(req.user)
            {
                ticket=await Bed.find({user:req.user.id,approve:true});
                res.send({"Token type":"User",ticket:ticket});
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
    });






//all beds requests showed to users and hospitals , for users it would show the current status of the bed and for hospital they can approve it 
//also 
router.get('/showtickets/requests',
    Userdata,
    async (req, res) => {
        try {

            //find command returns all the rows of the database
            let ticket;

            //checking if req has hospital or user as the object based on that the search is being made. The user or hospital should be able to
            //see their corresponding tickets only and the token is dcrypted and used that data for showing the result
            //applying approve to be false for all the requests only
            if(req.hospital)
            {
                ticket=await Bed.find({hospital:req.hospital.id,approve:false});
                res.json({"Token type":"Hospital",ticket:ticket});
            }
            //searching for the bed for the user with it's id and approve to be false
            if(req.user)
            {
                ticket=await Bed.find({user:req.user.id,approve:false});
                res.send({"Token type":"User",ticket:ticket});
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
    });




//adding new ticket of bed route
router.post('/addticket/:hid',
    Userdata,
    async (req, res) => {


        try {


            //creating a new record with user id , hospital id and approve
            //another way to create a data other than the create function used in Account
            const bed=new Bed({

                //the user is sent through the auth-token which is fetched from req which was added using the middleware
                user:req.user.id,
                //the hospital is in the req params and sent from the client on the url itself to be fetched
                hospital:req.params.hid,
                approve:false,
                //date is save in unix timestamp so that it can be changed to local time and showed how many days earlier the request is being
                //made using the moment.js
                date: Math.floor((new Date()).getTime() / 1000)
            })

            //saves the data on the database 
            const details=await bed.save();
            res.json(details);
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
    });





//verifying if the token if of user or hospital
router.post('/checktoken',
    Userdata,
    async (req, res) => {
        try {


            //as userdata puts the user or hospital id on the req so we are using that to check if it is user or hospital
            if(req.user)
            {
                res.status(200).send("User");
            }
            else if(req.hospital)
            {
                res.status(200).send("Hospital");
            }
            //the error is sent from Userdata module in case of wrong token but if any other problem occurs an error would be throwed to the 
            //server
            else
            {
                throw "error";
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
    });





//approve a bed request for the hospital
router.post('/approve/:bid',
    Userdata,
    async (req, res) => {
        try {
            if(req.hospital)
            {
                const {action}=req.body;

                //checking if the bed really exists and has been requested from the concerned hospital only to avoid hackers
                let bed=await Bed.findById(req.params.bid);

                //first check is if the bed exists on the database
                if(!bed)
                {
                        return res.status(404).json({
                            "errors": [{
                            "value": "no-value",
                            "msg": "Requested bed doesn't exist",
                            "param": "no-param",
                            "location": "server"
                            }]
                        });
                }

                //second check is if the bed approval or denial request is from the authorized hospital
                if(bed.hospital.toString()!==req.hospital.id)
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

                //if action is true sent in the body of the req then approve the bed request 
                if(action===true)
                {
                    const updatedBed={};
                    //adding a element to the json as approve and marking it as true
                    updatedBed.approve=true;
                    bed=await Bed.findByIdAndUpdate(req.params.bid,{$set:updatedBed},{new:true});
                    res.status(200).send(bed);
                }


                //else if the actio is false then delete the bed request
                else if(action===false)
                {
                    bed=await Bed.findByIdAndDelete(req.params.bid)
                    res.status(200).json({"Success":"Bed has been deleted",bed:bed});
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