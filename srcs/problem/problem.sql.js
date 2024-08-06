export const sql = {
  searchProblem: `SELECT * FROM problem WHERE problem_text LIKE ?`,
  searchProblemByFolder: `SELECT * FROM problem WHERE problem_text LIKE ? AND folder_id = ?`,
  findProblemById: `SELECT * FROM problem WHERE problem_id = ?`,
  updateProblem: `UPDATE problem SET problem_text = ? WHERE problem_id = ?`,
};
