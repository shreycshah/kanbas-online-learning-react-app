import React from "react";
import HelloRedux from "./HelloRedux";
import Counter from "../Counter";
import CounterRedux from "./CounterRedux";
import AddRedux from "./AddRedux";
import TodoForm from "./todos/TodoForm";
import TodoList from "./todos/TodosList";

export default function ReduxExamples() {
    return (
        <div>
            <h2>Redux Examples</h2>
            <HelloRedux />
            <CounterRedux />
            <AddRedux />
            <TodoList />
        </div>
    );
};
