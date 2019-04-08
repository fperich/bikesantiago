import React, { Component } from 'react'
import './style.scss'
import _ from 'underscore'
import moment from 'moment'
// import location_0x100 from './../../assets/location_0x100.svg'
// import location_10x90 from './../../assets/location_10x90.svg'
// import location_20x80 from './../../assets/location_20x80.svg'
// import location_30x70 from './../../assets/location_30x70.svg'
// import location_40x60 from './../../assets/location_40x60.svg'
// import location_50x50 from './../../assets/location_50x50.svg'
// import location_60x40 from './../../assets/location_60x40.svg'
// import location_70x30 from './../../assets/location_70x30.svg'
// import location_80x20 from './../../assets/location_80x20.svg'
// import location_90x10 from './../../assets/location_90x10.svg'
// import location_100x0 from './../../assets/location_100x0.svg'

import L from 'leaflet'
// eslint-disable-next-line
import tileLayer from 'leaflet-providers'

class Map extends Component {
    // a variable to store our instance of L.map
    constructor(props) {
        super(props);

        this.state = {};
        this.map = null;
        this.setMap = this.setMap.bind(this);
        this.addMarkers = this.addMarkers.bind(this);
    }

    componentDidMount() {
        if (!this.map) {
            this.setMap();
        }
    }

    componentWillReceiveProps() {
        this.addMarkers();
    }

    componentWillUnmount() {
        // code to run just before unmounting the component
        // this destroys the Leaflet map object & related event listeners
        if (this.map) {
            this.map.remove();
        }
    }

    setMap() {
        var self = this;

        if (!this.props.lat || !this.props.lon) {
            return;
        }
        var latlng = new L.LatLng(parseFloat(this.props.lat), parseFloat(this.props.lon));

        var div = this.refs.map;

        this.map = new L.Map(div, {
            center: latlng,
            zoom: self.props.zoom || 13,
            maxZoom: 18,
            minZoom: 5,
            noWrap: false,
            worldCopyJump: true,
            attributionControl: false,
            zoomControl: false,
        });

        /* L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map); */

        L.tileLayer.provider('HERE.normalDayGrey', {
            app_id: 'frDLolvOPozNw7QcNZrD',
            app_code: 'BNMEmdtZtMYk35aH4uNL8w'
        }).addTo(this.map);

        L.control.zoom({
            position: 'topright'
        }).addTo(this.map);

        /* if (this.props.showGeoJson) {
            const geojson = require('./../../assets/comunas.json');

            L.geoJSON(geojson, {
                filter: function (feature, layer) {
                    return feature.properties.NOM_REG === 'Región Metropolitana de Santiago';
                }
            })
            .addTo(this.map)

        } */

        this.addMarkers()

    }

    addMarkers() {

        const layers = this.map._layers;
        //console.log('layers', layers)

        _.each(layers, (layer) => {
            //console.log('layer', layer._icon)
            if (layer._icon) {
                this.map.removeLayer(layer)
            }
        })

        const stations = this.props.stations;

        var points = [];

        stations.forEach((station) => {
            points.push(station)
        })

        var markers = [];

        _.each(points, function (a, b) {

            let html = '<div>'
            html += '<b>' + a.name + '</b>'
            html += '<p>Last updated: ' + moment(moment.unix(a.extra.last_updated)).fromNow() + '</p>'
            html += '<p>Empty slots: ' + a.empty_slots + '</p>'
            html += '<p>Free bikes: ' + a.free_bikes + '</p>'
            html += '</div>'

            const marker = new L.Marker([a.latitude, a.longitude]).bindPopup(html);


            marker.on('mouseover', (mark) => {
                marker.setZIndexOffset(1000)
            })

            marker.on('mouseout', (mark) => {
                marker.setZIndexOffset(0)
            })

            markers.push(marker);
        });

        var markersgroup = L.featureGroup(markers);

        markersgroup.addTo(this.map);

        //this.map.invalidateSize();
    }

    render() {
        return (
            <div >
                <div id="map" ref="map" className="map" ></div>
            </div>
        );
    }
}

export default Map;