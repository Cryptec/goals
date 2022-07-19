import React, {Component} from 'react'
import axios from 'axios'

import '../css/Goals.css'


const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT


class GoalElement extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            isError: false,
            goals: []
        };
    }


    async componentDidMount() {
      this.fetchGoals()
      sessionStorage.removeItem("scrollPosition");
    }
    componentDidUpdate() {
      this.handleScrollPosition()
    }

  // handle scroll position after content load
  handleScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
    }
  };

    async fetchGoals() {
        this.setState({ isLoading: true })
        const response = await fetch(
          `${API_ENDPOINT}/api/tasks`
        )
        if (response.ok) {
          const goals = await response.json()
          this.setState({ goals, isLoading: false })
        } else {
          this.setState({ isError: true, isLoading: false })
        }
      }

      renderGoals = () => {
    
          const { isLoading, isError } = this.state
    
          if (isLoading) {
            return <div>Loading..</div>
          }
          if (isError) {
            return <div>Error..</div>
          }
    
          return this.state.goals.map((goal) => {
    
          const taskdone = goal.done === 'true'

          return (
            
            <div key={goal.id} className={ taskdone ? 'GoalfieldDone' : 'Goalfield' } onClick={() => this.setArchievement(goal.id, goal.done)}>
              <p><b style={{borderBottom: '1px solid', fontSize: '2em'}}>{goal.timeframe}</b></p>
              <br></br>
               <div style={{whiteSpace: 'pre-wrap'}}>{goal.task}</div>
               <br></br>
               <p style={{borderTop: '1px solid', marginTop: 'auto' }}>Stichtag: <b>{goal.stichtag}</b></p>
            </div>

          )
          })
        }

    render () {
        return (
            <div className='GoalWrapper'>
                    
                    {this.renderGoals()}
                  
            </div>
        )
    }

    setArchievement(id, done) {

      if (done === "false") {
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
            sessionStorage.setItem("scrollPosition", window.pageYOffset);
            console.log('Form sent')
            this.fetchGoals()
          }
        })
      } else if (done === "true") { 
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
            sessionStorage.setItem("scrollPosition", window.pageYOffset);
            console.log('Form sent')
            this.fetchGoals()
          }
        })
      } 
    }

}

export default GoalElement