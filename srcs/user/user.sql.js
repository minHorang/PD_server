export const sql = {
  findUserById: `SELECT user_id, nickname, social_provider FROM user WHERE user_id = ?`,
  updateNicknameSQL: `UPDATE user SET nickname = ? WHERE user_id = ?`,
  updateStatusSQL: `UPDATE user SET status = ? WHERE user_id = ?`,
};
