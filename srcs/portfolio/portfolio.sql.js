export const sql = {
  findPortfolioByCategory: `SELECT portfolio_id, title, part, duration FROM Portfolio WHERE category_id=?`,
  findPortfolioById: `SELECT title,description,part,duration FROM Portfolio WHERE portfolio_id=?`,
  findPortfolioByUser: `SELECT title, project_id FROM Project WHERE user_id=?`,
  postMessageSQL: `INSERT INTO CollabSuggest (project_id, portfolio_id, message, status) VALUES(?,?,?,"모집 중")`,
  postPortfolioSQL: `INSERT INTO Portfolio (title, description, part, duration, category_id, user_id) VALUES(?,?,?,?,?,1)`,
};
