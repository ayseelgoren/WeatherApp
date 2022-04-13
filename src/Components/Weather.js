import React, { useEffect, useState } from "react";
import { useWeather } from "../Context/WeatherContext";
import axios from "axios";
import { Card } from "react-bootstrap";
import { useCity } from "../Context/CityContext";

function Weather() {
  const { weathers, setWeathers } = useWeather();
  const { city } = useCity();
  const [show, setShow] = useState(false);

  useEffect(() => {
    function getCoordinateUrl() {
      return `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=tr&appid=5f05a8a95cdc6832fe3ac15e25ab1397`;
    }
    async function getCoordinate() {
      await axios(getCoordinateUrl())
        .then((res) => {
          setShow(false);
          getWeatherData(res.data.coord.lon, res.data.coord.lat);
        })
        .catch((err) => {
          setShow(true);
        });
    }
    async function getWeatherData(lon, lat) {
      await axios(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,minutely,current&lang=tr&appid=5f05a8a95cdc6832fe3ac15e25ab1397`
      )
        .then((res) => {
          setShow(false);
          setWeathers(res.data.daily);
        })
        .catch((err) => {
          setShow(true);
        });
    }
    getCoordinate();
  }, [city, setWeathers]);

  return (
    <>
      {show === true && (
        <div className="alert alert-danger" role="alert">
          The request limit has been reached.
        </div>
      )}

      {weathers.map((weather, i) => (
        <Card key={i} style={{ width: "9.5rem" }}>
          <Card.Body>
            <Card.Title>
              {" "}
              {new Date(weather.dt * 1000).toLocaleString("tr-TR", {
                weekday: "long",
              })}
            </Card.Title>
            <Card.Img
              variant="top"
              src={
                "https://openweathermap.org/img/wn/" +
                weather.weather[0].icon +
                "@2x.png"
              }
            />

            <Card.Text>
              {weather.temp.day + "°"}
              &ensp;
              {weather.clouds + "°"}
              <br />
              <span>{weather.weather[0].description.toLowerCase()}</span>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
      <br />
    </>
  );
}

export default Weather;
