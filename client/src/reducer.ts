export enum TodoActionKind {
  IS_LOADING = 'IS_LOADING',
  HAS_ERROR = 'HAS_ERROR',
  LOAD_TODOS = 'LOAD_TODOS',
  CREATE_TODO = 'CREATE_TODO',
  UPDATE_TODO = 'UPDATE_TODO',
  DELETE_TODO = 'DELETE_TODO',
}

export type Todo = {
  _id: string;
  title: string;
  completed?: boolean;
};

type STATE = {
  todos: Todo[];
  isLoading: boolean;
  hasError: boolean;
};

type ACTIONS =
  | { type: TodoActionKind.IS_LOADING; payload: { isLoading: boolean } }
  | { type: TodoActionKind.HAS_ERROR; payload: { hasError: boolean } }
  | { type: TodoActionKind.CREATE_TODO; payload: { todo: Todo } }
  | { type: TodoActionKind.LOAD_TODOS; payload: { data: Todo[] } }
  | {
      type: TodoActionKind.UPDATE_TODO;
      payload: {
        id: string;
        updateData: { title?: string; completed?: boolean };
      };
    }
  | { type: TodoActionKind.DELETE_TODO; payload: { id: string } };

export const initialState: STATE = {
  todos: [],
  isLoading: false,
  hasError: false,
};

export const TodoReducer = (state: STATE, action: ACTIONS) => {
  switch (action.type) {
    case TodoActionKind.IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    }
    case TodoActionKind.HAS_ERROR: {
      return {
        ...state,
        hasError: action.payload.hasError,
      };
    }
    case TodoActionKind.LOAD_TODOS: {
      return {
        ...state,
        todos: action.payload.data,
      };
    }
    case TodoActionKind.UPDATE_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo._id === action.payload.id) {
            const newTodo = todo;
            if (Object.keys(action.payload.updateData).includes('completed')) {
              newTodo.completed = action.payload.updateData.completed;
            }
            if (Object.keys(action.payload.updateData).includes('title')) {
              newTodo.title = action.payload.updateData.title ?? '';
            }
            return newTodo;
          }
          return todo;
        }),
      };
    }

    case TodoActionKind.CREATE_TODO: {
      return {
        ...state,
        todos: [...state.todos, action.payload.todo],
      };
    }

    case TodoActionKind.DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload.id),
      };
    }
    default:
      return state;
  }
};
