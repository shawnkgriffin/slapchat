import React, { Component } from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 50.093284, lng: -122.934940 }}
    >
      {props.isMarkerShown && <Marker position={{ lat: 50.059167, lng: -122.956944 }} /> }
      {props.markers.map((marker) => <Marker {...marker} />)}
    </GoogleMap>
  )
)
class Map extends Component {
  render() {
    const markers = this.props.slapMap.markers || [];
    this.props.users.forEach(user =>
      markers.push({
        label: user.name,
        position: user.position
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
          markers = {markers}
        />
      </div>
    )
  }
}

export default Map;
