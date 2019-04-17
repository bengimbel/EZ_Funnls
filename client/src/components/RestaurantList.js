import React from "react";
import ResturantItem from "./ResturantItem";

const RestaurantList = props => {
  const { resturantData } = props;
  const { cityName } = props;
  return (
    <div>
      <h1>{cityName}</h1>
      {resturantData !== null &&
        resturantData.map(item => (
          <ResturantItem
            key={item.id}
            resturantData={item}
            saveResturant={props.saveResturant}
          />
        ))}
    </div>
  );
};

export default RestaurantList;
