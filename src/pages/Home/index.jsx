import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../AppContext';

function Home() {
  const { state, dispatch } = useContext(AppContext);
  const [todoText, setTodoText] = useState('');

  const addTodo = (text) => {
    if (text.trim() === '') return;
    const newTodo = { id: Date.now(), text };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
    setTodoText('');
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const updateTodo = (id, text) => {
    dispatch({ type: 'UPDATE_TODO', payload: { id, text } });
  };

  const startTimer = (seconds) => {
    dispatch({ type: 'SET_TIMER', payload: seconds });
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (state.timer > 0) {
        dispatch({ type: 'DECREMENT_TIMER' });
      } else {
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [state.timer]);

  const handleTodoSubmit = (e) => {
    e.preventDefault();
    addTodo(todoText);
  };

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center mb-8">Home </h1>

      <div className="mb-10">
        <h2 className="text-lg font-bold mb-5">Task List</h2>
        <form onSubmit={handleTodoSubmit} className="flex gap-3 mb-6">
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            placeholder="Enter new task"
            className="flex-grow p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add
          </button>
        </form>
        <ul className="divide-y divide-gray-200">
          {state.todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
            >
              <span>{todo.text}</span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-5">Countdown Timer</h2>
        <div className="flex items-center gap-5">
          <input
            type="number"
            placeholder="Set time (seconds)"
            onChange={(e) => startTimer(parseInt(e.target.value, 10))}
            className="w-1/3 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
          />
          <p className="text-lg font-semibold">Remaining: {state.timer} seconds</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
