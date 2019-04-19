import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
  width: "500px",
  height: "300px"
};
const API_KEY = process.env.REACT_APP_API_KEY;
class GoogleMap extends Component {
  render() {
    console.log(this.props, "props");
    const { google, lat, lng } = this.props;
    return (
      <div className="container">
        <Map
          google={google}
          zoom={11}
          style={mapStyles}
          center={{
            lat: lat,
            lng: lng
          }}
        >
          <Marker position={{ lat: lat, lng: lng }} />
        </Map>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: API_KEY
})(GoogleMap);
