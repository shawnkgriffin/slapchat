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
          onRightClick={markerState =>
            props.onMarkerRightClick(marker, markerState)
          }
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
        draggable={true}
        onDragEnd={polygonState => props.onDragEnd(polygon, polygonState)}
      />
      {props.circles.map((circle, index) => (
        <Circle
          center={circle.center}
          strokeColor="#f91616"
          strokeOpacity={0.8}
          strokeWeight={0.5}
          radius={circle.radius}
          fillColor="#f91616"
          fillOpacity={0.35}
          clickable={true}
          draggable={true}
          onDragEnd={circleState => props.onCircleDragEnd(circle, circleState)}
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
    this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.onCircleDragEnd = this.onCircleDragEnd.bind(this);
    this.onCircleComplete = this.onCircleComplete.bind(this);
  }

  // Marker events
  handleMarkerClick = (marker, markerState) => {
    console.log("handleMarkerClick", marker, markerState);
  };
  // Marker events
  handleMarkerRightClick = (marker, markerState) => {
    console.log("handleMarkerRightClick", marker, markerState);
    this.props.sendServer("marker.delete", marker);
  };
  handleDragEnd = (marker, markerState) => {
    switch (marker.type) {
      case "MARKER":
        marker.lat = markerState.latLng.lat();
        marker.lng = markerState.latLng.lng();
        this.props.sendServer("marker.move", marker);
        break;
      case "USER":
        let user = {
          id: marker.userId,
          lat: markerState.latLng.lat(),
          lng: markerState.latLng.lng()
        };
        this.props.sendServer("user.move", user);
        break;
      default:
        console.log("unexpected type", marker.type);
    }
  };
  onCircleComplete = e => {
    let circle = {
      label: "Danger",
      description: "Avalanche hazard, do not approach",
      lat: e.center.lat(),
      lng: e.center.lng(),
      radius: e.radius
    };
    this.props.sendServer("circle.add", circle);
  };
  onCircleDragEnd = (circle, circleState) => {
    circle.lat = circleState.latLng.lat();
    circle.lng = circleState.latLng.lng();
    this.props.sendServer("circle.move", circle);
  };
  onMarkerComplete = e => {
    this.props.sendServer("marker.add", {
      lat: e.position.lat(),
      lng: e.position.lng()
    });
    // TODO delete the marker
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
    return (
      <div className="map-container">
        <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBFL2uwAAg3ymHvkirWLapG5yaV3mTFEzY"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          onMarkerClick={this.handleMarkerClick}
          onMarkerRightClick={this.handleMarkerRightClick}
          onDragEnd={this.handleDragEnd}
          onCircleComplete={this.onCircleComplete}
          onCircleDragEnd={this.onCircleDragEnd}
          onMarkerComplete={this.onMarkerComplete}
          onPolygonComplete={this.onPolygonComplete}
          onPolylineComplete={this.onPolylineComplete}
          onRectangleComplete={this.onRectangleComplete}
          onPlacesChanged={this.onPlacesChanged}
          markers={markers}
          circles={this.props.circles}
        />
      </div>
    );
  }
}

export default Map;
