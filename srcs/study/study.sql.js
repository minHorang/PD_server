export const sql = {
    findFolderByIdAndUserId: `
        SELECT 
            *
        FROM 
            problem
        WHERE 
            folder_id = ? AND user_id = ?
    `,


    findProblemByFolderIdAndIndex: `
        SELECT 
            *
        FROM 
            problem
        WHERE 
            folder_id = ?
        ORDER BY 
            order_value
        LIMIT 1 OFFSET ?
    `,

    findFolderNameById: `
        SELECT 
            folder_name
        FROM 
            folder
        WHERE 
            folder_id = ?
    `,

    findProblemImageById: `
        SELECT 
            photo_url AS problem_image_url
        FROM 
            photo
        WHERE 
            problem_id = ? AND photo_type = 'problem'
    `,

    findAnswerByProblemId: `
    SELECT 
      answer_text
    FROM 
      problem
    WHERE 
      problem_id = ?
  `,

  updateCorrectCount: `
    UPDATE 
      problem
    SET 
      correct_count = correct_count + 1
    WHERE 
      problem_id = ?
  `,

  updateIncorrectCount: `
    UPDATE 
      problem
    SET 
      incorrect_count = incorrect_count + 1
    WHERE 
      problem_id = ?
  `,



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

  findFolderByIdAndUserId: `
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
      folder_id = ? AND user_id = ?
  `

  };
  