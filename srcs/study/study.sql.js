export const sql = {
  // 폴더 ID와 user_id로 폴더 정보 조회
  // TODO : folder 도메인으로 이동
  findFolderById: `
    SELECT 
      folder_id,
      user_id,
      folder_name,
      order_value,
      created_at,
      updated_at
    FROM 
      folder
    WHERE 
      folder_id = ?
  `,

  // 폴더 ID로 문제 ID 조회
  // TODO : folder 도메인으로 이동
  findProblemIdsByFolderId: `
    SELECT 
      problem_id
    FROM 
      problem
    WHERE 
      folder_id = ?
    ORDER BY 
      order_value
  `,

  // 폴더 ID로 문제 진척도 조회
  findProgressByFolderId: `
    SELECT 
      problem_id,
      progress AS status
    FROM 
      problem
    WHERE 
      folder_id = ?
    ORDER BY 
      order_value
  `,

  // 문제 ID로 문제 정답 조회
  findAnswerByProblemId: `
    SELECT 
      answer
    FROM 
      problem
    WHERE 
      problem_id = ?
  `,

  // 문제의 정답 맞춘 횟수 업데이트
  updateCorrectCount: `
    UPDATE 
      problem
    SET 
      correct_count = correct_count + 1,
      progress = '맞은 문제'
    WHERE 
      problem_id = ?
  `,

  // 문제의 정답 틀린 횟수 업데이트
  updateIncorrectCount: `
    UPDATE 
      problem
    SET 
      incorrect_count = incorrect_count + 1,
      progress = '틀린 문제'
    WHERE 
      problem_id = ?
  `
};
