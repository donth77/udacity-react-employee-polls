import { useState } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { PropTypes } from "prop-types";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import classNames from "classnames";
import "./Dashboard.css";
import "./QuestionPage.css";
import NotFoundPage from "./NotFoundPage";
import NavigationBar from "./NavigationBar";
import FadeInOnLoad from "./FadeInOnLoad";
import { formatDate } from "../utils/helpers";
import { handleAddQuestionAnswer } from "../actions/questions";
import { withRouter } from "../utils/helpers";

QuestionPage.propTypes = {
  dispatch: PropTypes.func,
  qid: PropTypes.string,
  authUser: PropTypes.object,
  questions: PropTypes.object,
  users: PropTypes.object,
};

function QuestionPage({ dispatch, qid, authUser, questions, users }) {
  const [btnDisabled, setBtnDisabled] = useState(true);

  if (!isEmpty(questions) && !questions[qid]) {
    return <NotFoundPage />;
  }
  const question = questions[qid];
  const author = users[question?.author];

  const answered = Object.values(questions)
    .filter(
      (q) =>
        q.optionOne?.votes.includes(authUser?.id) ||
        q.optionTwo?.votes.includes(authUser?.id)
    )
    .map((q) => q.id);
  const isAnswered = answered.includes(qid);

  const totalVotes =
    question?.optionOne?.votes.length + question?.optionTwo?.votes.length;
  const q1Votes = question?.optionOne?.votes.length;
  const q1Perc = (q1Votes / totalVotes) * 100;
  const q2Votes = question?.optionTwo?.votes.length;
  const q2Perc = (q2Votes / totalVotes) * 100;
  const votedOpt1 = question?.optionOne?.votes.includes(authUser?.id);
  const votedOpt2 = question?.optionTwo?.votes.includes(authUser?.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    const target = e.target;
    if (target.length > 1) {
      const answer = target[0].checked ? "optionOne" : "optionTwo";

      dispatch(handleAddQuestionAnswer(qid, answer));
    }
  };

  const handleChangeOption = () => {
    if (btnDisabled) {
      setBtnDisabled(false);
    }
  };

  return (
    <>
      <NavigationBar />
      <FadeInOnLoad loading={isEmpty(questions) || isEmpty(users)}>
        <Card className="question-page-card">
          <Card.Header className="question-card-header">
            <b>{author?.name}</b> asks:
            <i>{formatDate(question?.timestamp)}</i>
          </Card.Header>
          <Card.Body>
            <div className="question-card-body">
              <img
                src={author?.avatarURL}
                className="question-page-card-img "
              />
              {!isAnswered ? (
                <div className="question-card-content">
                  <h5>Would You Rather</h5>
                  <Form onSubmit={handleSubmit}>
                    <div className="question-page-card-content">
                      <Form.Check
                        data-testid="option1btn"
                        label={question?.optionOne.text}
                        type="radio"
                        name="group"
                        onChange={handleChangeOption}
                      />
                      <p className="question-page-card-content-text">or</p>
                      <Form.Check
                        data-testid="option2btn"
                        label={question?.optionTwo.text}
                        type="radio"
                        name="group"
                        onChange={handleChangeOption}
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <Button
                        className="question-page-submit-btn"
                        variant="primary"
                        type="submit"
                        disabled={btnDisabled}
                      >
                        Submit
                      </Button>
                    </div>
                  </Form>
                </div>
              ) : (
                <div className="answered-content">
                  <h5 className="text-center">Would You Rather - Results</h5>
                  <div className="question-page-card-content">
                    <p
                      className={classNames({ "voted-option-text": votedOpt1 })}
                    >
                      {question.optionOne.text +
                        (votedOpt1 ? " - Your vote" : "")}
                    </p>
                    <ProgressBar now={q1Perc} label={`${q1Perc.toFixed(2)}%`} />
                    <p className="text-center">{`${q1Votes} of ${totalVotes} votes`}</p>
                    <p
                      className={classNames({ "voted-option-text": votedOpt2 })}
                    >
                      {question.optionTwo.text +
                        (votedOpt2 ? " - Your vote" : "")}
                    </p>
                    <ProgressBar now={q2Perc} label={`${q2Perc.toFixed(2)}%`} />
                    <p className="text-center">{`${q2Votes} of ${totalVotes} votes`}</p>
                  </div>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
      </FadeInOnLoad>
    </>
  );
}

const mapStateToProps = ({ authUser, questions, users }, props) => {
  const { qid } = props.router.params;

  return {
    qid,
    authUser,
    questions,
    users,
  };
};

export default withRouter(connect(mapStateToProps)(QuestionPage));
