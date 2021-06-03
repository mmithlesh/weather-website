const request = require("request")
const geocode = (address, callback) => {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibWl0aDU1NTUiLCJhIjoiY2tkMnJldGF6MWZ4NjJ1cGdlaDhmMGpuciJ9.3yv2z_ux7YwWFbxNHeFd6Q&limit=1";
    request({ url, json: true }, (error, response) => {
      if (error) {
        callback("Unable to connect to location services !!");
      } else if (response.body.features.length === 0) {
        callback("Unable to find location !");
      } else {
        const data ={
            latitude: response.body.features[0].center[1],
            longitude: response.body.features[0].center[0],
            location: response.body.features[0].place_name,
          }
        callback(undefined, data);
      }
    });
  };

  module.exports=geocode