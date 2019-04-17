import React, { Component } from "react";
import SearchBar from "./components/Searchbar";
import ResturantList from "./components/RestaurantList";
import { fetchLocationByZipCode } from "./api/FetchLocationByZipCode";
import { fetchResturantList } from "./api/FetchResturantList";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resturantData: null,
      cityInfo: null
    };
  }

  executeSearch = zip => {
    fetchLocationByZipCode(zip)
      .then(data => {
        const city = data.results.map(item => item.formatted_address);
        const lat = data.results.map(item => item.geometry.location.lat);
        const lng = data.results.map(item => item.geometry.location.lng);
        fetchResturantList(lat, lng).then(res => {
          this.setState({
            cityInfo: city,
            resturantData: res.results
          });
        });
      })
      .catch(err => console.log(err, "err"));
  };

  render() {
    console.log(this.state, "state");
    const { resturantData } = this.state;
    const { cityInfo } = this.state;
    return (
      <div className="App">
        <div className="container">
          <SearchBar submitZipCode={this.executeSearch} />
          <ResturantList resturantData={resturantData} cityName={cityInfo} />
        </div>
      </div>
    );
  }
}

export default App;
