import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  TrafficLayer
} from "react-google-maps";
const {
  SearchBox
} = require("react-google-maps/lib/components/places/SearchBox");
const {
  DrawingManager
} = require("react-google-maps/lib/components/drawing/DrawingManager");

const SERVER = "http://localhost:3001/"; // TODO fix this entered as Jira task to figure out how to handle server static info
// const GOOGLE_MAPS_KEY = "AIzaSyBFL2uwAAg3ymHvkirWLapG5yaV3mTFEzY"; // TODO fix this in .env

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 50.093284, lng: -122.93494 }} // Whistler
    >
      <TrafficLayer autoUpdate />
      {props.markers.map((marker, index) => (
        <Marker
          onClick={markerState => props.onMarkerClick(marker, markerState)}
          onDragEnd={markerState => props.onDragEnd(marker, markerState)}
          key={index}
          {...marker}
        />
      ))}
      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Search locations..."
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            marginTop: `10px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`
          }}
        />
      </SearchBox>
      <DrawingManager
        defaultOptions={{
          drawingControl: true,
          drawingControlOptions: {
            position: window.google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              window.google.maps.drawing.OverlayType.MARKER,
              window.google.maps.drawing.OverlayType.CIRCLE,
              window.google.maps.drawing.OverlayType.POLYGON,
              window.google.maps.drawing.OverlayType.POLYLINE,
              window.google.maps.drawing.OverlayType.RECTANGLE
            ]
          },
          markerOptions: {
            clickable: true,
            draggable: true,
            editable: true,
            zIndex: 1
          },
          circleOptions: {
            fillColor: "#f91616",
            fillOpacity: 0.2,
            strokeWeight: 1,
            clickable: true,
            editable: true,
            zIndex: 1
          },
          rectangleOptions: {
            fillColor: "#f91616",
            fillOpacity: 0.2,
            strokeWeight: 1,
            clickable: true,
            editable: true,
            zIndex: 1
          },
          polygonOptions: {
            fillColor: "#f91616",
            fillOpacity: 0.2,
            strokeWeight: 1,
            clickable: true,
            editable: true,
            zIndex: 1
          },
          polylineOptions: {
            strokeWeight: 1,
            clickable: true,
            editable: true,
            zIndex: 1
          }
        }}
        onCircleComplete={props.onCircleComplete}
        onMarkerComplete={props.onMarkerComplete}
        onPolygonComplete={props.onPolygonComplete}
        onPolylineComplete={props.onPolylineComplete}
        onRectangleComplete={props.onRectangleComplete}
      />
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
  onCircleComplete = e => {
    console.log("onCircleComplete", e.center.lat(), e.center.lng(), e.radius);
  };
  onMarkerComplete = e => {
    console.log("onMarkerComplete", e.position.lat(), e.position.lng());
  };
  onPolygonComplete = e => {
    console.log("onPolygonComplete", e.getPaths().getArray()[0]);
  };
  onPolylineComplete = e => {
    console.log("onPolylineComplete", e);
  };
  onRectangleComplete = e => {
    console.log("onRectangleComplete", e);
  };
  onPlacesChanged = e => {
    console.log("onPlacesChanged", e);
  };

  render() {
    const markers = this.props.markers || [];
    this.props.users.forEach(user =>
      markers.push({
        label: user.display_name,
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
          onCircleComplete={this.onCircleComplete}
          onMarkerComplete={this.onMarkerComplete}
          onPolygonComplete={this.onPolygonComplete}
          onPolylineComplete={this.onPolylineComplete}
          onRectangleComplete={this.onRectangleComplete}
          onPlacesChanged={this.onPlacesChanged}
          markers={markers}
        />
      </div>
    );
  }
}

export default Map;
