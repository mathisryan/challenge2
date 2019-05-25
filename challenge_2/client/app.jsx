import {hot} from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      points: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost.com:3001/rates')
    .then(res => res.json())
    .then((result) => {
      var container = [];
      container.push(result);
      this.setState({points: container})
    })
  }

  render() {
    return (
      <div>
        <title>Cryptocurrency Charting Tool</title>
        <form onSubmit={this.handleSubmit}>
          <label>
            Currency Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="submit" />
        </form>
        <canvas id="myChart" width="400" height="400"></canvas>
        <Display points={this.state.points} />
      </div>
    )
  }
}


export default hot(App);