export const getListResponseDTO = (portfoliio) => ({
  portfoliio,
});

export const postSuggestResponseDTO = (message) => ({
  message,
});

export const errorResponseDTO = (message) => ({
  errorMessage: message.message,
});
