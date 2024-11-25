export const sql = {
  findPortfolioByCategory: `SELECT title, part, duration FROM Portfolio WHERE category_id=?`,
};
