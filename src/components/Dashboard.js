import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { PropTypes } from "prop-types";
import Form from "react-bootstrap/Form";
import "./Dashboard.css";
import NavigationBar from "./NavigationBar";
import FadeInOnLoad from "./FadeInOnLoad";
import QuestionsList from "./QuestionsList";

Dashboard.propTypes = {
  loading: PropTypes.bool,
  newQns: PropTypes.array,
  answeredQns: PropTypes.array,
};

function Dashboard({ loading, newQns, answeredQns }) {
  const [qns, setQns] = useState(newQns);
  const [selected, setSelected] = useState("New Questions");
  const opts = ["New Questions", "Answered"];

  useEffect(() => {
    setQns(newQns);
  }, [newQns]);

  const handleSelect = (e) => {
    setSelected(e.target.value);
    switch (e.target.value) {
      case "New Questions":
        setQns(newQns);
        break;
      case "Answered":
        setQns(answeredQns);
        break;
    }
  };

  return (
    <>
      <NavigationBar />
      <FadeInOnLoad loading={loading}>
        <div className="questions-container">
          <Form.Select className="questions-select" onChange={handleSelect}>
            {opts.map((opt, idx) => (
              <option key={idx} value={opt}>
                {opt}
              </option>
            ))}
          </Form.Select>
          <QuestionsList questions={qns} isNew={selected === "New Questions"} />
        </div>
      </FadeInOnLoad>
    </>
  );
}

const mapStateToProps = ({ authUser, questions }) => ({
  loading: isEmpty(questions),
  answeredQns: Object.values(questions)
    .filter(
      (question) =>
        question.optionOne.votes.includes(authUser.id) ||
        question.optionTwo.votes.includes(authUser.id)
    )
    .sort((a, b) => b.timestamp - a.timestamp), // polls logged in user answered from most to least recent
  newQns: Object.values(questions)
    .filter(
      (question) =>
        !question.optionOne.votes.includes(authUser.id) &&
        !question.optionTwo.votes.includes(authUser.id)
    )
    .sort((a, b) => b.timestamp - a.timestamp), // polls logged in user didn't answer yet from most to least recent
});

export default connect(mapStateToProps)(Dashboard);
