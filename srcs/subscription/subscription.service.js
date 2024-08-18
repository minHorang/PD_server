import { SubscriptionModel } from "./subscription.model.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";

export const SubscriptionService = {


    subscribe: async (userId) => {
        try{
          
          return await SubscriptionModel.subscribe(userId);
    
        } catch (error) {
          throw new BaseError(status.INTERNAL_SERVER_ERROR,"구독하기 실패");
        }
    
      },

    cancelSubscribe: async (userId) => {
        try{
          
          return await SubscriptionModel.cancelSubscribe(userId);
    
        } catch (error) {
          throw new BaseError(status.INTERNAL_SERVER_ERROR,"구독하기 실패");
        }
    
      },

}