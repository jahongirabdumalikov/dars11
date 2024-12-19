export default function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
        ),
      };
   
    case 'SET_TIMER':
      return { ...state, timer: action.payload };
    case 'DECREMENT_TIMER':
      return { ...state, timer: state.timer > 0 ? state.timer - 1 : 0 };
    default:
      return state;
  }
}
