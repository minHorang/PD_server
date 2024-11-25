import { pool } from "../../config/db.js";
import { sql } from "./portfolio.sql.js";

export const PortfolioModel = {
  findByCateogory: async (category) => {
    console.log(sql.findPortfolioByCategory, category);
    console.log(category);
    try {
      const [results] = await pool.query(sql.findPortfolioByCategory, category);
      console.log(results);
      return [results];
    } catch (error) {
      throw new Error("포트폴리오 조회 실패");
    }
  },
};
