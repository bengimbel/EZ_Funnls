const API_KEY = process.env.REACT_APP_API_KEY;
export const proxyurl = "https://cors-anywhere.herokuapp.com/";
export const baseUrl = `${proxyurl}https://maps.googleapis.com/maps/api/place/nearbysearch/json?&key=${API_KEY}&radius=4000&types=restaurant&location=`;
export const searchZipCodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?&key=${API_KEY}&address=`;
