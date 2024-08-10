export const sql = {
    searchProblem: `SELECT * FROM problem WHERE problem_text LIKE ?`,
    searchProblemByFolder: `SELECT * FROM problem WHERE problem_text LIKE ? AND folder_id = ?`,
    findProblemById: `SELECT * FROM problem WHERE problem_id = ?`,
    updateProblem: `UPDATE problem SET problem_text = ? WHERE problem_id = ?`,
    addProblem: `
    INSERT INTO problem (
      folder_id, user_id, problem_text, answer, status,
      correct_count, incorrect_count, order_value,
      subscription_plan, main_category, category, sub_category, memo
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
  addPhotos: `
    INSERT INTO photo (problem_id, photo_url, photo_type)
    VALUES ?
  `,
  };
  