export const sql = {
  searchProblem: `
    SELECT 
      *
    FROM 
      problem
    WHERE 
      problem_text LIKE ?
  `,

  searchProblemByFolder: `
    SELECT 
      *
    FROM 
      problem
    WHERE 
      problem_text LIKE ? AND folder_id = ?
  `,

  checkSubscriptionStatus: `
    SELECT 
      status,
      start_date,
      end_date
    FROM 
      subscription
    WHERE 
      user_id = ? AND status = '구독' AND NOW() BETWEEN start_date AND end_date
  `,
  findProblemById: `
    SELECT *
    FROM 
      problem
    WHERE 
      problem_id = ?
  `,

  findPhotosByProblemId: `
    SELECT 
      photo_url,
      photo_type
    FROM 
      photo
    WHERE 
      problem_id = ?
  `,

  findTypesByProblemId: `
    SELECT 
      pt.type_name,
      pt.type_level
    FROM 
      problemtype pt
    JOIN 
      problemtypeassignment pta ON pt.type_id = pta.type_id
    WHERE 
      pta.problem_id = ?
  `,

  updateProblem: `UPDATE problem SET problem_text = ? WHERE problem_id = ?`,
  addProblem: `
    INSERT INTO problem (
      folder_id, user_id, problem_text, answer, status,
      order_value, memo
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
  addPhotos: `
    INSERT INTO photo (problem_id, photo_url, photo_type)
    VALUES ?
  `,
  addProblemTypeAssignment: `
    INSERT INTO problemtypeassignment (problem_id, type_id)
    VALUES (?, ?)
  `,
  addProblemTypeAssignments: `
    INSERT INTO problemtypeassignment (problem_id, type_id)
    VALUES ?
  `,

  getMainTypes: `
    SELECT type_id, type_name FROM problemtype
    WHERE type_level = 1 AND (user_id = ? OR user_id IS NULL)
  `,

  getMidTypes: `
    SELECT type_id, type_name FROM problemtype
    WHERE parent_type_id = ? AND type_level = 2 AND (user_id = ? OR user_id IS NULL)
  `,

  getSubTypes: `
    SELECT type_id, type_name FROM problemtype
    WHERE parent_type_id = ? AND type_level = 3 AND (user_id = ? OR user_id IS NULL)
  `,

  addProblemType: `
    INSERT INTO problemtype (type_name, parent_type_id, type_level, user_id) VALUES (?, ?, ?, ?)
  `, 

  getMidTypesByMainType: `SELECT type_id FROM problemtype WHERE parent_type_id = ? AND user_id = ?;`,
  
  deleteSubTypesByMainType: `DELETE FROM problemtype WHERE parent_type_id = ? AND user_id = ?;`,
  
  deleteMidTypesByMainType: `DELETE FROM problemtype WHERE parent_type_id = ? AND user_id = ?;`,
  
  deleteMainType: `DELETE FROM problemtype WHERE type_id = ? AND user_id = ?;`,

  deleteSubTypesByMidType: `DELETE FROM problemtype WHERE parent_type_id = ? AND user_id = ?;`,
  
  deleteMidType: `DELETE FROM problemtype WHERE type_id = ? AND user_id = ?;`,
  
  deleteSubType: `DELETE FROM problemtype WHERE type_id = ? AND user_id = ?;`,

  deleteProblem: 'DELETE FROM problem WHERE problem_id = ? AND user_id = ?',
  
  deleteProblem: 'DELETE FROM problem WHERE problem_id = ? AND user_id = ?',
  
  getProblemMaxOrderValue: 'SELECT COALESCE(MAX(order_value), -1) AS maxProblemOrderValue FROM problem WHERE user_id = ? AND folder_id = ?',






    getIncorrectProblemStatistic: `SELECT * FROM problem WHERE user_id = ? ORDER BY incorrect_count DESC LIMIT 5;`,

    getIncorrectTypeStatistic:`SELECT pt.type_name AS sub_category, 
    SUM(p.incorrect_count) AS total_incorrect 
FROM problemtypeassignment pta
JOIN problemtype pt ON pta.type_id = pt.type_id
JOIN problem p ON p.problem_id = pta.problem_id
WHERE p.user_id = ? 
AND pt.type_level = 3
GROUP BY pt.type_name 
ORDER BY total_incorrect DESC 
LIMIT 5;
`,

    getIncorrectRatioStatistic:`SELECT pt.type_name AS sub_category, 
    (SUM(p.incorrect_count) * 100.0 / 
     (SELECT SUM(p2.incorrect_count)
      FROM problem p2
      WHERE p2.user_id = ?)
    ) AS incorrect_percentage 
    FROM problemtypeassignment pta
    JOIN problemtype pt ON pta.type_id = pt.type_id
    JOIN problem p ON p.problem_id = pta.problem_id
    WHERE p.user_id = ? 
    AND pt.type_level = 3
    GROUP BY pt.type_name 
    ORDER BY incorrect_percentage DESC;`,
  };
  