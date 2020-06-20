import React from "react";
import ReactDOM from "react-dom";

import "./js/app.setup";
import "./js/app.store";
import App from "./js/app";

const wrapper = document.querySelector(".app");
wrapper ? ReactDOM.render(<App />, wrapper) : false;
