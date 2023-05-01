import { _saveQuestionAnswer } from "../utils/_DATA";
import { users, questions } from "../utils/_DATA";

describe("_saveQuestionAnswer function", () => {
  test("returns true and updates usera and questiona objects correctly", async () => {
    const authedUser = "sarahedo";
    const qid = "8xf0y6ziyjabvozdd253nd";
    const answer = "optionOne";

    await _saveQuestionAnswer({ authedUser, qid, answer });

    expect(users[authedUser].answers[qid]).toBe(answer);
    expect(questions[qid][answer].votes).toContain(authedUser);
  });

  test("rejects with error message when answer missing", async () => {
    const authedUser = "sarahedo";
    const qid = "8xf0y6ziyjabvozdd253nd";

    await expect(_saveQuestionAnswer({ authedUser, qid })).rejects.toMatch(
      "Please provide authedUser, qid, and answer"
    );
  });

  test("rejects with error message when authedUser missing", async () => {
    const qid = "8xf0y6ziyjabvozdd253nd";
    const answer = "optionOne";

    await expect(_saveQuestionAnswer({ qid, answer })).rejects.toMatch(
      "Please provide authedUser, qid, and answer"
    );
  });

  test("rejects with error message when qid missing", async () => {
    const authedUser = "sarahedo";
    const answer = "optionOne";

    await expect(_saveQuestionAnswer({ authedUser, answer })).rejects.toMatch(
      "Please provide authedUser, qid, and answer"
    );
  });
});
