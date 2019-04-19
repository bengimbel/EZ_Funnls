import React, { Component } from "react";
import SearchBar from "./Searchbar";
import ResturantList from "./RestaurantList";
import { fetchLocationByZipCode } from "../api/FetchLocationByZipCode";
import { fetchResturantList } from "../api/FetchResturantList";
import ToggleListButton from "./ToggleListButton";
import GoogleMap from "./GoogleMap";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resturantData: null,
      cityTitle: null,
      visitedResturants: [],
      searchTab: true
    };
  }

  componentDidMount = () => {
    this.loadStateWithLocalStorage();
  };

  executeSearch = zip => {
    fetchLocationByZipCode(zip)
      .then(data => {
        const city = data.results.map(item => item.formatted_address);
        const lat = data.results.map(item => item.geometry.location.lat);
        const lng = data.results.map(item => item.geometry.location.lng);
        fetchResturantList(lat, lng).then(res => {
          this.setState({
            cityTitle: city,
            resturantData: res.results,
            lat: lat,
            lng: lng
          });
        });
      })
      .catch(err => console.log(err, "err"));
  };

  saveResturantToVisitList = resturant => {
    const { visitedResturants } = this.state;
    const newList = [...visitedResturants];
    if (newList.filter(item => item.id === resturant.id).length > 0) {
      console.log("already in favorites");
      return;
    }
    newList.unshift(resturant);
    this.setState({
      visitedResturants: newList
    });

    localStorage.setItem("visitedResturants", JSON.stringify(newList));
  };

  toggleList = () => {
    this.setState(prevState => {
      return {
        searchTab: !prevState.searchTab
      };
    });
  };

  loadStateWithLocalStorage = () => {
    const keyName = "visitedResturants";
    if (localStorage.hasOwnProperty(keyName)) {
      let value = localStorage.getItem(keyName);
      value = JSON.parse(value);
      this.setState({ visitedResturants: value });
    }
  };

  render() {
    console.log(this.state, "state");
    const {
      resturantData,
      cityTitle,
      visitedResturants,
      searchTab,
      lat,
      lng
    } = this.state;

    return (
      <div className="container">
        <div className="row" style={styles.searchBar}>
          <div className="col">
            <SearchBar
              submitZipCode={this.executeSearch}
              renderSearchList={this.toggleList}
              isSearchTabActive={searchTab}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <GoogleMap lat={lat} lng={lng} />
          </div>
          <div className="col">
            <ToggleListButton
              switchSearchTerm={this.toggleList}
              searchTabTitle={searchTab}
            />
            <ResturantList
              resturantData={resturantData}
              cityName={cityTitle}
              saveResturant={this.saveResturantToVisitList}
              visitedResturants={visitedResturants}
              renderSearchList={searchTab}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;

const styles = {
  searchBar: {
    marginBottom: "20px"
  }
};
