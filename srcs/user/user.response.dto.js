export const getInfoResponseDTO = (userInfo) => ({
  result: {
    id: userInfo.id,
    nickname: userInfo.nickname,
    name: userInfo.name,
    provider: userInfo.social_provider,
  },
});

export const errorResponseDTO = (message) => ({
  message,
});
