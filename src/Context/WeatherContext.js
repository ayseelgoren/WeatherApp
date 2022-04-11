import {createContext, useContext, useState} from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({children}) => {
    const [weathers, setWeathers] = useState([]);

    const values = {weathers, setWeathers};
    return (<WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>);
}

export const useWeather = () => useContext(WeatherContext);