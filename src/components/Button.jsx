import React from "react";
import styled from "styled-components";

const Button = (props) => {
  return (
    <ButtonWrapper>
      <ButtonLayer />
      <StyledButton title={props.title} onClick={props.action}>
        {props.label}
      </StyledButton>
    </ButtonWrapper>
  );
};

Button.defaultProps = {
  title: "button",
  label: "button",
  action: () => {},
};

export default Button;

const StyledButton = styled.button`
  font-family: Roboto, sans-serif;
  font-size: 15px;
  color: #fff;
  line-height: 1.2;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 50px;
  outline: none;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: block;
  position: relative;
  z-index: 1;
  border-radius: 25px;
  overflow: hidden;
  margin: 0 auto;
`;

const ButtonLayer = styled.div`
  position: absolute;
  z-index: -1;
  width: 300%;
  height: 100%;
  background: #a64bf4;
  background: linear-gradient(right, #21d4fd, #b721ff, #21d4fd, #b721ff);
  background: -webkit-linear-gradient(
    right,
    #21d4fd,
    #b721ff,
    #21d4fd,
    #b721ff
  );
  top: 0;
  left: -100%;
  transition: all 0.4s;
`;
