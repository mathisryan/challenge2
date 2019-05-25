import {hot} from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';

function Display(props) {
  var ctx = document.getElementById('myChart').getContext('2d');
  var rateChart = new Chart(ctx, {
    type: 'line',
    data: {
      label: props.name,
      yAxisID: 'Closing Price ($)',
      data: props
    }
  })
}

export default hot(Display);