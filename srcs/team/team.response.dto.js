export const getListResponseDTO = (project) => ({
  project,
});

export const postSuggestResponseDTO = (message) => ({
  message,
});

export const errorResponseDTO = (message) => ({
  errorMessage: message.message,
});

export const mypageResponseDTO = (mypage) => ({
  mypage,
});
