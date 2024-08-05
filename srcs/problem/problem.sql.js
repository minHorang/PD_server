export const sql = {
    searchProblem: `SELECT * FROM problem WHERE problem_text LIKE ?`,
    searchProblemByFolder: `SELECT * FROM problem WHERE problem_text LIKE ? AND folder_id = ?`,
    findProblemById: `SELECT * FROM problem WHERE problem_id = ?`,
    updateProblem: `UPDATE problem SET problem_text = ? WHERE problem_id = ?`,
    addProblem: 'INSERT INTO problem (folder_id, folder_name, subscription_plan, problem_text, answer, main_category, category, sub_category, problem_image, solution_image, passage_image, additional_problem_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
  };
  