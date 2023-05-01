import {
  RECEIVE_QUESTIONS,
  ADD_QUESTION,
  ADD_QUESTION_ANSWER,
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };
    case ADD_QUESTION_ANSWER:
      const answerObj = state[action.questionId][action.answer];
      return {
        ...state,
        [action.questionId]: {
          ...state[action.questionId],
          ...{
            [action.answer]: {
              text: answerObj.text,
              votes: answerObj.votes.concat([action.userId]),
            },
          },
        },
      };
    default:
      return state;
  }
}
