import { pool } from "../../config/db.js"; 
import { sql } from "./statistic.sql.js"; 

export const StatisticModel = {


    getIncorrectProblemStatistic: async (userId) => {
        try{
          const [result] = await pool.query(sql.getIncorrectProblemStatistic, [userId]);
          return result;
        } catch (error) {
          throw error;
        }
      },
    
      getMostIncorrectCategoryId: async (userId) => {
        try {
            const [result] = await pool.query(sql.getMostIncorrectCategoryId, [userId]);
            return result;
        } catch (error) {
            throw error;
        }
    },
    getIncorrectRatioByCategoryId: async (categoryId, userId) => {
      try {
          const [result] = await pool.query(sql.getIncorrectRatioByCategoryId, [categoryId, userId, categoryId, userId]);
          return result;
      } catch (error) {
          throw error;
      }
    },
    getSubCategoriesByCategoryId: async (categoryId, userId) => {
        try {
            const [result] = await pool.query(sql.getSubCategoriesByCategoryId, [categoryId, userId]);
            return result;
        } catch (error) {
            throw error;
        }
      },
}