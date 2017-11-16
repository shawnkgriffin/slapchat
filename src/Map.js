import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"

class Map extends Component {
  render() {

    const markers = this.props.markers || []

    return (
      <GoogleMap defaultZoom={15} defaultCenter={{ lat: 49.2816939, lng: -123.1083755}}>
        {markers.map((marker, index) => (
          <Marker {...marker} />
        ))}
      </GoogleMap>
    )
  }
}

export default withGoogleMap(Map)
