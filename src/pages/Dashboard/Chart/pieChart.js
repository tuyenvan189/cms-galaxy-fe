import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';


const data = [
  { month: 'Jan', area: 28.4},
  { month: 'Feb', area: 27.7 },
  { month: 'Mar', area: 9.2 },
  { month: 'Apr', area: 34.7},
];


export default class PieChart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <Paper style={{padding:'20px'}}>
        <Chart
          data={chartData}
          label="area"
        >
          <PieSeries
            valueField="area"
            argumentField="month"
          />
          <h3 style={{color:'#049372'}}>Current Visists</h3>
          <Animation />
        </Chart>
      </Paper>
    );
  }
}
