export const sql = {
  findUserById: `SELECT user_id, nickname,name, social_provider FROM user WHERE user_id = ?`,
};
