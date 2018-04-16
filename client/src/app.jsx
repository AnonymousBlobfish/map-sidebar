import React from 'react';
import axios from 'axios';
import { InfoList } from './InfoList.jsx';
import MapContainer from './MapContainer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.restaurant || !this.props.restaurant.lat) {
      if (!window || !window.mapState) {
        return <div> Loading Sidebar... </div>;
      } else {
        return (
          <div className="sidebar-flexbox-col sidebar-app">
          <InfoList restaurant={window.mapState} />
          <MapContainer lat={window.mapState.lat} lng={window.mapState.lng} />
          </div>
        );
      }
    } else {
      return (
        <div className="sidebar-flexbox-col sidebar-app">
          <InfoList restaurant={this.props.restaurant} />
          {/* <MapContainer lat={this.props.restaurant.lat} lng={this.props.restaurant.lng} /> */}
        </div>
      );
    }
  }
}

export { App };
