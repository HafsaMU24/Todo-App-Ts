import TodoList from './Components/TodoList';
import "./CSS/App.css";

  function App() {

  return (
    <div className='App'>
      <div className="header">
      <h1> Todo App </h1>
      </div>
    <TodoList/>
    </div>
  );
};

export default App;
