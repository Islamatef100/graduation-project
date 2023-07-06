import jwt from 'jsonwebtoken';
import express, { Request, Response } from 'express';
import { Transaction,transactionStore } from '../models/transactions';
import dotenv from 'dotenv';
import { verifyAuthToken } from '../middlewars/verifyAuthToken';
import { verifyTokenAndAuthorization } from '../middlewars/verifyTokenAndAuthorization';
import { verifyTokenAndAdmin } from '../middlewars/verifyTokenAndAdmin';
import {  uploadImage} from '../middlewars/uploads';
import {  carType} from '../middlewars/carType';
dotenv.config();

const stripe=require('stripe')(process.env.STRIPE_SECRET);

const router = express.Router();
const operations = new transactionStore();
const gtoken = process.env.TOKEN_SECRET;
// verifyTokenAndAdmin,uploadImage
router.post('/',verifyTokenAndAdmin,uploadImage, carType,async (req: express.Request, res: express.Response) => {
    const now =new Date().toLocaleString().split(",");
    const vehicle: Transaction = {
      vehicle_id: req.body.vehicle_id,
      // vehicle_image: req.file?.filename as string,
      vehicle_image: req.body.image,
      place: req.body.place,
      adjustment_date: now[0],
      adjustment_time: now[1],
      fine: req.body.fine,
      payment_date: "notpaid",
      payment_status: "notpaid",
      is_reported: 'unsubmited',
    };
    try {
        // console.log(`${req.file?.filename as string}  ${typeof(req.file?.filename as string)}`);
      const newVehicle = await operations.create(vehicle);
      // const token = jwt.sign({ vehicle: newVehicle }, gtoken as string);
      res.status(200).json({"transactions":newVehicle});
      // res.status(200).json(req.body.fine);
    } catch (err) {
      res.status(500).json(`Cannot create the Vehicle. ${err}.`);
    }
  });
// // //   , verifyAuthToken
// , verifyTokenAndAdmin
  router.get('/' ,  async (req: Request, res: Response) => {
    try {
      const users = await operations.index();
      res.status(200).json({"transactions":users});
    } catch (error) {
      res.status(500).json(`Cannot Get the transactions. ${error}.`);
    }
  });
  
  router.get('/:id/admin/:trId', verifyTokenAndAuthorization, async (req: Request, res: Response) => {
    try {
      const vehicle = await operations.show(req.params.trId);
      res.status(200).json({"transactions":vehicle});
    } catch (error) {
      res.status(500).json(`Cannot Get the vehicle. ${error}.`);
    }
  });
  //########################################################################
  //########################################################################
  router.get('/:id/user', verifyTokenAndAuthorization, async (req: Request, res: Response) => {
    try {
      const vehicle = await operations.showUserTransactions(req.params.id);
      res.status(200).json({"transactions":vehicle});
    } catch (error) {
      res.status(500).json(`Cannot Get the vehicle. ${error}.`);
    }
  });
//########################################################################
//########################################################################
  router.get('/:id/user/notpaid', verifyTokenAndAuthorization, async (req: Request, res: Response) => {
    try {
      const vehicle = await operations.showUserTransactionsNotPaid(req.params.id);
      res.status(200).json({"transactions":vehicle});
    } catch (error) {
      res.status(500).json(`Cannot Get the vehicle. ${error}.`);
    }
  });
  //########################################################################
  //########################################################################
  router.get('/:id/user/paid', verifyTokenAndAuthorization, async (req: Request, res: Response) => {
    try {
      const vehicle = await operations.showUserTransactionsPaid(req.params.id);
      res.status(200).json({"transactions":vehicle});
    } catch (error) {
      res.status(500).json(`Cannot Get the vehicle. ${error}.`);
    }
  });
  //########################################################################
  //########################################################################
  router.get('/:id/user/reported', verifyTokenAndAuthorization, async (req: Request, res: Response) => {
    try {
      const vehicle = await operations.showUserTransactionsReported(req.params.id);
      res.status(200).json({"transactions":vehicle});
    } catch (error) {
      res.status(500).json(`Cannot Get the vehicle. ${error}.`);
    }
  });
  //########################################################################
  //########################################################################
  router.get('/:id/car/:carId', verifyTokenAndAuthorization, async (req: Request, res: Response) => {
    try {
      const vehicle = await operations.showVehicleTransactions(req.params.carId as unknown as string);
      res.status(200).json({"transactions":vehicle});
    } catch (error) {
      res.status(500).json(`Cannot Get the User vehicles. ${error}.`);
    }
  });

  router.patch('/:id/report/:trId', verifyTokenAndAuthorization, async (req: Request, res: Response) => {
    try {
      const vehicle = await operations.reportWaiting(req.params.trId as unknown as string);
      res.status(200).json({"transactions":vehicle});
    } catch (error) {
      res.status(500).json(`Cannot report the transaction. ${error}.`);
    }
  });
  router.patch('/report/:id/approved', verifyTokenAndAdmin, async (req: Request, res: Response) => {
    try {
      const vehicle = await operations.reportApproved(req.params.id as unknown as string);
      res.status(200).json({"transactions":vehicle});
    } catch (error) {
      res.status(500).json(`cannot approve the transaction. ${error}.`);
    }
  });
  router.patch('/report/:id/declined', verifyTokenAndAdmin, async (req: Request, res: Response) => {
    try {
      const vehicle = await operations.reportDeclined(req.params.id as unknown as string);
      res.status(200).json({"transactions":vehicle});
    } catch (error) {
      res.status(500).json(`Cannot decline the transaction. ${error}.`);
    }
  });





  router.put('/:id',verifyTokenAndAdmin,uploadImage, async (req: Request, res: Response) => {
    try {
      const now =new Date().toLocaleString().split(",");
      const user: Transaction = {
        vehicle_id: req.body.license_id,
        vehicle_image: req.body.image,
        place: req.body.place,
        adjustment_date: now[0],
        adjustment_time:now[1],
        fine: req.body.fine,
        payment_date: req.body.payment_date,
        payment_status: req.body.payment_status,
        is_reported:req.body.is_reported,
      };
      const newUser = await operations.update(user, req.params.id);
      res.status(200).json({"transactions":newUser});
    } catch (error) {
      res.status(500).json(`Cannot Update the transaction handler. ${error}.`);
    }
  });



  router.delete('/:id', verifyTokenAndAdmin, async (req: Request, res: Response) => {
    try {
      const deleted = await operations.delete(req.params.id as unknown as number);
      res.status(200).json({"transactions":deleted});
    } catch (error) {
      res.status(500).json(`Cannot Delete the vehicle. ${error}.`);
    }
  });


  function getDayDiff(startDate: Date, endDate: Date): number {
    const msInDay = 24 * 60 * 60 * 1000;
  
    // 👇️ explicitly calling getTime()
    return Math.round(
      Math.abs(endDate.getTime() - startDate.getTime()) / msInDay,
    );
  }
  router.get('/:id/checkout-session/:carID',async (req: Request, res: Response)=>{
    try { //verifyTokenAndAuthorization
      const vehicle = await operations.show(req.params.carID as unknown as string);
      // res.status(200).json(vehicle.fine);
      const adj_date=vehicle.adjustment_date;
    const now =new Date().toLocaleString().split(",")[0];
const difference=getDayDiff(new Date(adj_date),new Date(now));
      let totalprice=0;
if(difference >= 7){
  totalprice=vehicle.fine*1000+10;
}
else{
  totalprice=vehicle.fine*1000;
}
      const carId=vehicle.vehicle_id;
      const session=await stripe.checkout.sessions.create({
        line_items:[{
// ////////////////////// name:vehicle.vehicle_id,
// /////////////////////// amount:vehicle.fine*100,
// //////////////////////// amount:totalprice,
// ///////////////////////// currency:"egp",
// /////////////////////////// price:totalprice as unknown as string ,
// ///////////////////////// price_data:totalprice,
// ///////////////////////////// quantity:1,
price_data:{
  currency:"egp",
  product_data:{
    name:`transaction ID: ${req.params.carID}`,
  },
  unit_amount:totalprice,
},
quantity:1, //http://192.168.1.3:4242/failed
        }],
      mode:"payment",
      success_url: `${req.protocol}://${req.get("host")}/successed`,    //${req.get("host")}   //${req.protocol}
    cancel_url: `${req.protocol}://${req.get("host")}/failed`,                    //${req.get("host")}
    client_reference_id:req.params.carID,
      });
/////////////////////////////////// const session=await stripe.charges.create({
////////////////////////////////   amount:totalprice*100000,
/////////////////////////////////   source:"tok_visa",
/////////////////////////////////   currency:"egp"
///////////////////////////////// });
      res.status(200).json({status:"success",url:session.url,session});
      // res.status(200).json({vehicle,difference,adj_date,totalprice});
    } catch (error) {
      res.status(500).json(`Cannot create the session for the transaction. ${error}.`);
    }
  });

export default router;
