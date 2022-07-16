
import React, { Component } from 'react'
import axios from 'axios'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:5000'


class Task extends Component {
  constructor() {
    super()
    this.state = {
      task: '',
      done: '',
      id: '',
      stichtag: '',
      timeframe: '',
      count: 0,
      fetchtasks: []
    }
  }

  componentDidMount = async () => {
    const response = await fetch(`${API_ENDPOINT}/api/tasks`)
    if (response.ok) {
      const fetchtasks = await response.json()
      this.setState({ fetchtasks })
      this.state.fetchtasks.map(task => {
      this.setState({ done: task.done, task: task.task, timeframe: task.timeframe, stichtag: task.stichtag, id: task.id })
      return this.handleCheck()
      })
    } else {
      console.log('error')
    }
  }

  fetchTasks = async () => {
    const response = await fetch(`${API_ENDPOINT}/api/tasks`)
    if (response.ok) {
      const fetchtasks = await response.json()
      this.setState({ fetchtasks })
      this.state.fetchtasks.map(task => {
        this.setState({ done: task.done, task: task.task, timeframe: task.timeframe, stichtag: task.stichtag, id: task.id })
        return this.handleCheck()
        })
    } else {
      console.log('error')
    }
  }

  handleCheck = (id) => {
    if (this.state.done === 'true') {
      document.getElementById(this.state.id).checked = true  
    } else if  (this.state.done === 'false') {
      document.getElementById(this.state.id).checked = false
    }
  }

  render() {
    return this.state.fetchtasks.map(tasks => {
  
      const taskdone = tasks.done === 'true'
    return (
    <tr>
      <td>
        <input 
           type="checkbox" 
           id={tasks.id}
           onChange={() => this.handleChange(tasks.id)}
           value={this.state.done}
           key={this.state.count}
           />
      </td>
      <td>
        <span id={tasks.id} key={this.state.count} className={ taskdone ? 'task-done' : '' }>{tasks.timeframe}&nbsp;&nbsp;  {tasks.task}&nbsp;&nbsp;  {tasks.stichtag}</span>
      </td>
      <td>
        <span style={{cursor: 'pointer'}} onClick={() => this.deleteTableRow(tasks.id)}>&nbsp; <b>&#10005;</b> &nbsp; </span>
      </td>
    </tr>
  )
  })
  }

  deleteTableRow = async (id) => {
    document.getElementById(id).checked = false
    await fetch(`${API_ENDPOINT}/api/task/${id}`, { method: 'DELETE'})
    const response = await fetch(`${API_ENDPOINT}/api/tasks`)
    if (response.ok) {
      const fetchtasks = await response.json()
      this.setState({ fetchtasks })
    } else {
      console.log('error')
    }
  }
  
  
  handleChange(id) {
    var checkBox = document.getElementById(id)
    if (checkBox.checked === true) {
      axios({
        method: 'POST',
        url: `${API_ENDPOINT}/api/setstate/${id}`,
        headers: { 'Content-Type': 'application/json' },
        data: {
          id: id,
          done: 'true',
        },
      }).then((response) => {
        if (response.data.answer === 'success') {
          this.setState({
            task: ''
          })
          console.log('Form sent')
          this.fetchTasks()
        }
      })
    } else if (checkBox.checked === false) { 
      
      axios({
        method: 'POST',
        url: `${API_ENDPOINT}/api/setstate/${id}`,
        headers: { 'Content-Type': 'application/json' },
        data: {
          id: id,
          done: 'false',
        },
      }).then((response) => {
        if (response.data.answer === 'success') {
          this.setState({
            task: ''
          })
          console.log('Form sent')
          this.fetchTasks()
        }
      })
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
        stichtag: this.state.stichtag,
        timeframe: this.state.timeframe
      },
    }).then( async (response) => {
      if (response.data.answer === 'success') {
        this.setState({
          task: '',
          stichtag: '',
          timeframe: ''
        })
        console.log('Form sent')
        await this.fetchTasks()
        this.setState({count: this.state.count + 1})
      }
    })
  }
}


export default Task