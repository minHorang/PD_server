export const getListResponseDTO = (collab) => ({
  collab,
});

export const postSuggestResponseDTO = (message) => ({
  message,
});

export const errorResponseDTO = (message) => ({
  errorMessage: message.message,
});
