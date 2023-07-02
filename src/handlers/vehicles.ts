import jwt from 'jsonwebtoken';
import express, { Request, Response } from 'express';
import { Vehicle, vehicleStore } from '../models/vehicles';
import dotenv from 'dotenv';
import {  verifyAuthToken } from '../middlewars/verifyAuthToken';
import {  verifyTokenAndAuthorization } from '../middlewars/verifyTokenAndAuthorization';
import {  verifyTokenAndAdmin } from '../middlewars/verifyTokenAndAdmin';
import {  uploadImage} from '../middlewars/uploadsCars';
dotenv.config();

const router = express.Router();
const operations = new vehicleStore();
const gtoken = process.env.TOKEN_SECRET;

router.post('/',verifyTokenAndAdmin,uploadImage ,async (req: express.Request, res: express.Response) => {
    try {
      const vehicle: Vehicle = {
        license_id: req.body.license_id,
        vehicle_class: req.body.vehicle_class,
        traffic_unit: req.body.traffic_unit,
        license_create_date: req.body.license_create_date,
        license_expired_date: req.body.license_expired_date,
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        manufacturering_year: req.body.manufacturering_year,
        color: req.body.color,
        is_stolen: 'safe',
        vehicle_id: req.body.vehicle_id,
        checked:'approved',
        vehicle_image:req.body.image,
    };
      const newVehicle = await operations.create(vehicle);
      // const token = jwt.sign({ vehicle: newVehicle }, gtoken as string);
      res.status(200).json(newVehicle);
    } catch (err) {
      res.status(500).json(`Cannot create the Vehicle in the handler. ${err}.`);
    }
  });
  router.post('/:id/addCar',verifyTokenAndAuthorization,uploadImage ,async (req: express.Request, res: express.Response) => {
    try {
      const vehicle: Vehicle = {
        license_id: req.body.license_id,
        vehicle_class: req.body.vehicle_class,
        traffic_unit: req.body.traffic_unit,
        license_create_date: req.body.license_create_date,
        license_expired_date: req.body.license_expired_date,
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        manufacturering_year: req.body.manufacturering_year,
        color: req.body.color,
        is_stolen: 'safe',
        vehicle_id: req.body.vehicle_id,
        checked:'waiting',
        vehicle_image:req.body.image,
    };
      const newVehicle = await operations.create(vehicle);
      // const token = jwt.sign({ vehicle: newVehicle }, gtoken as string);
      res.status(200).json(newVehicle);
    } catch (err) {
      res.status(500).json(`Cannot create the Vehicle in the handler. ${err}.`);
    }
  });
// //   , verifyAuthToken
  router.get('/' , verifyTokenAndAdmin, async (req: Request, res: Response) => {
    try {
      const users = await operations.index();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(`Cannot Get the vehicles. ${error}.`);
    }
  });
  
  router.get('/:id/admin', verifyTokenAndAdmin, async (req: Request, res: Response) => {
    try {
      const vehicle = await operations.show(req.params.id);
      res.status(200).json(vehicle);
    } catch (error) {
      res.status(500).json(`Cannot Get the vehicle. ${error}.`);
    }
  });
  
  router.get('/:id', verifyTokenAndAuthorization, async (req: Request, res: Response) => {
    try {
      const vehicle = await operations.showUserVehicles(req.params.id as unknown as number);
      res.status(200).json({"vehicles":vehicle});
    } catch (error) {
      res.status(500).json(`Cannot Get the User vehicles. ${error}.`);
    }
  });
  // user stolen
  router.get('/:id/userstolencars', verifyTokenAndAuthorization, async (req: Request, res: Response) => {
    try {
      const deleted = await operations.allUserStolenVehicles(req.params.id);
      res.status(200).json({"vehicles":deleted});
    } catch (error) {
      res.status(500).json(`Cannot handle all user stolen cars. ${error}.`);
    }
  });
  router.get('/:id/usersafecars', verifyTokenAndAuthorization, async (req: Request, res: Response) => {
    try {
      const deleted = await operations.allUserSafeVehicles(req.params.id);
      res.status(200).json({"vehicles":deleted});
    } catch (error) {
      res.status(500).json(`Cannot handle all user safe cars. ${error}.`);
    }
  });
  // stolens
  router.put('/updateCar/:id', verifyTokenAndAuthorization,uploadImage, async (req: Request, res: Response) => {
    try {
      const user: Vehicle = {
        license_id: req.body.license_id,
        vehicle_class: req.body.vehicle_class,
        traffic_unit: req.body.traffic_unit,
        license_create_date: req.body.license_create_date,
        license_expired_date: req.body.license_expired_date,
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        manufacturering_year: req.body.manufacturering_year,
        color: req.body.color,
        is_stolen: 'safe',
        vehicle_id:req.params.id,
        checked:'waiting',
        vehicle_image:req.body.image,
      };
      const newUser = await operations.update(user, req.params.id);
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json(`Cannot Update the vehicle. ${error}.`);
    }
  });
  router.put('/:id', verifyTokenAndAdmin,uploadImage, async (req: Request, res: Response) => {
    try {
      const user: Vehicle = {
        license_id: req.body.license_id,
        vehicle_class: req.body.vehicle_class,
        traffic_unit: req.body.traffic_unit,
        license_create_date: req.body.license_create_date,
        license_expired_date: req.body.license_expired_date,
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        manufacturering_year: req.body.manufacturering_year,
        color: req.body.color,
        is_stolen: 'safe',
        vehicle_id:req.params.id,
        checked:'approved',
        vehicle_image:req.body.image,
      };
      const newUser = await operations.update(user, req.params.id);
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json(`Cannot Update the vehicle. ${error}.`);
    }
  });
  router.delete('/:id', verifyTokenAndAdmin, async (req: Request, res: Response) => {
    try {
      const deleted = await operations.delete(req.params.id);
      res.status(200).json(deleted);
    } catch (error) {
      res.status(500).json(`Cannot Delete the vehicle. ${error}.`);
    }
  });
  router.patch('/:carId/stolen', verifyTokenAndAuthorization, async (req: Request, res: Response) => {
    try {
      const vehicle = await operations.stolen_vehicle(req.params.carId);
      res.status(200).json(vehicle);
    } catch (error) {
      res.status(500).json(`Cannot Get the vehicle As Stolen. ${error}.`);
    }
  });
  router.patch('/:carId/safe', verifyTokenAndAuthorization, async (req: Request, res: Response) => {
    try {
      const vehicle = await operations.retrieved_vehicle(req.params.carId);
      res.status(200).json(vehicle);
    } catch (error) {
      res.status(500).json(`Cannot Get the vehicle As Safe. ${error}.`);
    }
  });
  router.patch('/:carId/declined', verifyTokenAndAdmin, async (req: Request, res: Response) => {
    try {
      const vehicle = await operations.decline_vehicle(req.params.carId);
      res.status(200).json(vehicle);
    } catch (error) {
      res.status(500).json(`Cannot Get the vehicle As Safe. ${error}.`);
    }
  });
  router.patch('/:carId/approved', verifyTokenAndAdmin, async (req: Request, res: Response) => {
    try {
      const vehicle = await operations.approve_vehicle(req.params.carId);
      res.status(200).json(vehicle);
    } catch (error) {
      res.status(500).json(`Cannot Get the vehicle As Safe. ${error}.`);
    }
  });
export default router;







// {
//   "vehicle_id":"ك ط ر 3 1 2 4",
//   "license_id":30110302300111,
//   "vehicle_class":"private",
//   "traffic_unit":"egypt",
//   "license_create_date":"30-10-2001",
//   "license_expired_date":"30-10-2001",
//   "manufacturer":"Daewoo",
//   "model":"nubira",
//   "manufacturering_year":"30",
//   "color":"silver"
// }