import React, { useEffect } from "react";
import TodoListItem from "./TodoListItem";
import "./TodoList.css"
import NewTodoForm from "./NewTodoForm";
import { connect } from "react-redux";
import { removeTodo, markTodoAsCompleted } from "./actions";
import { displayAlert } from "./thunks";
import { isLoading } from "./reducers";
import { loadTodos } from "./thunks";

const TodoList = ({
    todos = [],
    onRemovePressed,
    onCompletedPressed,
    onDisplayAlertClicked,
    isLoading,
    startLoadingTodos
}) => {
    useEffect(() => {
        startLoadingTodos();
    }, []);

    const loadingMessage = <div>Loading todos...</div>

    const content = (
        <div className="list-wrapper">
            <NewTodoForm />
            {todos.map(todo =>
                <TodoListItem
                    todo={todo}
                    onRemovePressed={onRemovePressed}
                    onCompletedPressed={onCompletedPressed}
                />
            )}
        </div>
    );

    return isLoading ? loadingMessage : content;
};

const mapStateToProps = state => ({
    isLoading: state.isLoading,
    todos: state.todos,
});

const mapDispatchToProps = dispatch => ({
    onRemovePressed: text => dispatch(removeTodo(text)),
    onCompletedPressed: text => dispatch(markTodoAsCompleted(text)),
    onDisplayAlertClicked: text => dispatch(displayAlert(text)),
    startLoadingTodos: () => dispatch(loadTodos())
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);