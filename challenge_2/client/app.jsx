import {hot} from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.state = {
      value: '',
      points: [],
      data: []
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
      var dates = Object.keys(data['bpi']);
      var rates = Object.values(data['bpi']);
      for(var i = 0; i < dates.length; i++) {
        container.push({x: dates[i], y: rates[i]});
      };
      this.setState({
        points: container,
      });
      const myChartRef = this.chartRef.current.getContext('2d');
      new Chart(myChartRef, {
        type: 'line',
        data: {
          datasets: [
            {
              label: 'BPI',
              data: this.state.points
            }
          ]
        },
        options: {
          scales: {
              xAxes: [{
                  type: 'time',
                  time: {
                      // unit: 'month'
                      displayFormats: {
                        month: 'MMM YYYY'
                    }
                  }
              }]
          }
      }
      });
    })
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Cryptocurrency Charting Tool</h1>
        <h2>Type in a Cryptocurrency</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Currency Name:
            <input type='text' value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type='submit' value='submit' />
        </form>
        <div>
          {this.state.points.length > 0 &&
            <div>
              <canvas
                id='myChart'
                ref={this.chartRef}
              />
            </div>}
        </div>
        <p href='https://www.coindesk.com/price/bitcoin'>Powered by CoinDesk</p>
      </div>
    )
  }
}


export default hot(App);