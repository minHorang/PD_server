// 채팅방 조회 또는 생성 시 result 생성 함수
export const setChatRoomResponseDTO = (roomId, logs) => {
    return {
      roomId: roomId,
      logs: logs.map(log => ({
        chatId: log.chat_id,
        message: log.message,
        speaker: log.speaker,
        sequence: log.sequence,
        created_at: log.created_at
      }))
    };
  };
  
  // 채팅 메시지 추가 시 result 생성 함수
  export const setChatMessageResponseDTO = (chatId) => {
    return {
      chatId: chatId
    };
  };

  export const errorResponseDTO = (message) => {
    return {
      message: message
    };
  };
  