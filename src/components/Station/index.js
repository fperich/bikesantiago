import React from 'react';
import './style.scss';
import moment from 'moment'

const Station = (props) => {
    return <div className={"Station " + (props.station.free_bikes === 0 ? 'empty ' : '')}>
        <div className="name">Station: {props.station.name}</div>
        <div className="free_bikes">Free bikes: {props.station.free_bikes}</div>
        <div className="empty_slots">Empty Slots: {props.station.empty_slots}</div>
        <div className="last_updated">Last updated: {moment(moment.unix(props.station.extra.last_updated)).fromNow()}</div>
    </div>
}

export default Station;