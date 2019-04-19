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
    const { google, lat, lng, cityName } = this.props;
    return (
      <div className="container">
        <div className="row">{cityName}</div>
        <div className="row">
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
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: API_KEY
})(GoogleMap);
