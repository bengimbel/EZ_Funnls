import { searchZipCodeUrl } from "../utils/Constants";

export const fetchLocationByZipCode = zip => {
  const url = searchZipCodeUrl + zip;
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
