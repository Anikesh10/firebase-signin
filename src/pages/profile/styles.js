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
  width: 50%;
  max-width: 600px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  padding: 77px 40px 33px;
  box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
`;

export const Heading = styled.h1`
  margin: 0.5em 0;
  display: block;
  font-size: 25px;
  text-transform: uppercase;
  text-align: left;
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

export const ButtonWrapper = styled.div`
  display: block;
  max-width: 200px;
  width: 10%;
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  padding: 40px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 4em;
`;

export const HeadingHelper = styled.span`
  font-size: 15px;
  font-weight: 100;
  color: #000;
`;

export const Name = styled.span`
  text-transform: capitalize;
`;
