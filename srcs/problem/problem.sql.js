export const sql = {
    searchProblem: `SELECT * FROM problem WHERE problem_text LIKE ?`,
    searchProblemByFolder: `SELECT * FROM problem WHERE problem_text LIKE ? AND folder_id = ?`,

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
  };
  