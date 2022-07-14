import React, {Component} from 'react'

import '../css/Goals.css'

class GoalElement extends Component {
    constructor() {
        super();
        this.state = {
            name: ''
        };
    }

    render () {
        return (
            <div>
                <div className='Goalfield'>
                   <p>1 Jahr</p>

                   <div>
                    
                   </div>
                </div>
            </div>
        )
    }
}

export default GoalElement