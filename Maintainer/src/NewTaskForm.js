// 1
import React, { Component } from 'react'
import axios from 'axios'
import TaskList from './TaskList'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:5000'


class NewTaskForm extends Component {
  constructor() {
    super()
    this.state = {
      task: '',
      done: 'false',
      count: 0
    }
  }

  render() {

  return (
    <div className="container">
    <form onSubmit={this.handleSubmit.bind(this)}>
      <input 
         type="text" 
         value={this.state.task} 
         id='task'
         placeholder="New task..." 
         onChange={this.handleChange.bind(this)}
         required />
      <button>Add</button>
    </form>

      <TaskList key={this.state.count} />
    </div>


  )
  }
  
  handleChange(event) {
    const field = event.target.id

    if (field === 'task') {
      this.setState({ task: event.target.value })
    } 
  }
  handleSubmit(event) {
    event.preventDefault()

    axios({
      method: 'POST',
      url: `${API_ENDPOINT}/api/settask`,
      headers: { 'Content-Type': 'application/json' },
      data: {
        task: this.state.task,
        done: this.state.done,
      },
    }).then((response) => {
      if (response.data.answer === 'success') {
        this.setState({
          task: ''
        })
        console.log('Form sent')
      }
    })
    this.setState({ count: this.state.count + 1 })
  }
}


export default NewTaskForm