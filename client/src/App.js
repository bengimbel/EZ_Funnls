import React, { Component } from "react";
import SearchBar from "./components/Searchbar";
import { fetchLocationByZipCode } from "./api/FetchLocationByZipCode";
import { fetchResturantList } from "./api/FetchResturantList";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInfo: null,
      resturantData: null
    };
  }

  executeSearch = zip => {
    let locationData = {};
    fetchLocationByZipCode(zip)
      .then(data => {
        locationData.city = data.results.map(item => item.formatted_address);
        locationData.lat = data.results.map(item => item.geometry.location.lat);
        locationData.lng = data.results.map(item => item.geometry.location.lng);
        fetchResturantList(locationData.lat, locationData.lng).then(res => {
          this.setState({
            searchInfo: locationData,
            resturantData: res.results
          });
        });
      })
      .catch(err => console.log(err, "err"));
  };

  render() {
    console.log(this.state, "state");
    return (
      <div className="App">
        <div className="container">
          <SearchBar submitZipCode={this.executeSearch} />
        </div>
      </div>
    );
  }
}

export default App;
