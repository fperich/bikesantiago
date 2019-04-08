import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import moment from 'moment'


export default class Chart2 extends PureComponent {

  render() {
    let stations = this.props.stations;



    stations = stations.filter((station) => {
      //console.log(moment().diff(moment.unix(station.extra.last_updated), 'hour'))
      return moment().diff(moment.unix(station.extra.last_updated), 'hour') <= 1
    })


    const data = [];

    // eslint-disable-next-line
    let empty_slots = 0;
    // eslint-disable-next-line
    let free_bikes = 0;

    stations.length > 0 && stations.forEach((station) => {
      free_bikes += station.free_bikes;
      empty_slots += station.empty_slots;

      data.push({
        name: moment.unix(station.extra.last_updated).format('DD-MM-YYYY HH:mm:ss'), "Free Bikes": station.free_bikes, "Empty Slots": station.empty_slots,
      })
    })


    return (
      <LineChart
        width={900}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Empty Slots" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="Free Bikes" stroke="#82ca9d" />
      </LineChart>
    );
  }
}
