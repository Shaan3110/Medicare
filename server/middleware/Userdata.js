//jsonwebtoken(jwt) is used to generate a token for the user on register or login and verification of it it consists of 3 parts written on documentation
const jwt = require('jsonwebtoken');
const JWT_SECRET="trialsecretkey"


async function Userdata(req,res,next){  

    //the token is sent from the user in the request header with the title auth-token
    token=req.header('auth-token');

    //checking if the token is present, if not then the user should get a 401 response and redirect to login page
    if(!token)
    {
        res.status(401).json({
            "errors": [{
              "value": "no-value",
              "msg": "Your session has expired",
              "param": "no-param",
              "location": "server"
            }]
          });
    }

    //verifying if the token is correct with the jwt verify function using the secret key and token of the user 
    try {
        const data=await jwt.verify(token,JWT_SECRET);

        //if the verification is successful then we are setting the user to the req which we can use to get the id as on generation the token
        //we used then user:{data:{id:id}} would be on the req and we can directly access the id out of it
        if(data.user)
        {
          req.user=data.user;
        }
        if(data.hospital)
        {
          req.hospital=data.hospital;
        }

        //calls the next function after no error occurred
        next();

    } catch (error) {
        console.log(error.message);
        res.status(401).json({
            "errors": [{
              "value": "no-value",
              "msg": "Your session has expired",
              "param": "no-param",
              "location": "server"
            }]
          });
    }
}
module.exports=Userdata
