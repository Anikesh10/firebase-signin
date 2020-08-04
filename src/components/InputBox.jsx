import React from "react";
import TextField, { Input } from "@material/react-text-field";
import "@material/react-text-field/dist/text-field.css";
import styled from "styled-components";

const InputBox = (props) => {
  return (
    <InputWrapper>
      <StyledTextField label={props.label} outlined>
        <Input
          type={props.type || "text"}
          value={props.value}
          onChange={(e) => props.handleInput(e.currentTarget.value)}
          disabled={props.disabled}
        />
      </StyledTextField>
      {props.error ? <Error>{props.error}</Error> : null}
    </InputWrapper>
  );
};

InputBox.defaultProps = {
  label: "Input",
  error: "",
  handleInput: () => {},
  value: "",
  disabled: false,
};

export default InputBox;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 1.5em;
`;

const Error = styled.span`
  display: inline-block;
  margin: 5px 0;
  font-size: 12px;
  font-weight: 500;
  color: #ff4d4d;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  font-family: Roboto, sans-serif;
`;
