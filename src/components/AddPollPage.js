import { useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./AddPollPage.css";
import { handleAddQuestion } from "../actions/questions";

AddPollPage.propTypes = {
  dispatch: PropTypes.func,
};

function AddPollPage({ dispatch }) {
  const navigate = useNavigate();
  const [opt1Txt, setOpt1Txt] = useState("");
  const [opt2Txt, setOpt2Txt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const target = e.target;
    if (target?.[0].value && target?.[1].value) {
      dispatch(handleAddQuestion(target[0].value, target[1].value));
      setOpt1Txt("");
      setOpt2Txt("");
      navigate("/"); // navigate back to home page
    }
  };

  const handleChangeOption1 = (e) => {
    setOpt1Txt(e.target.value);
  };

  const handleChangeOption2 = (e) => {
    setOpt2Txt(e.target.value);
  };

  return (
    <div>
      <NavigationBar />
      <div className="add-form-container">
        <h4>Would You Rather</h4>
        <h6>Add New Poll</h6>
        <Form className="add-form" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Option One"
              value={opt1Txt}
              onChange={handleChangeOption1}
            />
          </Form.Group>
          <div className="text-center">
            <Form.Text className="add-form-or-text">or</Form.Text>
          </div>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Option Two"
              value={opt2Txt}
              onChange={handleChangeOption2}
            />
          </Form.Group>
          <div className="text-center">
            <Button
              className="add-form-btn"
              variant="primary"
              size="md"
              type="submit"
              disabled={opt1Txt.length === 0 || opt2Txt.length === 0}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default connect()(AddPollPage);
