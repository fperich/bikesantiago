import React, { Component } from 'react';
import './style.scss';

class Loading extends Component {
    render() {
        return (
            <div className={'loader active'}>
                <svg className="spinner-loader" width="60px" height="60px" viewBox="0 0 80 80">
                    <path className="spinner-loader-circlebg" d="M40,10C57.351,10,71,23.649,71,40.5S57.351,71,40.5,71 S10,57.351,10,40.5S23.649,10,40.5,10z"></path>
                    <path id="spinner-loader-circle" className="preload-loader-circle" d="M40,10C57.351,10,71,23.649,71,40.5S57.351,71,40.5,71 S10,57.351,10,40.5S23.649,10,40.5,10z"></path>
                </svg>
            </div>
        )
    }
}

export default Loading;
