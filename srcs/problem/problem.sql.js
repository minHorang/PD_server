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
  // EDIT 관련

 // 문제 텍스트 및 정답 업데이트
  updateProblem: `
    UPDATE problem
    SET 
      problem_text = ?, 
      answer = ?, 
      updated_at = NOW()
    WHERE 
      problem_id = ?
  `,

  // 기존 유형 할당 삭제
  deleteProblemTypeAssignment: `
    DELETE FROM problemtypeassignment WHERE problem_id = ?
  `,

  // 새로운 유형 할당 추가
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
  INSERT INTO problemtype (type_name, parent_type_id, type_level, user_id) 
  VALUES (?, ?, ?, ?)
`,

deleteProblem: 'DELETE FROM problem WHERE problem_id = ? AND user_id = ?',


  addProblem:
    "INSERT INTO problem (folder_id, folder_name, subscription_plan, problem_text, answer, main_category, category, sub_category, problem_image, solution_image, passage_image, additional_problem_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",



    getIncorrectProblemStatistic: `SELECT * FROM problem WHERE user_id = ? ORDER BY incorrect_count DESC LIMIT 5;`,

    getIncorrectTypeStatistic:`SELECT sub_category, SUM(incorrect_count) AS total_incorrect 
    FROM problem 
    WHERE user_id = ?
    GROUP BY sub_category 
    ORDER BY total_incorrect DESC 
    LIMIT 5;`,

    getIncorrectRatioStatistic:`SELECT sub_category, (SUM(incorrect_count) * 100.0 / (SELECT SUM(incorrect_count) FROM problem )) AS incorrect_percentage 
    FROM problem 
    WHERE user_id = ?
    GROUP BY sub_category 
    ORDER BY incorrect_percentage DESC;`,
  };
  