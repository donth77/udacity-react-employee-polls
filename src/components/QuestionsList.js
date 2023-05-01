import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./Dashboard.css";
import { formatDate } from "../utils/helpers";

QuestionsList.propTypes = {
  questions: PropTypes.array,
  users: PropTypes.object,
  isNew: PropTypes.bool,
};

function QuestionsList({ questions, users, isNew }) {
  const navigate = useNavigate();
  if (!questions || !users) {
    return null;
  }
  return (
    <div className="questions-section">
      <Col className="questions-col">
        {Object.values(questions).map((question) => {
          const { author: authorId } = question;
          const author = users[authorId];
          return (
            <Card key={question.id} className="question-card">
              <Card.Header className="question-card-header">
                <b>{author.name}</b> asks:
                <i>{formatDate(question.timestamp)}</i>
              </Card.Header>
              <Card.Body className="question-card-body">
                <img src={author?.avatarURL} className="question-card-img" />
                <div className="question-card-content">
                  <p className="question-card-content-text">
                    {question.optionOne.text}
                  </p>
                  <p className="question-card-content-text">or…</p>
                  <Button
                    className="question-card-content-btn"
                    variant={isNew ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => navigate(`/question/${question.id}`)}
                  >
                    {isNew ? "Answer" : "Results"}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </Col>
    </div>
  );
}

const mapStateToProps = ({ users }) => ({
  users,
});

export default connect(mapStateToProps)(QuestionsList);
