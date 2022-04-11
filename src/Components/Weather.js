import React, {useEffect} from 'react';
import {useWeather} from "../Context/WeatherContext";
import axios from "axios";
import {Card} from "react-bootstrap";
import {useCity} from "../Context/CityContext";

function Weather() {
    const {weathers, setWeathers} = useWeather();
    const {city} = useCity();
    useEffect(()=>{
        getCoordinate()
    },[city])

    const getCoordinate = async () => {
        await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=tr&appid=4c87fdde1f3bfe4993325a6ae948e319`)
            .then((res) => {
                getWeatherData(res.data.coord.lon,res.data.coord.lat)
            }
        )
    }

    const getWeatherData = async (lon,lat) => {
        await axios(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,minutely,current&lang=tr&appid=4c87fdde1f3bfe4993325a6ae948e319`)
            .then((res) => {
                  setWeathers(res.data.daily)
            })
    }

    return (
        <>

            {weathers.map((weather,i)=>(

                    <Card key={i} style={{ width: '9.5rem' }}>
                        <Card.Body>
                            <Card.Title>   {new Date(weather.dt * 1000).toLocaleString("tr-TR", {
                                weekday: "long"
                            })}</Card.Title>
                            <Card.Img variant="top" src={"https://openweathermap.org/img/wn/"+weather.weather[0].icon+"@2x.png"} />

                            <Card.Text>
                                {weather.temp.day + "°"}
                                &ensp;
                                {weather.clouds + "°"}
                                <br/>
                                <span>
                                    {weather.weather[0].description.toLowerCase()}
                                </span>

                            </Card.Text>
                        </Card.Body>
                    </Card>
                )
            )}
            <br/>
        </>
    );
}

export default Weather;