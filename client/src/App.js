import React, { Component } from "react";
// import logo from "./logo.svg";
import SearchBar from "./components/Searchbar";
import { baseUrl, proxyurl, searchZipCodeUrl } from "./utils/Constants";
import { fetchLocationByZipCode } from "./api/FetchLocationByZipCode";
import "./App.css";

const API_KEY = `&key=${process.env.REACT_APP_API_KEY}`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInfo: null,
      data: null
    };
  }
  // componentDidMount() {
  //   const finalUrl = proxyurl + baseUrl + API_KEY;
  //   fetch(proxyurl + finalUrl)
  //     .then(res => {
  //       res
  //         .json()
  //         .then(data => {
  //           console.log(data, "data");
  //         })
  //         .catch(err => console.log(err, "errrr"));
  //     })
  //     .catch(err => console.log(err, "outsideERR"));
  // }

  searchByZipCode = zip => {
    const url = searchZipCodeUrl + zip + API_KEY;
    let locationData = {};
    fetchLocationByZipCode(url)
      .then(data => {
        data.results.map(item => {
          locationData.title = item.formatted_address;
          locationData.latitude = item.geometry.location.lat;
          locationData.longitude = item.geometry.location.lng;
        });
        this.setState({
          searchInfo: locationData
        });
      })
      .catch(err => console.log(err, "err"));
  };

  render() {
    console.log(this.state, "state");
    return (
      <div className="App">
        <div className="container">
          <SearchBar getData={this.searchByZipCode} />
        </div>
      </div>
    );
  }
}

export default App;
