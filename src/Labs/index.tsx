import { Route, Routes, Navigate } from "react-router";
import TOC from "./TOC";
import store from "./store";
import { Provider } from "react-redux";

export default function Labs() {
  return (
    <Provider store={store}>
      <div className="container-fluid">
        <h1>CS5610 - Web Development</h1>
        <h2>Shrey Chirag Shah</h2>
        <h2>Harsh Shah</h2>
        <h2>Anurag Akrathuveetil</h2>
        <h3>Section 01</h3>
        <h2>Project - Kanbas Quizzes</h2>
        <TOC />
      </div>
    </Provider>
  );
}