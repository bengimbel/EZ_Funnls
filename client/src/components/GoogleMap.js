import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class GoogleMap extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.cityName !== nextProps.cityName) {
      return true;
    }
    return false;
  }
  render() {
    const { google, lat, lng, cityName } = this.props;

    return (
      <div className="container">
        <div className="row">{cityName}</div>
        <div className="row">
          <Map
            google={google}
            zoom={11}
            style={styles.mapStyle}
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
  apiKey: process.env.REACT_APP_API_KEY
})(GoogleMap);

const styles = {
  mapStyle: {
    width: "500px",
    height: "300px"
  }
};
