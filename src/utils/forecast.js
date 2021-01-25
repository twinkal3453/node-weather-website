const request = require("postman-request");

const forecast = (adress, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=73244cd3d4c8fc05b271b5c92dd29cd8&query=${adress}&units=m`;
  //console.log(url);
  //write url, instead of url: url because we can write url instead of url: url and used body instead of response without curlibraces
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (body.error) {
      callback("Unable to find location!, try another search.", undefined);
    } else {
      callback(undefined, {
        status: `${body.current.weather_descriptions[0]}`,
        temp: `${body.current.temperature} `,
        feels: `${body.current.feelslike}`,
        location: `${body.location.region},${body.location.country}`,
      });
    }
  });
};

module.exports = forecast;
