import React, { Component } from 'react'


class Themes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            theme: '',
            isSubscribed: false,
            count: 0
        }
    }

async componentDidMount() {
        
       await this.getCurrentTheme()
       const root = document.querySelector(':root');
       return root.setAttribute('color-scheme', `${this.state.theme}`);

}
    
getCurrentTheme = () => {
    if (localStorage.getItem('color-scheme') === null ) {
        //localStorage.setItem('color-scheme', 'dark')
        let themestate = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        this.setState({theme: themestate})
        console.log(themestate);
        return themestate
    } else {
        this.setState({theme: localStorage.getItem('color-scheme')})
    }
}

loadThemeLight = async () => {

            this.setState({ theme: 'light' })
            localStorage.setItem('color-scheme', 'light')
            const root = document.querySelector(':root');
            root.setAttribute('color-scheme', `${this.state.theme}`);
            this.setState({count: this.state.count + 1})
}

loadThemeDark = async () => {

            this.setState({ theme: 'dark' })
            localStorage.setItem('color-scheme', 'dark')
            const root = document.querySelector(':root');
            root.setAttribute('color-scheme', `${this.state.theme}`);
            this.setState({count: this.state.count + 1})
  }

setDefaultTheme = async () => {
            localStorage.removeItem('color-scheme')
            this.setState({theme: ''})
            this.setState({count: this.state.count + 1})
}

toggleTheme = () => {
    const theme = this.state.theme
    if (theme === 'dark') {
        this.loadThemeLight();
    } else {
        this.loadThemeDark()
    }
}

    render() {

        return(
            
          <div key={this.state.count}>
          {/* <button onClick={this.toggleTheme}>Apperance: {this.state.theme}</button>*/}
          
          <div className="switch-toggle switch-3 switch-candy">

            <input id="on" 
                   name="state-d" 
                   type="radio" 
                   checked="" />
            <label htmlFor="on" onClick={this.loadThemeLight}>L</label>

            <input id="na" 
                   name="state-d" 
                   type="radio" 
                   checked="checked" />
            <label htmlFor="na" onClick={this.setDefaultTheme}>N/A</label>

            <input id="off" 
                   name="state-d" 
                   type="radio" 
                   checked="" />
            <label htmlFor="off" onClick={this.loadThemeDark}>D</label>

          </div>
          </div>

        )
    }

}

export default Themes