import React, { Component } from 'react';
import { render } from 'react-dom';
import { Switch, SwitchLabel, SwitchRadio, SwitchSelection } from './styles.js';

const titleCase = str =>
  str.split(/\s+/).map(w => w[0] + w.slice(1)).join(' ');

const ClickableLabel = ({ title, onChange, id }) =>
  <SwitchLabel onClick={() => onChange(title)} className={id}>
    {titleCase(title)}
  </SwitchLabel>;

const ConcealedRadio = ({ value, selected }) =>
  <SwitchRadio type="radio" name="switch" checked={selected === value} />;

class ToggleSwitch extends Component {

  state = {
    selected: this.props.selected,
    theme: '',
    isSubscribed: false,
    count: 0
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
     this.setState({theme: themestate, selected: 'default'})
     console.log(themestate);
     return themestate
 } else {
     this.setState({theme: localStorage.getItem('color-scheme'), 
     selected: localStorage.getItem('color-scheme')})
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

  handleChange = val => {
    this.setState({ selected: val });
    if (val === "light") { 
        this.loadThemeLight()
    } else if ( val === "dark") {
        this.loadThemeDark()
    } else {
        this.setDefaultTheme()
    }
  };

  selectionStyle = () => {
    return {
      left: `${this.props.values.indexOf(this.state.selected) / 3 * 100}%`,
    };
  };

  render() {
    const { selected } = this.state;
    return (
      <Switch>
        {this.props.values.map(val => {
          return (
            <span>
              <ConcealedRadio value={val} selected={selected} />
              <ClickableLabel title={val} onChange={this.handleChange} />
            </span>
          );
        })}
        <SwitchSelection style={this.selectionStyle()} />
      </Switch>
    );
  }
}



export default ToggleSwitch