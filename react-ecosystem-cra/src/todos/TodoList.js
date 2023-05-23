import React, { useEffect } from "react";
import TodoListItem from "./TodoListItem";
import "./TodoList.css"
import NewTodoForm from "./NewTodoForm";
import { connect } from "react-redux";
import { displayAlert } from "./thunks";
import { isLoading } from "./reducers";
import { loadTodos, removeTodoRequest, markTodoAsCompletedRequest } from "./thunks";
import { getCompletedTodos, getIncompleteTodos, getTodos, getTodosLoading } from "./selectors";


const TodoList = ({
    completedTodos,
    incompletedTodos,
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
            <h3>Incomplete:</h3>
            {incompletedTodos.map(todo =>
                <TodoListItem
                    todo={todo}
                    onRemovePressed={onRemovePressed}
                    onCompletedPressed={onCompletedPressed}
                />
            )}
            <h3>Complete:</h3>
            {completedTodos.map(todo =>
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
    isLoading: getTodosLoading(state),
    completedTodos: getCompletedTodos(state),
    incompletedTodos: getIncompleteTodos(state)
});

const mapDispatchToProps = dispatch => ({
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
    onDisplayAlertClicked: text => dispatch(displayAlert(text)),
    startLoadingTodos: () => dispatch(loadTodos())
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);