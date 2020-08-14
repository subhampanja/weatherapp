import React, { useState } from 'react';
import './Weather.css';

const api = {
    key: "e9bda5168423e3322e38584b495319b2",
    base: "https://api.openweathermap.org/data/2.5/"
}

const Weather = () => {
    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});

    const onButtonPress = async () => {
        if(query === ""){

        }
        else{
            await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result);
                setQuery("");
            });
        }
    }

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "july", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    return (
        <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 20) ? "app warm" : "app") : "app"}>
            <div className="app_main">
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="City Name..."
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                    />
                    <div className="searchMain">
                        <button className="searchBtn" onClick={() => onButtonPress()}>Find</button>
                    </div>
                </div>
                {(typeof weather.main != "undefined") ? (
                    <div>
                        <div className="location-box">
                            <div>
                                <h4 className="city">{weather.name}, {weather.sys.country}</h4>
                            </div>
                            <div>
                                <h4 className="date">{dateBuilder(new Date())}</h4>
                            </div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">
                                <h4 className="temp_real">{Math.round(weather.main.temp)}°c</h4>
                                <h4 className="weather_real">{weather.weather[0].main}</h4>
                            </div>
                        </div>
                    </div>
                ) : (<div></div>)}
            </div>
        </div>
    )
}

export default Weather
