import React, { Fragment } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
// configure redux store
import { store, persistor } from "../config/store";

function AllProvider(props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>{props.children}</BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default AllProvider;
