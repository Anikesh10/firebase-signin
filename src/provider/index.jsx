import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "../styles/globalStyle";
// configure redux store
import { store, persistor } from "../config/store";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";

function AllProvider(props) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <GlobalStyle />
        <ToastContainerStyled />
        <BrowserRouter>{props.children}</BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

const ToastContainerStyled = styled(ToastContainer)`
  .Toastify__toast {
    display: block;
    position: relative;
    padding: 15px;
    min-height: 50px;
    border-radius: 3px;
  }

  .Toastify__close-button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 6px;
  }
`;

export default AllProvider;
