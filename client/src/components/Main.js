import React, { Component } from "react";
import SearchBar from "./Searchbar";
import ResturantList from "./RestaurantList";
import { fetchLocationByZipCode } from "../api/FetchLocationByZipCode";
import { fetchResturantList } from "../api/FetchResturantList";
import ToggleListButton from "./ToggleListButton";

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
  executeSearch = zip => {
    fetchLocationByZipCode(zip)
      .then(data => {
        const city = data.results.map(item => item.formatted_address);
        const lat = data.results.map(item => item.geometry.location.lat);
        const lng = data.results.map(item => item.geometry.location.lng);
        fetchResturantList(lat, lng).then(res => {
          this.setState({
            cityTitle: city,
            resturantData: res.results
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
  };

  toggleList = () => {
    this.setState(prevState => {
      return {
        searchTab: !prevState.searchTab
      };
    });
  };

  render() {
    console.log(this.state, "state");
    const {
      resturantData,
      cityTitle,
      visitedResturants,
      searchTab
    } = this.state;
    return (
      <div className="container">
        <SearchBar
          submitZipCode={this.executeSearch}
          renderSearchList={this.toggleList}
          isSearchTabActive={searchTab}
        />
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
    );
  }
}

export default Main;
