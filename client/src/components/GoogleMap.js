import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class GoogleMap extends Component {
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.resturantData !== null &&
      nextProps.resturantData.length === 0
    ) {
      return false;
    }
    if (this.props.resturantData !== nextProps.resturantData) {
      return true;
    }

    return false;
  }

  renderMarkers = () => {
    const { resturantData } = this.props;
    if (resturantData !== null) {
      return resturantData.map(item => {
        return (
          <Marker
            key={item.id}
            position={{
              lat: item.geometry.location.lat,
              lng: item.geometry.location.lng
            }}
          />
        );
      });
    }
  };
  render() {
    const { google, lat, lng, cityName } = this.props;
    return (
      <div className="container">
        <div className="row">{cityName}</div>
        <div className="row">
          <Map
            google={google}
            zoom={13}
            style={styles.mapStyle}
            center={{
              lat: lat,
              lng: lng
            }}
          >
            {this.renderMarkers()}
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
    width: "95%",
    height: "300px"
  }
};
