export const getInfoResponseDTO = (userInfo) => ({
  id: userInfo.id,
  nickname: userInfo.nickname,
  name: userInfo.name,
  provider: userInfo.social_provider,
});

export const errorResponseDTO = (message) => ({
  errorMessage: message.message,
});

export const patchNicknameResponseDTO = (message) => ({
  message,
});

export const patchUserStatusrResponseDTO = (message) => ({
  message,
});

export const singupUserDTO = (message) => ({
  message,
});

export const loginUserDTO = (token) => ({
  accesstoken: token.accessToken,
  refreshtoken: token.refreshToken,
});
