export const sql = {
    findChatRoom: `
      SELECT 
        room_id
      FROM 
        chatroom
      WHERE 
        problem_id = ? AND session_key = ?
    `,
  
    createChatRoom: `
      INSERT INTO chatroom 
        (problem_id, session_key) 
      VALUES 
        (?, ?)
    `,
  
    getChatLogs: `
      SELECT 
        chat_id, message, speaker, sequence, created_at 
      FROM 
        chatlog 
      WHERE 
        room_id = ? 
      ORDER BY 
        sequence
    `,
  
    addChatMessage: `
      INSERT INTO chatlog 
        (room_id, message, speaker, sequence) 
      VALUES 
        (?, ?, ?, ?)
    `,
  
    getNextSequence: `
      SELECT 
        IFNULL(MAX(sequence), 0) + 1 AS nextSeq 
      FROM 
        chatlog 
      WHERE 
        room_id = ?
    `,


    getSessionKey: `
    SELECT 
      session_key 
    FROM 
      chatroom 
    WHERE 
      room_id = ?
    `,
  };
  