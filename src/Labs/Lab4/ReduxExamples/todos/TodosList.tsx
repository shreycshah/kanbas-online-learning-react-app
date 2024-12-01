import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { useSelector } from "react-redux";

import TodoItem from "./TodoItem";
export default function TodoList() {
    const { todos } = useSelector((state: any) => state.todosReducer);
    return (
        <div id="wd-todo-list-redux">
            <h2>Todo List</h2>
            <ul className="list-group">
                <TodoForm />
                {todos.map((todo: any) => (
                    <TodoItem todo={todo} />
                ))}
            </ul>
            <hr />
        </div>
    );
}