import React, { Component } from 'react'
import Chart1 from './Chart1'
import Chart2 from './Chart2'
import './style.scss'

class Charts extends Component {
    render() {
        const stations = this.props.stations;

        let empty_slots = 0;
        let free_bikes = 0;

        stations.length > 0 && stations.forEach((station) => {
            free_bikes += station.free_bikes;
            empty_slots += station.empty_slots;
        })


        return (
            <div className="Charts">
                <Chart1 stations={this.props.stations} />

                <Chart2 stations={this.props.stations} />

                <div className="clearfix"></div>

                <div className="free_bikes">Free Bikes: {free_bikes}</div>
                <div className="empty_slots">Empty Slots: {empty_slots}</div>
            </div>
        )
    }
}

export default Charts