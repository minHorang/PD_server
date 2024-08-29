export const sql = {
  updateProblem: `
    UPDATE problem
    SET
      problem_text = ?,
      answer = ?,
      status = ?,
      memo = ?,
      updated_at = NOW()
    WHERE
      problem_id = ?
  `,
  
  addProblem: `
    INSERT INTO problem (
      folder_id, user_id, problem_text, answer, status,
      order_value, memo
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    
  addProblemTypeAssignment: `
    INSERT INTO problemtypeassignment (problem_id, type_id)
    VALUES (?, ?)
  `,

  // 문제 유형 ID 조회
  findProblemTypeIdByNameAndLevel: `
    SELECT type_id 
    FROM problemtype 
    WHERE type_name = ? AND type_level = ?
  `,  


  // 기존 이미지 삭제
  deletePhotosByProblemId: `
    DELETE FROM photo WHERE problem_id = ?
  `,

  // 새 이미지 추가
  addPhoto: `
    INSERT INTO photo (problem_id, photo_url, photo_type, created_at, updated_at)
    VALUES (?, ?, ?, NOW(), NOW())
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

  deleteProblem: `DELETE FROM problem WHERE problem_id = ? AND user_id = ?;`,
  
  deleteProblem: `DELETE FROM problem WHERE problem_id = ? AND user_id = ?;`,
  
  getProblemMaxOrderValue: `SELECT COALESCE(MAX(order_value), -1) AS maxProblemOrderValue FROM problem WHERE user_id = ? AND folder_id = ?;`,






  };
  
