import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

export type User = {
  user_ssn:number;
    user_name: string;
    manufacturer_number:string;
    user_email: string;
    user_password: string;
    user_address: string;
    user_job: string;
    user_nationality: string;
    user_phone: string;
    user_bd: string;
    user_governorate: string;
    is_admin: string;
};

const salt_rounds = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;

export class usersStore {
    async register(u: User): Promise<User> {
        try {
          const conn = await Client.connect();
          const sql =
            'INSERT INTO users (user_name, user_ssn, manufacturer_number, user_email, user_password ,user_address ,user_job ,user_nationality ,user_phone ,user_bd ,user_governorate, is_admin) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *';
          const hash = bcrypt.hashSync(
            u.user_password + pepper,
            parseInt(salt_rounds as string)
          );
          console.log(u.user_password);
          const user = await conn.query(sql, [
            u.user_name,
            u.user_ssn,
            u.manufacturer_number,
            u.user_email,
            hash,
            u.user_address,
            u.user_job,
            u.user_nationality,
            u.user_phone,
            u.user_bd,
            u.user_governorate,
            u.is_admin,
          ]);
          conn.release();
          return user.rows[0];
        } catch (err) {
          throw new Error(`Cannot Create User. ${err}.`);
        }
      }
      async login(user_email: string, password: string): Promise<User | null> {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM users WHERE user_email=($1)';
        const result = await conn.query(sql, [user_email]);
        if (result.rows.length) {
          const user = result.rows[0];
          if (bcrypt.compareSync(password + pepper, user.user_password)) {
            console.log('Login Accepted.');
            return user;
          }
          console.log('Login not accepted.');
        }
        return null;
      }
      async checkPassword(user_ssn: string, password: string): Promise<boolean> {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM users WHERE user_ssn=($1)';
        const result = await conn.query(sql, [user_ssn]);
        if (result.rows.length) {
          const user = result.rows[0];
          if (bcrypt.compareSync(password + pepper, user.user_password)) {
            return true;
          }
        }
        return false;
      }
      async index(): Promise<User[]> {
        try {
          const conn = await Client.connect();
          const sql = 'SELECT * FROM USERS';
          const users = await conn.query(sql);
          conn.release();
          return users.rows;
        } catch (err) {
          throw new Error(`Cannot Display The Users. ${err}.`);
        }
      }
      async show(id: string): Promise<User> {
        try {
          const conn = await Client.connect();
          const sql = 'SELECT * FROM users WHERE user_ssn = $1';
          const user = await conn.query(sql, [id]);
          conn.release();
          return user.rows[0];
        } catch (err) {
          throw new Error(`Cannot Display The Specific User. ${err}.`);
        }
      }
      async update(u: User, id: string): Promise<User> {
        try {
          const sql =
            'UPDATE users SET user_name=$1, manufacturer_number=$3, user_email=$4, user_password=$5, user_address=$6, user_job=$7, user_nationality=$8, user_phone=$9, user_bd=$10, user_governorate=$11 WHERE user_ssn=$2 RETURNING *';
          const conn = await Client.connect();
          const hash = bcrypt.hashSync(
            u.user_password + pepper,
            parseInt(salt_rounds as string)
          );
          const result = await conn.query(sql, [
            u.user_name,
            u.user_ssn,
            u.manufacturer_number,
            u.user_email,
            hash,
            u.user_address,
            u.user_job,
            u.user_nationality,
            u.user_phone,
            u.user_bd,
            u.user_governorate,
            ]);
          const user = result.rows[0];
          conn.release();
          return user;
        } catch (err) {
          throw new Error(`Cannot update User Details. ${err}.`);
        }
      }
      async updatePassword(user_ssn: string, password: string): Promise<User> {
        try {
          const sql =
            'UPDATE users SET user_password=$2 WHERE user_ssn=$1 RETURNING *';
          const conn = await Client.connect();
          const hash = bcrypt.hashSync(
            password + pepper,
            parseInt(salt_rounds as string)
          );
          const result = await conn.query(sql, [
            user_ssn,
            hash,
            ]);
          const user = result.rows[0];
          conn.release();
          return user;
        } catch (err) {
          throw new Error(`Cannot update User Password. ${err}.`);
        }
      }
      async delete(id: string): Promise<User> {
        try {
          const sql = 'DELETE FROM users WHERE user_ssn=($1)';
          const conn = await Client.connect();
          const user = await conn.query(sql, [id]);
          conn.release();
          return user.rows[0];
        } catch (err) {
          throw new Error(`Cannot Delete The User. ${err}.`);
        }
      }
    }
