import { getInitialData } from "../utils/api";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { setAuthUser } from "./authUser";

const AUTH_USER = JSON.parse(window.localStorage.getItem("user"));

export function handleInitialData() {
  return async (dispatch) => {
    const { users, questions } = await getInitialData();
    dispatch(setAuthUser(AUTH_USER));
    dispatch(receiveUsers(users));
    dispatch(receiveQuestions(questions));
  };
}
