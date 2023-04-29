export const SET_AUTH_USER = "SET_AUTH_USER";

export function setAuthUser(user) {
  return {
    type: SET_AUTH_USER,
    id: user?.id || null,
    avatarURL: user?.avatarURL || null,
  };
}
