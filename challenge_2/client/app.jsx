import {hot} from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import Display from './display';

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
    fetch('/rates')
    .then(res => res.json())
    .then((data) => {
      var container = [];
      container.push(data);
      console.log('REZSULT', container);
      this.setState({points: container})
    })
    var ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        label: this.state.name,
        yAxisID: 'Closing Price ($)',
        data: this.state.points
      }
    })
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Cryptocurrency Charting Tool</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Currency Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="submit" />
        </form>
        <canvas id="myChart" width="400" height="400"></canvas>
        <p href='https://www.coindesk.com/price/bitcoin'>Powered by CoinDesk</p>
      </div>
    )
  }
}


export default hot(App);