import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
const SERVER = "http://localhost:3001/"; // TODO fix this entered as Jira task to figure out how to handle server static info
// const GOOGLE_MAPS_KEY = "AIzaSyBFL2uwAAg3ymHvkirWLapG5yaV3mTFEzY"; // TODO fix this in .env

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 50.093284, lng: -122.93494 }}
    >
      {props.markers.map((marker, index) => (
        <Marker
          onClick={markerState => props.onMarkerClick(marker, markerState)}
          onDragEnd={markerState => props.onDragEnd(marker, markerState)}
          key={index}
          {...marker}
        />
      ))}
    </GoogleMap>
  ))
);
class Map extends Component {
  constructor(props) {
    super(props);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  handleMarkerClick = (marker, markerState) => {
    console.log("google:", window.google);
    console.log("handleMarkerClick", marker, markerState);
  };
  handleDragEnd = (marker, markerState) => {
    console.log(
      "handleDragEnd",
      marker,
      markerState.latLng.lat(),
      markerState.latLng.lng(),
      markerState
    );
    marker.position = {
      lat: markerState.latLng.lat(),
      lng: markerState.latLng.lng()
    };
    this.props.sendServer("marker.move", marker);
  };

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
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBFL2uwAAg3ymHvkirWLapG5yaV3mTFEzY"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          onMarkerClick={this.handleMarkerClick}
          onDragEnd={this.handleDragEnd}
          markers={markers}
        />
      </div>
    );
  }
}

export default Map;
