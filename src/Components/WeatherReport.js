import React from "react"
import WeatherCard from "./WeatherCard"
import "./WeatherReport.css"

function WeatherReport(props) {

  // check if we have any weather data to display
  let weatherCards = null

  if(props.weatherData) {
    weatherCards = props.weatherData.map(item => <WeatherCard key={item.dt} item={item}/>)
  }
  return (
    <div className="weather-report">
      {weatherCards}
    </div>
  )
}

export default WeatherReport