import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

class Map extends Component {
  render() {
    const markers = this.props.slapMap.markers || [];
    this.props.users.forEach(user =>
      markers.push({
        label: user.name,
        position: user.position
      })
    );
    console.log("Markers", markers);

    return (
      <GoogleMap
        defaultZoom={this.props.slapMap.defaultZoom}
        defaultCenter={this.props.slapMap.defaultCenter}
      >
        {markers.map((marker, index) => <Marker {...marker} />)}
      </GoogleMap>
    );
  }
}

export default withGoogleMap(Map);
