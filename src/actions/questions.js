import { saveQuestionAnswer, saveFormattedQuestion } from "../utils/api";
import { formatQuestion } from "../utils/_DATA";
import toast from "react-hot-toast";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_QUESTION_ANSWER = "ADD_QUESTION_ANSWER";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function addQuestion(question, authorId) {
  return {
    type: ADD_QUESTION,
    question,
    authorId,
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    const newQuestion = formatQuestion({
      optionOneText,
      optionTwoText,
      author: authUser.id,
    });

    dispatch(addQuestion(newQuestion, authUser.id));

    try {
      await saveFormattedQuestion(newQuestion);
      toast.success("Added");
    } catch (err) {
      toast.error("Failed to add. Try again");
      console.error(err);
    }
  };
}

export function addQuestionAnswer(questionId, answer, userId) {
  return {
    type: ADD_QUESTION_ANSWER,
    questionId,
    answer,
    userId,
  };
}

export function handleAddQuestionAnswer(questionId, answer) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(addQuestionAnswer(questionId, answer, authUser.id));

    try {
      await saveQuestionAnswer({
        authedUser: authUser.id,
        qid: questionId,
        answer,
      });
      toast.success("Submitted vote");
    } catch (err) {
      toast.error("Failed to submit vote. Try again");
      console.error(err);
    }
  };
}
