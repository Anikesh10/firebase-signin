import React from "react";
import styled from "styled-components";

// First way to import
import { BounceLoader } from "react-spinners";

const Loader = (props) => {
  return (
    <Container layerIndex={props.layerIndex}>
      <LoaderContainer className="sweet-loading">
        <BounceLoader
          sizeUnit={"px"}
          size={props.size}
          loading={props.loading}
          color={"#21d4fd"}
        />
      </LoaderContainer>
    </Container>
  );
};

Loader.defaultProps = {
  size: 50,
  layerIndex: 1002,
  loading: true,
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: ${(props) => props.layerIndex};
  top: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.36);
`;

const LoaderContainer = styled.div`
  position: fixed;
  z-index: 10;
  top: calc(50%);
  left: calc(50% + 12px);
  transform: translate(-50%, -50%);
  border-radius: 50%;
`;

export default Loader;
