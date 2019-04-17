import React from "react";
import ResturantItem from "./ResturantItem";

const RestaurantList = props => {
  const { resturantData, cityName, visitedResturants } = props;
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
};

export default RestaurantList;
