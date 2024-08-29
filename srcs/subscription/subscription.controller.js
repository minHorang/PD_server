import { status } from "../../config/response.status.js";
import { SubscriptionService } from "./subscription.service.js";
import { response } from "../../config/response.js";

export const subscribe = async (req, res) => {
  try {
    const userId = req.userId;
    // const paymentInfo = req.body;  // paymentKey, orderId, amount
    const result = await SubscriptionService.subscribe(userId);

    res.send(response(status.SUBSCRIPTION_SUCCESS, null));
  } catch (error) {
    res.send(response(status.INTERNAL_SERVER_ERROR));
  }
};

export const cancelSubscribe = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await SubscriptionService.cancelSubscribe(userId);

    res.send(response(status.SUBSCRIPTION_CANCEL_SUCCESS, null));
  } catch (error) {
    res.send(response(status.INTERNAL_SERVER_ERROR));
  }
};
