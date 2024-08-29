import { SubscriptionModel } from "./subscription.model.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.SECRET_KEY;
const clientKey = process.env.CLIENT_KEY;

export const SubscriptionService = {
  subscribe: async (userId) => {
    try {
      // // 결제 승인 API 호출
      // const { paymentKey, orderId, amount } = paymentInfo;
      // const encryptedSecretKey =
      //   'Basic ' + Buffer.from(secretKey + ':').toString('base64');

      // const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      //   method: 'POST',
      //   body: JSON.stringify({ orderId, amount, paymentKey }),
      //   headers: {
      //     Authorization: encryptedSecretKey,
      //     'Content-Type': 'application/json',
      //   },
      // });

      // const data = await response.json();

      // if (data.status === 'DONE') {
      //   return await SubscriptionModel.subscribe(userId);
      // } else {
      //   throw new BaseError(status.PAYMENT_FAILED, "결제 실패");
      // }
      return await SubscriptionModel.subscribe(userId);

    } catch (error) {
      throw new BaseError(status.INTERNAL_SERVER_ERROR, "구독하기 실패");
    }
  },

  cancelSubscribe: async (userId) => {
    try {
      // 구독 취소 시 추가적으로 결제 취소 처리 가능
      return await SubscriptionModel.cancelSubscribe(userId);
    } catch (error) {
      throw new BaseError(status.INTERNAL_SERVER_ERROR, "구독 취소 실패");
    }
  },
};
