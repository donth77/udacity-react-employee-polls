import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { PropTypes } from "prop-types";
import Table from "react-bootstrap/Table";
import "./Leaderboard.css";
import NavigationBar from "./NavigationBar";
import FadeInOnLoad from "./FadeInOnLoad";

Leaderboard.propTypes = {
  loading: PropTypes.bool,
  leaderboardUsers: PropTypes.array,
};

function Leaderboard({ loading, leaderboardUsers }) {
  return (
    <>
      <NavigationBar />
      <FadeInOnLoad loading={loading}>
        <div className="table-container">
          <Table striped bordered>
            <thead className="table-header">
              <tr>
                <th>User</th>
                <th>Answered</th>
                <th>Asked</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardUsers.map((user, idx) => {
                const numAnswers = Object.keys(user.answers).length;
                const numQuestions = user.questions.length;
                const numTotal = numAnswers + numQuestions;

                return (
                  <tr key={idx}>
                    <td>
                      <div className="table-cell">
                        <img src={user.avatarURL} className="table-cell-img" />
                        <div className="table-cell-name">
                          <h3>{user.name}</h3>
                          <span>{user.id}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="table-cell-value">{numAnswers}</span>
                    </td>
                    <td>
                      <span className="table-cell-value">{numQuestions}</span>
                    </td>
                    <td>
                      <span className="table-cell-value">{numTotal}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </FadeInOnLoad>
    </>
  );
}

const mapStateToProps = ({ questions, users }) => ({
  loading: isEmpty(questions),
  questions,
  leaderboardUsers: Object.values(users).sort(
    (a, b) =>
      Object.keys(b.answers).length +
      b.questions.length -
      (Object.keys(a.answers).length + a.questions.length) // users sorted by total number of questions asked and answered
  ),
});

export default connect(mapStateToProps)(Leaderboard);
