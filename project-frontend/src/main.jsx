import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.scss";

import "../node_modules/@fontsource/plus-jakarta-sans/200.css";
import "../node_modules/@fontsource/plus-jakarta-sans/300.css";
import "../node_modules/@fontsource/plus-jakarta-sans/400.css";
import "../node_modules/@fontsource/plus-jakarta-sans/500.css";
import "../node_modules/@fontsource/plus-jakarta-sans/600.css";
import "../node_modules/@fontsource/plus-jakarta-sans/700.css";
import "../node_modules/@fontsource/plus-jakarta-sans/800.css";

import { RouterProvider } from "react-router-dom";
import router from "./routes/index.jsx";
import { JWTProvider } from "./contexts/JWTContext.jsx";
import { SnackbarProvider } from "./utils/SnackbarProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
      <SnackbarProvider>
        <JWTProvider>
            <RouterProvider router={router}>
            <App />
            </RouterProvider>
        </JWTProvider>
      </SnackbarProvider>
  </>
);


