import { baseUrl } from "../utils/Constants";

export const fetchResturantList = (latitude, longitude) => {
  const url = baseUrl + latitude + "," + longitude;
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => {
        res
          .json()
          .then(data => {
            resolve(data);
          })
          .catch(err => console.log(err));
      })
      .catch(err => reject(err));
  });
};
