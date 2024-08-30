import { pool } from "../../config/db.js";
import { sql } from "./subscription.sql.js";

export const SubscriptionModel = {
  subscribe: async (userId) => {
    try {
      const [result] = await pool.query(sql.subscribe, [userId]);
      // user 테이블의 is_subscribed 컬럼을 0, 아니면 1로 업데이트
      await pool.query(sql.updateUserSubscribe, [0, userId]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  cancelSubscribe: async (userId) => {
    try {
      const [result] = await pool.query(sql.cancelSubscribe, [userId]);
      console.log(sql.updateUserSubscribe);
      console.log(userId);
      await pool.query(sql.updateUserSubscribe, [1, userId]);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
