const env = require('../env.json')

const request  = require('postman-request');
const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${env.FORECAST_ACCESSKEY}&query=${latitude},${longitude}`
    request({ url, json: true}, (error, {body} = {})=> {
        if(error){
            callback('Unable to connect to weather service!');
        } else if (body.error) {
            callback('Unable to find location!');
            console.log(body.error);
        } else {
            callback(undefined,`It is currently ${body.current.temperature} degrees, feels like ${body.current.feelslike} degrees. The Humidity is ${body.current.humidity}% and the precipitation is ${body.current.precip}. The data was observed at ${body.current.observation_time}.`);
        }
    });
};

module.exports = forecast;