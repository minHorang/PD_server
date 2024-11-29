import { pool } from "../../config/db.js";
import { sql } from "./collab.sql.js";

export const CollabModel = {
  findCollabByCategory: async (category) => {
    console.log(sql.findCollabByCategory, category);
    console.log(category);
    try {
      const [results] = await pool.query(sql.findCollabByCategory, category);
      return [results];
    } catch (error) {
      throw new Error("팀 조회 실패");
    }
  },

  findCollabById: async (id) => {
    console.log(sql.findCollabById, id);
    console.log(id);
    try {
      const [results] = await pool.query(sql.findCollabById, id);
      return [results];
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
    console.log(body);
    try {
      var category = "";
      if (Object.keys(body.category).length == 1) {
        category = `${body.category.first}`;
      } else if (Object.keys(body.category).length == 2) {
        category = `${body.category.first},${body.category.second}`;
      } else if (Object.keys(body.category).length == 3) {
        category = `${body.category.first},${body.category.second},${body.category.third}`;
      } else if (Object.keys(body.category).length == 4) {
        category = `${body.category.first},${body.category.second},${body.category.third},${body.category.fourth}`;
      }
      console.log(category);
      await pool.query(sql.postProjectCate1SQL, [
        category,
        body.title,
        body.description,
        body.user_id,
        body.duration,
        body.part,
        body.wanted,
        body.process,
      ]);
    } catch (error) {
      throw new Error("팀 제안 실패 sql");
    }
  },
};
