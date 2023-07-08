import Client from '../database';


export type Vehicle = {
    vehicle_id:string;
  license_id :number;
    vehicle_class: string;
    traffic_unit:string;
    license_create_date:string;
    license_expired_date: string;
    manufacturer: string;
    model: string;
    manufacturering_year: number;
    color: string;
    is_stolen: string;
    checked: string;
    vehicle_image: string;
};

export class vehicleStore {
    async create(u: Vehicle): Promise<Vehicle> {
        try {
          const conn = await Client.connect();
          const sql =
            'INSERT INTO vehicles (license, vehicle_class, traffic_unit, license_create_date, license_expired_date ,manufacturer ,model ,manufacturering_year ,color ,is_stolen ,vehicle_id ,checked ,vehicle_image) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *';
          const vehicle = await conn.query(sql, [
            u.license_id,
            u.vehicle_class,
            u.traffic_unit,
            u.license_create_date,
            u.license_expired_date,
            u.manufacturer,
            u.model,
            u.manufacturering_year,
            u.color,
            u.is_stolen,
            u.vehicle_id,
            u.checked,
            u.vehicle_image
          ]);
          conn.release();
          return vehicle.rows[0];
        } catch (err) {
          throw new Error(`Cannot Create Vehicle. ${err}.`);
        }
      }
      async index(): Promise<Vehicle[]> {
        try {
          const conn = await Client.connect();
          const sql = 'SELECT * FROM vehicles';
          const vehicles = await conn.query(sql);
          conn.release();
          return vehicles.rows;
        } catch (err) {
          throw new Error(`Cannot Display The Vehicles. ${err}.`);
        }
      }
      async show(id: string): Promise<Vehicle> {
        try {
          const conn = await Client.connect();
          const sql = 'SELECT * FROM vehicles WHERE vehicle_id = $1';
          const vehicle = await conn.query(sql, [id]);
          conn.release();
          return vehicle.rows[0];
        } catch (err) {
          throw new Error(`Cannot Display The Specific Vehicle. ${err}.`);
        }
      }
      async showVehicleClass(id: string): Promise<any> {
        try {
          const conn = await Client.connect();
          const sql = 'SELECT vehicle_class FROM vehicles WHERE vehicle_id = $1';
          const vehicle = await conn.query(sql, [id]);
          conn.release();
          // console.log(vehicle);
          return vehicle.rows[0];
        } catch (err) {
          throw new Error(`Cannot Display The Specific Vehicle class. ${err}.`);
        }
      }
      //%%%%%%%%%%%%%%%%%%%%%%
      async showAllStolenVehicles(): Promise<Vehicle> {
        try {
          const conn = await Client.connect();
          const sql = 'SELECT * FROM vehicles WHERE is_stolen = $1';
          const vehicle = await conn.query(sql, ["stolen"]);
          conn.release();
          return vehicle.rows[0];
        } catch (err) {
          throw new Error(`Cannot Display The Stolen Vehicles. ${err}.`);
        }
      }
      async showAllSafeVehicles(): Promise<Vehicle> {
        try {
          const conn = await Client.connect();
          const sql = 'SELECT * FROM vehicles WHERE is_stolen = $1';
          const vehicle = await conn.query(sql, ["safe"]);
          conn.release();
          return vehicle.rows[0];
        } catch (err) {
          throw new Error(`Cannot Display The Safe Vehicles. ${err}.`);
        }
      }
      //%%%%%%%%%%%%%%%%%%%%%%
      async showUserVehicles(id: number): Promise<Vehicle[]> {
        try {
          const conn = await Client.connect();
          const sql = 'SELECT * FROM vehicles WHERE license = $1';
          const vehicle = await conn.query(sql, [id]);
          conn.release();
          const vehicles= vehicle.rows;
          return vehicles;
        } catch (err) {
          throw new Error(`Cannot Display The Specific User Vehicle. ${err}.`);
        }
      }
      async update(u: Vehicle, id: string): Promise<Vehicle> {
        try {
          // console.log("in model");
          const sql =
            'UPDATE vehicles SET license=$1, vehicle_class=$2, traffic_unit=$3, license_create_date=$4, license_expired_date=$5, manufacturer=$6, model=$7, manufacturering_year=$8, color=$9, is_stolen=$10, checked=$12, vehicle_image=$13 WHERE vehicle_id=$11 RETURNING *';
          const conn = await Client.connect();
          const result = await conn.query(sql, [
            u.license_id,
            u.vehicle_class,
            u.traffic_unit,
            u.license_create_date,
            u.license_expired_date,
            u.manufacturer,
            u.model,
            u.manufacturering_year,
            u.color,
            u.is_stolen,
            id,
            u.checked,
            u.vehicle_image
          ]);
          const vehicle = result.rows[0];
          conn.release();
          return vehicle;
        } catch (err) {
          throw new Error(`Cannot update Vehicle Details. ${err}.`);
        }
      }
      async delete(id: string): Promise<Vehicle> {
        try {
          const sql = 'DELETE FROM vehicles WHERE vehicle_id=($1)';
          const conn = await Client.connect();
          const vehicle = await conn.query(sql, [id]);
          conn.release();
          return vehicle.rows[0];
        } catch (err) {
          throw new Error(`Cannot Delete The Vehicle. ${err}.`);
        }
      }
      async stolen_vehicle(id: string): Promise<Vehicle> {
        try {
          const sql = 'UPDATE vehicles SET is_stolen=$1 WHERE vehicle_id=$2 RETURNING *';
          const conn = await Client.connect();
          const vehicle = await conn.query(sql, ["stolen",id]);
          conn.release();
          return vehicle.rows[0];
        } catch (err) {
          throw new Error(`Cannot Mark The Vehicle As Stolen. ${err}.`);
        }
      }
      async retrieved_vehicle(id: string): Promise<Vehicle> {
        try {
          const sql = 'UPDATE vehicles SET is_stolen=$1 WHERE vehicle_id=$2 RETURNING *';
          const conn = await Client.connect();
          const vehicle = await conn.query(sql, ["safe",id]);
          conn.release();
          return vehicle.rows[0];
        } catch (err) {
          throw new Error(`Cannot Mark The Vehicle As Safe. ${err}.`);
        }
      }
      async approve_vehicle(id: string): Promise<Vehicle> {
        try {
          const sql = 'UPDATE vehicles SET checked=$1 WHERE vehicle_id=$2 RETURNING *';
          const conn = await Client.connect();
          const vehicle = await conn.query(sql, ["approved",id]);
          conn.release();
          return vehicle.rows[0];
        } catch (err) {
          throw new Error(`Cannot Mark The Vehicle As approved. ${err}.`);
        }
      }
      async decline_vehicle(id: string): Promise<Vehicle> {
        try {
          const sql = 'UPDATE vehicles SET checked=$1 WHERE vehicle_id=$2 RETURNING *';
          const conn = await Client.connect();
          const vehicle = await conn.query(sql, ["declined",id]);
          conn.release();
          return vehicle.rows[0];
        } catch (err) {
          throw new Error(`Cannot Mark The Vehicle As declined. ${err}.`);
        }
      }
      // user stolen
      async allUserStolenVehicles(id: string): Promise<Vehicle[]> {
        try {
          const sql = 'SELECT * FROM vehicles WHERE is_stolen = $1 AND license = $2';
          const conn = await Client.connect();
          const vehicle = await conn.query(sql, ["stolen",id]);
          conn.release();
          return vehicle.rows;
        } catch (err) {
          throw new Error(`Cannot get all user stolen cars. ${err}.`);
        }
      }
      async allUserSafeVehicles(id: string): Promise<Vehicle[]> {
        try {
          const sql = 'SELECT * FROM vehicles WHERE is_stolen = $1 AND license = $2';
          const conn = await Client.connect();
          const vehicle = await conn.query(sql, ["safe",id]);
          conn.release();
          return vehicle.rows;
          // return vehicle.rows[0];
        } catch (err) {
          throw new Error(`Cannot get all user stolen cars. ${err}.`);
        }
      }
      // all stolen cars for admins
      async allStolenVehicles(): Promise<Vehicle[]> {
        try {
          const sql = 'SELECT * FROM vehicles WHERE is_stolen = $1';
          const conn = await Client.connect();
          const vehicle = await conn.query(sql, ["stolen"]);
          conn.release();
          return vehicle.rows;
        } catch (err) {
          throw new Error(`Cannot get all user stolen cars. ${err}.`);
        }
      }
    }



           