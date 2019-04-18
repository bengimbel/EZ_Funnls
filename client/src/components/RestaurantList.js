import React from "react";
import ResturantItem from "./ResturantItem";

const RestaurantList = props => {
  const {
    resturantData,
    cityName,
    visitedResturants,
    renderSearchList
  } = props;
  const searchLocationTitle =
    resturantData !== null ? `Search Location: ${cityName}` : "";

  if (renderSearchList) {
    return (
      <div>
        <h3>{searchLocationTitle}</h3>

        {resturantData !== null &&
          resturantData.map(item => (
            <ResturantItem
              key={item.id}
              resturantData={item}
              saveResturant={props.saveResturant}
              visitedResturants={visitedResturants}
            />
          ))}

        {resturantData === null && (
          <h4>Seach by zip code to show a list of resturants.</h4>
        )}

        {resturantData !== null && resturantData.length === 0 && (
          <h4>Could not find resturants with that zip code.</h4>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <h3>Your List of Resturants</h3>
        {visitedResturants.length > 0 &&
          visitedResturants.map(item => (
            <ResturantItem
              key={item.id}
              resturantData={item}
              saveResturant={props.saveResturant}
              visitedResturants={visitedResturants}
            />
          ))}

        {visitedResturants.length <= 0 && (
          <h4>You have not saved any resturants to your list.</h4>
        )}
      </div>
    );
  }
};

export default RestaurantList;
