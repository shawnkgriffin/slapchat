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
          icon={{
            url: marker.icon,
            size: new window.google.maps.Size(32, 64),
            origin: new window.google.maps.Point(0, 0),
            // anchor: new window.google.maps.Point(32, 37),
            labelOrigin: new window.google.maps.Point(20, 45)
          }}
          label={{
            text: marker.label,
            color:
              marker.type === "USER"
                ? "#549BDE"
                : marker.type === "DESTINATION" ? "#66C547" : "#EF7E7A",
            fontSize: "16px"
            //fontWeight: "bold"
          }}
          position={marker.position}
          draggable={marker.draggable}
          visible={marker.visible}
        />
      ))}
      <Polygon
        paths={[polygon]}
        defaultOptions={{
          fillColor: "#D44444",
          strokeColor: "#D44444",
          strokeOpacity: 0.8,
          strokeWeight: 0.5,
          fillOpacity: 0.35,
          draggable: true,
          clickable: true,
          editable: false
        }}
        onDragEnd={polygonState => props.onDragEnd(polygon, polygonState)}
      />
      {props.circles.map((circle, index) => (
        <Circle
          defaultOptions={{
            fillColor: "#D44444",
            strokeColor: "#D44444",
            strokeOpacity: 0.8,
            strokeWeight: 0.5,
            fillOpacity: 0.35,
            draggable: true,
            clickable: true,
            editable: false
          }}
          circleRef={props.onSearchBoxMounted}
          center={circle.center}
          key={index}
          radius={circle.radius}
          onDragEnd={circleState => props.onCircleDragEnd(circle, circleState)}
          onClick={circleState => props.onCircleClick(circle, circleState)}
          // onRadiusChanged={circleState =>
          //   props.onCircleRadiusChanged(circle, circleState)
          // }
          onRightClick={circleState =>
            props.onCircleRightClick(circle, circleState)
          }
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
    </GoogleMap>
  ))
);
class Map extends Component {
  constructor(props) {
    super(props);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleCircleClick = this.handleCircleClick.bind(this);
    this.handleCircleRightClick = this.handleCircleRightClick.bind(this);
    this.handleCircleRadiusChanged = this.handleCircleRadiusChanged.bind(this);
    this.onCircleDragEnd = this.onCircleDragEnd.bind(this);
    this.onCircleComplete = this.onCircleComplete.bind(this);
  }

  // Marker events
  handleMarkerClick = (marker, markerState) => {};
  // Marker events
  handleMarkerRightClick = (marker, markerState) => {
    this.props.sendServer("marker.delete", marker);
  };
  handleDragEnd = (marker, markerState) => {
    switch (marker.type) {
      case "MARKER":
      case "DESTINATION":
        marker.lat = markerState.latLng.lat();
        marker.lng = markerState.latLng.lng();
        this.props.sendServer("marker.move", marker);
        break;
      case "USER":
        let destinationMarker = {
          lat: markerState.latLng.lat(),
          lng: markerState.latLng.lng(),
          type: "DESTINATION",
          owner_user_id: marker.owner_user_id,
          label: `>${marker.label}`,
          description: `Please  move here`,
          icon: "/destination-green.png"
        };
        // relocate the user's marker
        this.props.sendServer("user.locate", { id: marker.userId });

        // create a new marker as a destination
        this.props.sendServer("marker.add", destinationMarker);

        // post a message on the general channel to ask the user to move.
        // TODO this should be a private message. Consider implementing it as the user.move function?
        this.props.sendServer("channel_message.post", {
          sender_user_id: this.props.currentUserId,
          channel_id: this.props.generalChannelId,
          content: `@${marker.label} please move to >${marker.label}`
        });
        break;
      default:
        console.log("unexpected type", marker.type);
    }
  };
  // Circle events
  handleCircleClick = (circle, circleState) => {};
  // Circle events
  handleCircleRightClick = (circle, circleState) => {
    this.props.sendServer("circle.delete", circle);
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
  handleCircleRadiusChanged = (circle, circleState) => {};
  onMarkerComplete = e => {
    this.props.sendServer("marker.add", {
      lat: e.position.lat(),
      lng: e.position.lng(),
      type: "MARKER",
      label: `New`,
      description: `Please enter`,
      icon: "/avalanche1.png"
    });
    // TODO delete the marker
  };
  onPolygonComplete = e => {};
  onPolylineComplete = e => {};
  onRectangleComplete = e => {};
  onPlacesChanged = e => {};

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
          onCircleClick={this.handleCircleClick}
          onCircleRadiusChanged={this.handleCircleRadiusChanged}
          onCircleRightClick={this.handleCircleRightClick}
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
