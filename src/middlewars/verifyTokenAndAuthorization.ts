import jwt from 'jsonwebtoken';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const gtoken = process.env.TOKEN_SECRET;

export const verifyTokenAndAuthorization = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) =>{
    try{
        const authorizationHeader = req.headers.authorization as string;
        const token = authorizationHeader.split(' ')[1];
        const decoded = jwt.verify(token, gtoken as string);
            // const userString=JSON.stringify(decoded);
            // const userJson=JSON.parse(userString);
            // const user_id=userJson.user.license_id;
            // const user_isAdmin=userJson.user.is_admin;

        try{
            const userString=JSON.stringify(decoded);
            const userJson=JSON.parse(userString);
            const user_id=userJson.user.user_ssn;
            const user_isAdmin=userJson.user.is_admin;
            // console.log(decoded);
if(user_id === req.params.id || user_isAdmin ==="admin"){
    next();
}
else{
    throw "You are Not Allowed To Do That";
}
        }catch(err){
            res.status(500).json(err);
        }
    }catch(error){
        res.status(500).json(`Authorization Error ${error}.`);
    }
} ;