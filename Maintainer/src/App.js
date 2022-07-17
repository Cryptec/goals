// 1
import React from 'react'
import './App.css'
import './Todo.scss'
import NewTaskForm from './NewTaskForm'

function App() {
  // 2
  return (
    <div >
      <div style={{display: 'flex', justifyContent: 'center'}}>
       <h1 className="title">Manage Goals</h1>
      </div>
      <br></br>
      <div style={{display: 'flex', justifyContent: 'center', width: '100vw'}}>
      
       
      <br></br>
      <NewTaskForm />
      </div>
    </div>
  )
}

export default App