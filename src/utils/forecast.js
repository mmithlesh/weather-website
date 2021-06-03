const request = require("request");
const forecast = (lat, lon, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=15e610fa78a8e28720bc3a89597c39cc&query=" +
    lat +
    "," +
    lon;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to Weather AP I!");
    } else if (body.error) {
      callback("Unable to find the location !!");
    } else {
      callback(
        undefined,
        "The temperature is " +
          body.current.temperature +
          "⁰C, but it feels like " +
          body.current.feelslike +
          "⁰C"
      );
    }
  });
};

module.exports = forecast;
