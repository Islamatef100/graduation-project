import { QueryResult } from 'pg';
import Client from '../database';
import { User, usersStore } from '../models/users';
import { Vehicle, vehicleStore } from '../models/vehicles';
const operations = new vehicleStore();



export type Transaction = {
  transaction_id?: number;
  vehicle_id: string;
  vehicle_image: string;
  place: string;
  adjustment_date: string;
  adjustment_time: string;
  fine: number;
  payment_date: string;
  payment_status: string;
  is_reported: string;
};

export class transactionStore {
  async create(u: Transaction): Promise<Transaction> {
    try {
      // const now =new Date().toLocaleString().split(",");
      const conn = await Client.connect();
      const sql =
        'INSERT INTO transactions ( vehicle, vehicle_image, place, adjustment_date ,adjustment_time ,fine ,payment_date ,payment_status ,is_reported ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
      const vehicle = await conn.query(sql, [
        u.vehicle_id,
        u.vehicle_image,
        u.place,
        u.adjustment_date,
        u.adjustment_time,
        u.fine,
        u.payment_date,
        u.payment_status,
        u.is_reported
      ]);
      conn.release();
      return vehicle.rows[0];
    } catch (err) {
      throw new Error(`Cannot Create the transaction. ${err}.`);
    }
  }
  async index(): Promise<Transaction[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM transactions';
      const transactions = await conn.query(sql);
      conn.release();
      return transactions.rows;
    } catch (err) {
      throw new Error(`Cannot Display The transactions. ${err}.`);
    }
  }
  async show(id: string): Promise<Transaction> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM transactions WHERE transaction_id = $1';
      const vehicle = await conn.query(sql, [id]);
      conn.release();
      return vehicle.rows[0];
    } catch (err) {
      throw new Error(`Cannot Display The Specific transaction. ${err}.`);
    }
  }
  async showVehicleTransactions(id: string): Promise<Transaction[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM transactions WHERE vehicle = $1';
      const vehicle = await conn.query(sql, [id]);
      conn.release();
      const vehicles = vehicle.rows;
      return vehicles;
    } catch (err) {
      throw new Error(`Cannot Display The Specific Vehicle transactions. ${err}.`);
    }
  }

  // async getVehiclesTransactions(users:Vehicle[]) : Promise<Transaction[]>{
  //   try{
  //           let vehicler: Transaction[]=[];
  //           users.forEach( async user => {
  //           const conn = await Client.connect();
  //           const sql = 'SELECT * FROM transactions WHERE vehicle = $1';
  //           let vehicless = await conn.query(sql, [user.vehicle_id]);
  //           conn.release();
  //           // console.log(`${user.vehicle_id} +  ${vehicless} ++ ${JSON.stringify(vehicler)}`);
  //           if(vehicless.rowCount !=0){
  //             const rr:Transaction = vehicless.rows[0] as unknown as Transaction ;
  //             vehicler.push(rr);  
  //           }
  //           console.log(`  in looop """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""${JSON.stringify(vehicler)}"""""""""""""""""""""""""""""""\n`);
  //           });
  //           console.log(`out looop """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""${JSON.stringify(vehicler)}"""""""""""""""""""""""""""""""\n`);
  //           // console.log(vehicler);
  //           // const conn = await Client.connect();
  //           // const sql = 'SELECT * FROM transactions WHERE vehicle = $1';
  //           // const vehicle = await conn.query(sql, [id]);
  //           // conn.release();
  //           // const vehicles= vehicle.rows;
  //           // return vehicles;
  //           return vehicler;
  //   }catch(err){
  //     throw new Error(`Cannot Display The Specific Vehicle transactions. ${err}.`);
  //   }
  // }
  
  //######################################################################################
  //######################################################################################
  async showUserTransactions(id: string): Promise<Transaction[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT transaction_id,vehicle,transactions.vehicle_image,fine,payment_date,payment_status,place,adjustment_date,adjustment_time,is_reported FROM transactions INNER JOIN vehicles ON transactions.vehicle = vehicles.vehicle_id INNER JOIN users ON vehicles.license = users.user_ssn WHERE users.user_ssn = $1';
      const vehicle = await conn.query(sql, [id]);
      conn.release();
      const vehicles = vehicle.rows;
      return vehicles;
    } catch (err) {
      throw new Error(`Cannot Display The Specific Vehicle transactions. ${err}.`);
    }
  }
  //######################################################################################
  //######################################################################################
  async showUserTransactionsNotPaid(id: string): Promise<Transaction[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT transaction_id,vehicle,transactions.vehicle_image,fine,payment_date,payment_status,place,adjustment_date,adjustment_time,is_reported FROM transactions INNER JOIN vehicles ON transactions.vehicle = vehicles.vehicle_id INNER JOIN users ON vehicles.license = users.user_ssn WHERE users.user_ssn = $1 AND transactions.payment_status='notpaid'";
      const vehicle = await conn.query(sql, [id]);
      conn.release();
      const vehicles = vehicle.rows;
      return vehicles;
    } catch (err) {
      throw new Error(`Cannot Display The Specific Vehicle transactions. ${err}.`);
    }
  }
  //######################################################################################
  //######################################################################################
  async showUserTransactionsPaid(id: string): Promise<Transaction[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT transaction_id,vehicle,transactions.vehicle_image,fine,payment_date,payment_status,place,adjustment_date,adjustment_time,is_reported FROM transactions INNER JOIN vehicles ON transactions.vehicle = vehicles.vehicle_id INNER JOIN users ON vehicles.license = users.user_ssn WHERE users.user_ssn = $1 AND transactions.payment_status='paid'";
      const vehicle = await conn.query(sql, [id]);
      conn.release();
      const vehicles = vehicle.rows;
      return vehicles;
    } catch (err) {
      throw new Error(`Cannot Display The Specific Vehicle transactions. ${err}.`);
    }
  }
  //######################################################################################
  //######################################################################################
  // async showUserTransactions(id: string): Promise<Transaction[]> {
  //   try {
  //     const users = await operations.showUserVehicles(id as unknown as number);
  //     let vehicler: Transaction[] = [];
  //     await Promise.all(users.map(async (user) => {
  //       const conn = await Client.connect();
  //       const sql = 'SELECT * FROM transactions WHERE vehicle = $1';
  //       let vehicless = await conn.query(sql, [user.vehicle_id]);
  //       conn.release();
  //       if (vehicless.rowCount != 0) {
  //         const rr: Transaction = vehicless.rows as unknown as Transaction;
  //         vehicler.push(rr);
  //       }
  //     }));
  //     return vehicler;
  //   } catch (err) {
  //     throw new Error(`Cannot Display The Specific Vehicle transactions. ${err}.`);
  //   }
  // }

  //######################################################################################
  //######################################################################################
  async update(u: Transaction, id: string): Promise<Transaction> {
    try {
      const sql =
        'UPDATE transactions SET vehicle=$1, vehicle_image=$2, place=$3, adjustment_date=$4, adjustment_time=$5, fine=$6, payment_date=$7, payment_status=$8, is_reported=$10 WHERE transaction_id=$9 RETURNING *';
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        u.vehicle_id,
        u.vehicle_image,
        u.place,
        u.adjustment_date,
        u.adjustment_time,
        u.fine,
        u.payment_date,
        u.payment_status,
        id,
        u.is_reported
      ]);
      const vehicle = result.rows[0];
      conn.release();
      return vehicle;
    } catch (err) {
      throw new Error(`Cannot update Transaction Details. ${err}.`);
    }
  }
  async delete(id: number): Promise<Transaction> {
    try {
      const sql = 'DELETE FROM transactions WHERE transaction_id=($1)';
      const conn = await Client.connect();
      const vehicle = await conn.query(sql, [id]);
      conn.release();
      return vehicle.rows[0];
    } catch (err) {
      throw new Error(`Cannot Delete The Transaction. ${err}.`);
    }
  }
  async paidId(id: string): Promise<Transaction> {
    try {
      const now = new Date().toLocaleString().split(",");
      // adjustment_time: now[1],
      // adjustment_date: now[0],

      const conn = await Client.connect();
      const sql = 'UPDATE transactions SET payment_status=$2, payment_date=$3 WHERE transaction_id=$1 RETURNING *';
      const vehicle = await conn.query(sql, [id, "paid", now[0] as string]);
      conn.release();
      return vehicle.rows[0];
    } catch (err) {
      console.log(`Cannot Display The Specific transaction. ${err}.`);
      throw new Error(`Cannot Display The Specific transaction. ${err}.`);

    }
  }
  async reportWaiting(id: string): Promise<Transaction> {
    try {
      const conn = await Client.connect();
      const sql = 'UPDATE transactions SET is_reported=$2 WHERE transaction_id=$1 RETURNING *';
      const vehicle = await conn.query(sql, [id, "waiting"]);
      conn.release();
      return vehicle.rows[0];
    } catch (err) {
      throw new Error(`Cannot make the transaction reported. ${err}.`);
    }
  }
  async reportApproved(id: string): Promise<Transaction> {
    try {
      const conn = await Client.connect();
      const sql = 'UPDATE transactions SET is_reported=$2 WHERE transaction_id=$1 RETURNING *';
      const vehicle = await conn.query(sql, [id, "approved"]);
      conn.release();
      return vehicle.rows[0];
    } catch (err) {
      throw new Error(`Cannot make the transaction reported Approved. ${err}.`);
    }
  }
  async reportDeclined(id: string): Promise<Transaction> {
    try {
      const conn = await Client.connect();
      const sql = 'UPDATE transactions SET is_reported=$2 WHERE transaction_id=$1 RETURNING *';
      const vehicle = await conn.query(sql, [id, "declined"]);
      conn.release();
      return vehicle.rows[0];
    } catch (err) {
      throw new Error(`Cannot make the transaction reported Declined. ${err}.`);
    }
  }
}