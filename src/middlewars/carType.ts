
import express from 'express';

import { Vehicle, vehicleStore } from '../models/vehicles';


export const carType =async (  req: express.Request,
    res: express.Response,
    next: express.NextFunction
    )=>{
const vehicle_id=req.body.vehicle_id;
const operations = new vehicleStore();
try{
    const newVehicle = await operations.showVehicleClass(vehicle_id);
    // req.body.vehicle_class=newVehicle;
    if(newVehicle.vehicle_class=="private"){
    req.body.fine=10;
    }else if(newVehicle.vehicle_class =="transfer"){
    req.body.fine=20;
    }
    else{
    req.body.fine=0;
    }
    next();
    // res.status(200).json(newVehicle.vehicle_class);
}catch(err){
    res.status(500).json(`Cannot get the car class`);
}
}