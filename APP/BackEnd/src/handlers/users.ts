import jwt, { JwtPayload } from 'jsonwebtoken';
import express, { Request, Response } from 'express';
import { User, usersStore } from '../models/users';
import dotenv from 'dotenv';
import { verifyAuthToken } from '../middlewars/verifyAuthToken';
import { verifyTokenAndAuthorization } from '../middlewars/verifyTokenAndAuthorization';
import { verifyTokenAndAdmin } from '../middlewars/verifyTokenAndAdmin';
import { body,validationResult } from 'express-validator';
dotenv.config();

const router = express.Router();
const operations = new usersStore();
const gtoken = process.env.TOKEN_SECRET;

router.post('/', body('user_ssn').isLength({max:14,min:14}),body('user_email').isEmail(),async (req: express.Request, res: express.Response) => {
    try {
      const errors=validationResult(req);
      if(errors.mapped().user_email){
        throw "Invalid Email";
              }else if(errors.mapped().user_ssn){
                throw "Invalid Social Security Number";
              }
      if(errors.isEmpty()){
        const user: User = {
          user_name: req.body.user_name,
          user_ssn: req.body.user_ssn,
          manufacturer_number: req.body.manufacturer_number,
          user_email: req.body.user_email,
        user_password: req.body.user_password,
        user_address: req.body.user_address,
        user_job: req.body.user_job,
        user_nationality: req.body.user_nationality,
        user_phone: req.body.user_phone,
        user_bd: req.body.user_bd,
        user_governorate: req.body.user_governorate,
  is_admin:"user",
      };
        const newUser = await operations.register(user);
        const token = jwt.sign({ user: newUser }, gtoken as string);
        res.status(200).json(token);
      }
    } catch (err) {
      res.status(500).json(`Cannot create the user. ${err}.`);
    }
  });
  router.post('/addAdmin' , async (req: express.Request, res: express.Response) => {
    const user: User = {
        user_name: req.body.user_name,
        user_ssn: req.body.user_ssn,
        manufacturer_number: req.body.manufacturer_number,
        user_email: req.body.user_email,
      user_password: req.body.user_password,
      user_address: req.body.user_address,
      user_job: req.body.user_job,
      user_nationality: req.body.user_nationality,
      user_phone: req.body.user_phone,
      user_bd: req.body.user_bd,
      user_governorate: req.body.user_governorate,
      is_admin:"admin",
    };
    try {
      const newUser = await operations.register(user);
      const token = jwt.sign({ user: newUser }, gtoken as string);
      res.status(200).json(token);
    } catch (err) {
      res.status(500).json(`Cannot create the user. ${err}.`);
    }
  });
  router.post('/addOfficer', verifyTokenAndAdmin,async (req: express.Request, res: express.Response) => {
    const user: User = {
        user_name: req.body.user_name,
        user_ssn: req.body.user_ssn,
        manufacturer_number: req.body.manufacturer_number,
        user_email: req.body.user_email,
      user_password: req.body.user_password,
      user_address: req.body.user_address,
      user_job: req.body.user_job,
      user_nationality: req.body.user_nationality,
      user_phone: req.body.user_phone,
      user_bd: req.body.user_bd,
      user_governorate: req.body.user_governorate,
is_admin:"officer",
    };
    try {
      const newUser = await operations.register(user);
      const token = jwt.sign({ user: newUser }, gtoken as string);
      res.status(200).json(token);
    } catch (err) {
      res.status(500).json(`Cannot create the user. ${err}.`);
    }
  });
  router.post('/login', async (req: express.Request, res: express.Response) => {
    const user: User = {
        user_name: '',
      user_password: req.body.user_password,
      user_ssn: 0,
      manufacturer_number: '',
      user_email: req.body.user_email,
      user_address: '',
      user_job: '',
      user_nationality: '',
      user_phone: '',
      user_bd: '',
      user_governorate: '',
      is_admin: '',
    };
    console.log(`${req.body.user_password} \n ${req.body.user_email}`)
    try {
      console.log(user.user_email);
      const u = await operations.login(user.user_email, user.user_password);
      const token = jwt.sign({ user: u }, gtoken as string);
      if(u == null){
        res.status(200).json({"status":false,"token":token,u});
        // res.status(200).json({"status":"failed","token":token,u});
      }
      else{
        res.status(200).json({"status":true,"token":token,u});
        // res.status(200).json({"status":"succeed","token":token,u});

      }
      // res.status(200).json(u);
    } catch (error) {
      res.status(500).json(`Cannot Login the user. ${error}.`);
    }
  });
//   , verifyAuthToken
  router.get('/' , verifyTokenAndAdmin, async (req: Request, res: Response) => {
    try {
      const users = await operations.index();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(`Cannot Get the users. ${error}.`);
    }
  });
  
  router.get('/:id', verifyTokenAndAuthorization, async (req: Request, res: Response) => {
    try {
      const user = await operations.show(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(`Cannot Get the user. ${error}.`);
    }
  });
  
  router.put('/:id', verifyTokenAndAuthorization, async (req: Request, res: Response) => {
    try {
      const user: User = {
        user_name: req.body.user_name,
        user_ssn: req.params.id as unknown as number,
        manufacturer_number: req.body.manufacturer_number,
        user_email: req.body.user_email,
        user_password: req.body.user_password,
        user_address: req.body.user_address,
        user_job: req.body.user_job,
        user_nationality: req.body.user_nationality,
        user_phone: req.body.user_phone,
        user_bd: req.body.user_bd,
        user_governorate: req.body.user_governorate,
        is_admin:'',
      };
      const newUser = await operations.update(user, req.params.id);
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json(`Cannot Update the user. ${error}.`);
    }
  });
  router.patch('/:id', verifyTokenAndAuthorization, async (req: Request, res: Response) => {
    try {
      // const oldPassword=req.body.oldPassword;
      if(await operations.checkPassword(req.params.id,req.body.oldPassword)){
        const newUser = await operations.updatePassword(req.params.id,req.body.newPassword);
      res.status(200).json(newUser);
      }
      else{
        throw "the Old Password is Incorrect";
      }
    } catch (error) {
      res.status(500).json(`Cannot Update the user password. ${error}.`);
    }
  });
  router.delete('/:id', verifyTokenAndAdmin, async (req: Request, res: Response) => {
    try {
      const deleted = await operations.delete(req.params.id);
      res.status(200).json(deleted);
    } catch (error) {
      res.status(500).json(`Cannot Delete the user. ${error}.`);
    }
  });
 
export default router;
