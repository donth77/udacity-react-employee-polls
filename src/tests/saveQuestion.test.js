import { _saveQuestion } from "../utils/_DATA";

describe("_saveQuestion function", () => {
  test("returns formatted question with all fields populated", async () => {
    const question = {
      optionOneText: "First Option",
      optionTwoText: "Second Option",
      author: "sarahedo",
    };

    const savedQuestion = await _saveQuestion(question);

    expect(savedQuestion).toHaveProperty("id");
    expect(savedQuestion).toHaveProperty("timestamp");
    expect(savedQuestion.author).toBe(question.author);
    expect(savedQuestion.optionOne.text).toBe(question.optionOneText);
    expect(savedQuestion.optionTwo.text).toBe(question.optionTwoText);
  });

  test("rejects with error message when optionTwoText missing", async () => {
    const question = {
      optionOneText: "Option One",
      author: "sarahedo",
    };

    await expect(_saveQuestion(question)).rejects.toMatch(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });

  test("rejects with error message when optionOneText missing", async () => {
    const question = {
      optionTwoText: "Option Two",
      author: "sarahedo",
    };

    await expect(_saveQuestion(question)).rejects.toMatch(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });

  test("rejects with error message when author missing", async () => {
    const question = {
      optionOneText: "Option One",
      optionTwoText: "Option Two",
    };

    await expect(_saveQuestion(question)).rejects.toMatch(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});
