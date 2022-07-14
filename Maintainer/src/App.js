// 1
import React from 'react'
import './App.css'
import './Todo.scss'
import NewTaskForm from './NewTaskForm'

function App() {
  // 2
  return (
    <div className="container">
      <br></br>
       <h1 className="title">Manage Goals</h1>
      <br></br>
      <NewTaskForm />
      
    </div>
  )
}

export default App