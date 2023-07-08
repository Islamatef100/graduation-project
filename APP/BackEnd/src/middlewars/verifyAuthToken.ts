import jwt from 'jsonwebtoken';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const gtoken = process.env.TOKEN_SECRET;

export const verifyAuthToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    const decoded = jwt.verify(token, gtoken as string);
    // req.user=decoded;
    // console.log(decoded);
    next();
  } catch (error) {
    res.status(500).json('Authorization error');
  }
};
