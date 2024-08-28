import express from "express";
import authenticateToken from "../../config/jwt.middleware.js";
import {subscribe, cancelSubscribe } from "../subscription/subscription.controller.js"
import dotenv from 'dotenv';

dotenv.config();
const clientKey = process.env.CLIENT_KEY;

export const subscriptionRouter = express.Router();
subscriptionRouter.use(authenticateToken);

subscriptionRouter.patch("/approve", subscribe);
subscriptionRouter.patch("/cancel", cancelSubscribe);

subscriptionRouter.get('/get-client-key', (req, res) => {
    try {
      if (!clientKey) {
        return res.status(500).json({ success: false, message: 'ClientKey가 설정되지 않았습니다.' });
      }
      res.status(200).json({ success: true, clientKey });
    } catch (error) {
      res.status(500).json({ success: false, message: '서버 오류', error });
    }
  });
