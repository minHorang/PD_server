export const getListResponseDTO = (portfolio) => ({
  portfolio,
});

export const postSuggestResponseDTO = (message) => ({
  message,
});

export const errorResponseDTO = (message) => ({
  errorMessage: message.message,
});
