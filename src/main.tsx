import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<App />} />
          <Route path=":from" element={<App />} />
          <Route path=":from/:to" element={<App />} />
          <Route path=":from/:change1/:to" element={<App />} />
          <Route path=":from/:change1/:change2/:to" element={<App />} />
          <Route
            path=":from/:change1/:change2/:change3/:to"
            element={<App />}
          />
          <Route
            path=":from/:change1/:change2/:change3/:change4/:to"
            element={<App />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
