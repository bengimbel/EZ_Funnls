import React from "react";
import ResturantItem from "./ResturantItem";

const RestaurantList = props => {
  const {
    resturantData,
    cityName,
    visitedResturants,
    renderSearchList
  } = props;

  if (renderSearchList) {
    return (
      <div>
        <h1>{cityName}</h1>
        {resturantData !== null &&
          resturantData.map(item => (
            <ResturantItem
              key={item.id}
              resturantData={item}
              saveResturant={props.saveResturant}
              visitedResturants={visitedResturants}
            />
          ))}
      </div>
    );
  } else {
    return (
      <div>
        <h1>{cityName}</h1>
        {visitedResturants !== null &&
          visitedResturants.map(item => (
            <ResturantItem
              key={item.id}
              resturantData={item}
              saveResturant={props.saveResturant}
              visitedResturants={visitedResturants}
            />
          ))}
      </div>
    );
  }
};

export default RestaurantList;
