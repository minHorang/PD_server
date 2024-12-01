import { pool } from "../../config/db.js";
import { sql } from "./team.sql.js";

export const TeamModel = {
  findTeamByCategory: async (category) => {
    console.log(sql.findTeamByCategory, category);
    console.log(category);
    try {
      const [results] = await pool.query(sql.findTeamByCategory, [
        category,
        category,
      ]);
      return results;
    } catch (error) {
      throw new Error("팀 조회 실패");
    }
  },

  findTeamById: async (id) => {
    console.log(sql.findTeamById, id);
    console.log(id);
    try {
      const [results] = await pool.query(sql.findTeamById, id);
      return results;
    } catch (error) {
      throw new Error("팀 조회 실패");
    }
  },
  postSuggest: async (body) => {
    console.log(sql.postMessageSQL);
    console.log(body.project_id);
    console.log(body.user_id);
    console.log(body.message);
    try {
      await pool.query(sql.postMessageSQL, [
        body.project_id,
        body.user_id,
        body.message,
      ]);
    } catch (error) {
      throw new Error("팀 제안 실패 sql");
    }
  },
  postProject: async (body) => {
    console.log(
      body.title,
      body.description,
      body.user_id,
      body.duration,
      body.part,
      body.wanted,
      body.category
    );
    try {
      await pool.query(sql.postProjectSQL, [
        body.title,
        body.description,
        body.user_id,
        body.duration,
        body.part,
        body.wanted,
        body.process,
        body.category,
      ]);
    } catch (error) {
      throw new Error("팀 생성 실패 sql");
    }
  },
  getMypageInfo: async (id) => {
    console.log(sql.findMypageInfoSQL, id);
    console.log(id);
    try {
      const [results] = await pool.query(sql.findMypageInfoSQL, id);
      return [results];
    } catch (error) {
      throw new Error("마이페이지 조회 실패");
    }
  },
};
