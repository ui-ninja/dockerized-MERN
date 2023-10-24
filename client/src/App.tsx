import { ChangeEvent, useEffect, useReducer, useState } from 'react';
import {
  type Todo,
  TodoActionKind,
  TodoReducer,
  initialState,
} from './reducer';
import { createTodo, deleteTodo, updateTodo } from './services/todoApi';

function App() {
  return (
    <>
      <h1>🔧 Manage your Todos</h1>
      <div className="main">
        <TodoList />
      </div>
    </>
  );
}

function TodoList() {
  const [state, dispatch] = useReducer(TodoReducer, initialState);

  useEffect(() => {
    async function getTodos() {
      try {
        dispatch({
          type: TodoActionKind.IS_LOADING,
          payload: {
            isLoading: true,
          },
        });
        const res = await fetch('/server/v1/api/todos');
        const data = await res.json();
        // now dispatch action to set todos
        dispatch({
          type: TodoActionKind.IS_LOADING,
          payload: {
            isLoading: false,
          },
        });
        dispatch({
          type: TodoActionKind.LOAD_TODOS,
          payload: {
            data,
          },
        });
      } catch (error) {
        console.error(error);
        dispatch({
          type: TodoActionKind.IS_LOADING,
          payload: {
            isLoading: false,
          },
        });
        // dispatch action to set error
        dispatch({
          type: TodoActionKind.HAS_ERROR,
          payload: {
            hasError: true,
          },
        });
      }
    }
    getTodos();
  }, []);

  async function handleAddTodo(title: string) {
    const data: Todo = await createTodo(title);
    if (data) {
      dispatch({
        type: TodoActionKind.CREATE_TODO,
        payload: {
          todo: data,
        },
      });
    }
  }

  async function handleComplete(id: string, completed: boolean) {
    const { updated } = await updateTodo(id, { completed });
    if (updated) {
      dispatch({
        type: TodoActionKind.UPDATE_TODO,
        payload: {
          id,
          updateData: {
            completed,
          },
        },
      });
    }
  }

  async function handleUpdate(id: string, title: string) {
    const { updated } = await updateTodo(id, { title });
    if (updated) {
      dispatch({
        type: TodoActionKind.UPDATE_TODO,
        payload: {
          id,
          updateData: {
            title,
          },
        },
      });
    }
  }

  async function handleDelete(id: string) {
    // call api
    const { deleted: isDeleted } = await deleteTodo(id);
    // dispatch action
    if (isDeleted) {
      dispatch({
        type: TodoActionKind.DELETE_TODO,
        payload: {
          id,
        },
      });
    } else {
      alert('Deletion failed');
    }
  }

  if (state.isLoading) {
    return <h3>Loading todos...</h3>;
  }

  return (
    <>
      {state.todos.length ? (
        <ul className="todos">
          {state.todos.map((todo) => (
            <Todo
              key={todo._id}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onComplete={handleComplete}
              {...todo}
            />
          ))}
        </ul>
      ) : (
        <p>No todos added</p>
      )}
      <AddTodo onAdd={handleAddTodo} />
    </>
  );
}

function Todo(
  props: Todo & {
    onComplete: (id: string, completed: boolean) => void;
    onUpdate: (id: string, title: string) => void;
    onDelete: (id: string) => void;
  }
) {
  const { _id: id, title, completed, onUpdate, onDelete, onComplete } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [todoText, setTodoText] = useState(title);

  function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
    setTodoText(e.target.value);
  }

  function toggleEditing() {
    setIsEditing(!isEditing);
  }

  function handleCancel() {
    toggleEditing();
    setTodoText(title);
  }

  return (
    <li className="todos__item">
      <input
        type="checkbox"
        className="todos__item__completed"
        onChange={(e) => onComplete(id, e.target.checked)}
        checked={completed}
      />
      <div className="todos__item__title">
        {isEditing ? (
          <input
            type="text"
            className="todos__item__input"
            onChange={handleTextChange}
            value={todoText}
          />
        ) : (
          <h3>{title}</h3>
        )}
      </div>
      {isEditing ? (
        <button
          className="todos__item__action-item"
          title="Update"
          onClick={() => {
            onUpdate(id, todoText);
            setIsEditing(!isEditing);
          }}
        >
          Update
        </button>
      ) : (
        <button
          className="todos__item__action-item"
          title="Edit todo"
          onClick={() => setIsEditing(!isEditing)}
        >
          Edit
        </button>
      )}

      {isEditing ? (
        <button
          className="todos__item__action-item"
          title="Cancel update"
          onClick={handleCancel}
        >
          Cancel
        </button>
      ) : (
        <button
          className="todos__item__action-item"
          title="delete todo"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      )}
    </li>
  );
}

function AddTodo({ onAdd }: { onAdd: (title: string) => void }) {
  const [todo, setTodo] = useState('');
  function handleAdd() {
    onAdd(todo);
    setTodo('');
  }
  return (
    <div className="add-todo">
      <input
        type="text"
        className="add-todo__input"
        placeholder="add a new todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="add-todo__button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default App;
