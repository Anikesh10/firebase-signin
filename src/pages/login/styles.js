import styled from "styled-components";

export const PageWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: #f2f2f2;
`;

export const FormWrapper = styled.div`
  box-sizing: border-box;
  width: 24%;
  min-width: 320px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  padding: 77px 40px 33px;
  box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
`;

export const Heading = styled.h1`
  font-size: 25px;
  margin-bottom: 2em;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  color: #333;
`;

export const HelperText = styled.span`
  display: inline-block;
  margin-top: 1.5em;
  font-size: 13px;
  color: #666666;
  font-weight: 300;
  line-height: 1.5;
`;
