// 1
import React from 'react'
import './App.css'
import './Todo.scss'
import NewTaskForm from './NewTaskForm'
import TaskList from './TaskList'

function App() {
  // 2
  return (
    <div className="container">
      <br></br>
       <h1 className="title">Todo List</h1>
      <br></br>
      <NewTaskForm />
      
    </div>
  )
}

export default App