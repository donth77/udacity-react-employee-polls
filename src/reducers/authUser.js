import { SET_AUTH_USER } from "../actions/authUser";

export default function authUser(state = null, action) {
  switch (action.type) {
    case SET_AUTH_USER:
      if (action?.id) {
        return { id: action.id, avatarURL: action.avatarURL };
      }
      return state;
    default:
      return state;
  }
}
