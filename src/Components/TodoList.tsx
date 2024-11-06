import React, { useState }from 'react';
import TodoTypes from './Todo';
import TodoService from './TodoService';
import TodoForm from './TodoForm';
import "../CSS/TodoList.css";


//function för handling

const TodoList: React.FC = () => {
   const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
   const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
   const [editedTodoText, setEditedTodoText] = useState<string>("");

const handleEditStart =(id: number, text: string) => {
  setEditingTodoId(id);
  setEditedTodoText(text);
};

const handleEditCancel = ()=> {
  setEditingTodoId(null);
  setEditedTodoText("");
};

const handleEditSave = (id: number) =>{
  if(editedTodoText.trim() !== ""){
    const updateTodo =TodoService.updateTodo({
      id,
      text:editedTodoText,
      completed:false,
    });
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>(todo.id === id ?updateTodo:todo))
  );
    setEditingTodoId(null);
    setEditedTodoText("");
  }
};

//functin för ta bort

const handleDeleteTodo = (id: number) => {
  TodoService.deleteTodo(id);
  setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
};
  return (
  <div className="todoContainer">
    <div className="inputForm">
      <TodoForm setTodos={setTodos}/>
    </div>
    <div className="todos">
      {todos.map((todo) =>(
      <div className="items" key={todo.id}>
        {editingTodoId === todo.id ?(
          <div className="editeText">
            <input 
            type="text"
            value={editedTodoText}
            onChange={(e) => setEditedTodoText(e.target.value)}
            />
            <button onClick={() => handleEditSave(todo.id)}>Spara</button>
            <button onClick={handleEditCancel}>Avbryt</button>
          </div>
        ):(
          <div className="editBtn">
            <span>{todo.text}</span>
            <button onClick={() => handleEditStart(todo.id, todo.text)}>Ändring</button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Ta bort</button> 
          </div>
        )}
      </div>
      ))}
     </div>
  </div>
    
  );
};

export default TodoList;
