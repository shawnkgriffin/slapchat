import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
const SERVER = "http://localhost:3001/"; // entered as Jira task to figure out how to handle server static info

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 50.093284, lng: -122.93494 }}
    >
      {props.markers.map(marker => <Marker {...marker} />)}
    </GoogleMap>
  ))
);
class Map extends Component {
  render() {
    const markers = this.props.slapMap.markers || [];
    this.props.users.forEach(user =>
      markers.push({
        label: user.name,
        position: user.position,
        icon: SERVER + "skiing-blue.png"
      })
    );
    return (
      <div className="map-container">
        <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          markers={markers}
        />
      </div>
    );
  }
}

export default Map;
