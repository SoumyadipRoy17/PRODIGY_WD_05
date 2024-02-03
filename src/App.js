import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=f94d369afe6670912954292c66fe5e78`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      console.log(process.env.API_KEY);
      axios
        .get(url)
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          setLocation("");
        });

      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onKeyDown={searchLocation}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
          type="text"
        ></input>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data ? data.name : "Bangalore"}</p>
          </div>
          <div className="temp">
            <h1> {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}</h1>
          </div>
          <div className="description">
            <p>{data.weather ? <p>{data.weather[0].main}</p> : null}</p>
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              <p className="bold">
                {data.main ? (
                  <p className="bold">{data.main.feels_like.toFixed()}°F</p>
                ) : null}
              </p>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p className="bold">
                {data.main ? <p>{data.main.humidity}</p> : null}
              </p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">
                {data.wind ? (
                  <p className="bold">{data.wind.speed}MPH</p>
                ) : null}
              </p>
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
