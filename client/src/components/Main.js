import React, { Component } from "react";
import SearchBar from "./Searchbar";
import ResturantList from "./RestaurantList";
import { fetchLocationByZipCode } from "../api/FetchLocationByZipCode";
import { fetchResturantList } from "../api/FetchResturantList";
import ToggleListButton from "./ToggleListButton";
import GoogleMap from "./GoogleMap";
import { graphql, compose } from "react-apollo";
import { savedResturantList, addResturant } from "../queries/queries";

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

  //WHEN COMPONENT MOUNTS, INJECT THE PAGE WITH LOCAL STORAGE

  //   componentDidMount = () => {
  //     this.loadStateWithLocalStorage();
  //   };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.savedResturantList.savedResturants !==
      nextProps.savedResturantList.savedResturants
    ) {
      this.setState({
        visitedResturants: nextProps.savedResturantList.savedResturants.reverse()
      });
    }
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
            resturantData: res.results,
            lat: lat,
            lng: lng
          });
        });
      })
      .catch(err => console.log(err, "err"));
  };

  saveResturantToVisitList = resturant => {
    this.props.addResturant({
      variables: {
        id: resturant.id,
        name: resturant.name,
        vicinity: resturant.vicinity,
        rating: resturant.rating,
        lat: resturant.geometry.location.lat,
        lng: resturant.geometry.location.lng
      },
      refetchQueries: [{ query: savedResturantList }]
    });

    // COPY VISITIED RESTURANTS AND ADD RESTURANT TO LIST. SAVE TO STATE AND TO LOCAL STORAGE

    // const { visitedResturants } = this.state;
    // const newList = [...visitedResturants];
    // if (newList.filter(item => item.id === resturant.id).length > 0) {
    //   return;
    // }
    // newList.unshift(resturant);
    // this.setState({
    //   visitedResturants: newList
    // });
    // localStorage.setItem("visitedResturants", JSON.stringify(newList));
  };

  toggleList = () => {
    this.setState(prevState => {
      return {
        searchTab: !prevState.searchTab
      };
    });
  };

  // FUNCTION TO LOAD PAGE WITH LOCAL STORAGE

  //   loadStateWithLocalStorage = () => {
  //     const keyName = "visitedResturants";
  //     if (localStorage.hasOwnProperty(keyName)) {
  //       let value = localStorage.getItem(keyName);
  //       value = JSON.parse(value);
  //       this.setState({ visitedResturants: value });
  //     }
  //   };

  render() {
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
        <div className="row" style={styles.headerTitle}>
          <div className="col">
            <h1>EZ Funnls</h1>
          </div>
        </div>
        <div className="row" style={styles.headerSearchbar}>
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
            <GoogleMap
              lat={lat}
              lng={lng}
              cityName={cityTitle}
              resturantData={resturantData}
            />
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
export default compose(
  graphql(savedResturantList, { name: "savedResturantList" }),
  graphql(addResturant, { name: "addResturant" })
)(Main);

const styles = {
  headerTitle: {
    marginBottom: "20px",
    marginTop: "20px",
    textAlign: "center"
  },
  headerSearchbar: {
    marginBottom: "20px"
  }
};
