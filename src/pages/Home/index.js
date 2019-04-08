import React, { Component } from 'react';
import './style.scss';
import { api } from './../../config/settings'
import Loading from './../../components/Loading'
import Station from './../../components/Station'
import Map from './../../components/Map'
import Charts from './../../components/Charts'

const TIME_TO_GET_STATIONS = 60000;

class Home extends Component {
    constructor() {
        super()

        this.state = {
            stations: [],
            loading: true,
            order: 'name',
            view: 'list',
            filter: ''
        }

        this.getStations = this.getStations.bind(this)
        this.onChangeFilter = this.onChangeFilter.bind(this)
        this.onChangeOrder = this.onChangeOrder.bind(this)
        this.changeView = this.changeView.bind(this)
        this.filter = this.filter.bind(this)
        this.clearFilter = this.clearFilter.bind(this)
    }

    componentDidMount() {
        this.interval = setInterval(this.getStations, TIME_TO_GET_STATIONS)
        this.getStations();

    }


    onChangeFilter(ev) {
        const filter = ev.target.value;

        this.setState({
            filter
        }, () => {
            this.getStations();
        })

        if (this.interval) {
            clearInterval(this.interval)
        }

        this.interval = setInterval(this.getStations, TIME_TO_GET_STATIONS)
    }

    onChangeOrder(ev) {
        const order = ev.target.value;

        this.setState({
            order
        }, () => {
            this.getStations();
        })

        if (this.interval) {
            clearInterval(this.interval)
        }

        this.interval = setInterval(this.getStations, TIME_TO_GET_STATIONS)
    }

    getStations() {

        this.setState({
            loading: true
        })

        let qs = '?sortby=' + this.state.order;

        if (this.state.filter !== '') {
            qs += '&filter=' + this.state.filter
        }

        fetch(api + 'get' + qs)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    stations: response,
                    loading: false
                })
            })
            .catch(error => {
                console.log('error', error)
                this.setState({
                    stations: [],
                    loading: false
                })
            })
    }

    changeView(view) {
        this.setState({
            view
        })
    }

    filter(ev) {
        const text = document.querySelector('#search').value;

        this.setState({
            filter: text
        }, () => {
            this.getStations();
        })
    }

    clearFilter(){
        document.querySelector('#search').value = '';
        this.setState({
            filter: ''
        }, () => {
            this.getStations();
        })
    }

    render() {
        return (
            <div className="Home">
                {this.state.loading ? <Loading /> : null}

                <div>
                    <button onClick={() => this.changeView('list')}>List View</button>&nbsp;
                    <button onClick={() => this.changeView('map')}>Map View</button>
                    <button onClick={() => this.changeView('chart')}>Chart</button>

                    {
                        this.state.view === 'list' ?
                            <div>
                                <span>Order by: </span>
                                <select className="order" value={this.state.order} onChange={this.onChangeOrder}>
                                    <option value="name">Name</option>
                                    <option value="empty_slots">Empty Slots</option>
                                    <option value="free_bikes">Free Bikes</option>
                                </select>

                            </div>

                            : null
                    }

                    {
                        this.state.view === 'list' || this.state.view === 'map' ?
                            <div>
                                <span>Filter:</span>
                                <input type="text" name="search" id="search" placeholder="E.g.: Metro" />
                                <button onClick={this.filter}>Send</button>
                                <button onClick={this.clearFilter}>Clear</button>
                            </div>
                            : null
                    }

                </div>


                {
                    this.state.view === 'list' ?
                        this.state.stations.length > 0 && this.state.stations.map((station, i) => {
                            return <Station key={i} station={station} />
                        })
                        : null
                }

                {
                    this.state.view === 'map' ?
                        <Map lat={-33.45} lon={-70.67} stations={this.state.stations} />
                        : null
                }

                {
                    this.state.view === 'chart' ?
                        <Charts stations={this.state.stations} />
                        : null
                }
            </div>
        );
    }
}

export default Home;
