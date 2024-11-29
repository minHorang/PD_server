import { pool } from "../../config/db.js";
import { sql } from "./portfolio.sql.js";

export const PortfolioModel = {
  findByCateogory: async (category) => {
    console.log(sql.findPortfolioByCategory, category);
    console.log(category);
    try {
      const [results] = await pool.query(sql.findPortfolioByCategory, category);
      return results;
    } catch (error) {
      throw new Error("포트폴리오 조회 실패");
    }
  },
  findById: async (id) => {
    console.log(sql.findPortfolioById, id);
    console.log(id);
    try {
      const [results] = await pool.query(sql.findPortfolioById, id);
      return results;
    } catch (error) {
      throw new Error("포트폴리오 조회 실패");
    }
  },
  findByUser: async (id) => {
    console.log(sql.findPortfolioByUser, id);
    console.log(id);
    try {
      const [results] = await pool.query(sql.findPortfolioByUser, id);
      return results;
    } catch (error) {
      throw new Error("포트폴리오 조회 실패");
    }
  },
  postSuggest: async (body) => {
    console.log(sql.postMessageSQL);
    console.log(body.project_id);
    console.log(body.portfolio_id);
    console.log(body.suggest_message);
    try {
      await pool.query(sql.postMessageSQL, [
        body.project_id,
        body.portfolio_id,
        body.suggest_message,
      ]);
    } catch (error) {
      throw new Error("팀 제안 실패 sql");
    }
  },
  postPortfolio: async (body) => {
    console.log(body);
    try {
      await pool.query(sql.postPortfolioSQL, [
        body.title,
        body.description,
        body.part,
        body.duration,
        body.category,
      ]);
    } catch (error) {
      throw new Error("팀 제안 실패 sql");
    }
  },
};
