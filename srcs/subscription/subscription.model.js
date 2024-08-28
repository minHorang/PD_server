import { pool } from "../../config/db.js";
import { sql } from "./subscription.sql.js";

export const SubscriptionModel = {
  subscribe: async (userId) => {
    try {
      const [result] = await pool.query(sql.subscribe, [userId]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  cancelSubscribe: async (userId) => {
    try {
      const [result] = await pool.query(sql.cancelSubscribe, [userId]);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
