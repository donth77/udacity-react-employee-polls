import { ADD_QUESTION, ADD_QUESTION_ANSWER } from "../actions/questions";
import { RECEIVE_USERS } from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ADD_QUESTION:
      return {
        ...state,
        ...{
          [action.authorId]: {
            ...state[action.authorId],
            questions: state[action.authorId].questions.concat(
              action.question.id
            ),
          },
        },
      };

    case ADD_QUESTION_ANSWER:
      const answersObj = state[action.userId].answers;
      return {
        ...state,
        ...{
          ...state[action.userId],
          answers: {
            ...answersObj,
            [action.questionId]: action.answer,
          },
        },
      };
    default:
      return state;
  }
}
