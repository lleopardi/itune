import "./index.scss";

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const Index = () => <div>Hello world</div>


const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <StrictMode>
    <Index/>
  </StrictMode>
);
