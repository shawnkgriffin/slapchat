import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle,
  TrafficLayer,
  Polygon
} from "react-google-maps";
const {
  SearchBox
} = require("react-google-maps/lib/components/places/SearchBox");
const {
  DrawingManager
} = require("react-google-maps/lib/components/drawing/DrawingManager");

const SERVER = "http://localhost:3001/"; // TODO fix this entered as Jira task to figure out how to handle server static info
// const GOOGLE_MAPS_KEY = "AIzaSyBFL2uwAAg3ymHvkirWLapG5yaV3mTFEzY"; // TODO fix this in .env

const polygon = [
  { lat: 50.114806, lng: -122.892426 },
  { lat: 50.102365, lng: -122.885903 },
  { lat: 50.091161, lng: -122.873629 },
  { lat: 50.105035, lng: -122.874101 }
];

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
      <Polygon
        paths={[polygon]}
        strokeColor="#f91616"
        strokeOpacity={0.8}
        strokeWeight={0.5}
        fillColor="#f91616"
        fillOpacity={0.35}
        clickable={true}
        draggable={false}
        onDragEnd={polygonState => props.onDragEnd(polygon, polygonState)}
      />
      <Circle
        center={{ lat: 50.092393210938795, lng: -122.98893123865128 }}
        strokeColor="#f91616"
        strokeOpacity={0.8}
        strokeWeight={0.5}
        radius={461.5005410780072}
        fillColor="#f91616"
        fillOpacity={0.35}
        clickable={true}
        draggable={true}
        onDragEnd={circleState => props.onDragEnd("circle", circleState)}
      />
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

  // Marker events
  handleMarkerClick = (marker, markerState) => {
    console.log("google:", window.google);
    console.log("handleMarkerClick", marker, markerState);
  };
  handleDragEnd = (marker, markerState) => {
    marker.lat = markerState.latLng.lat();
    marker.lng = markerState.latLng.lng();
    this.props.sendServer("marker.move", marker);
  };
  onCircleComplete = e => {
    console.log("onCircleComplete", e.center.lat(), e.center.lng(), e.radius);
    let circle = {
      label: "Danger",
      description: "Avalanche hazard, do not approach",
      lat: e.center.lat(),
      lng: e.center.lng(),
      radius: e.radius
    };
    this.props.sendServer("circle.create", circle);
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
        icon: SERVER + "skiing-blue.png",
        position: user.position,
        label: user.display_name
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
