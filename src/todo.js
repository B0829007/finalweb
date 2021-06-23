import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import TodoApp from './TodoApp';


ReactDOM.render(
  <React.StrictMode>
    <TodoApp />
  </React.StrictMode>,
  document.getElementById('todo')
);