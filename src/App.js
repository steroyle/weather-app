import React from 'react';
import './App.css';
import Form from './Components/Form'
import WeatherReport from "./Components/WeatherReport"

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      locationSearch: "",
      lat: null,
      lng: null,
      isLocationFound: false,
      weatherData: [],
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit(event) {
    event.preventDefault()
    if(this.state.locationSearch) {
      const url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + this.state.locationSearch + "&key=" + process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      fetch(url)
      .then(response => response.json())
      .then(data => {
        // Google Maps data successfully received
        if(data.status === "OK") {
          this.setState({
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng,
            isLocationFound: true,
          })
          this.getWeatherReport()
        }
        // The location string entered by the user failed to be geocoded into lat/lng co-ors
        else {
          this.setState({
            lat: null,
            lng: null,
            isLocationFound: false,
          })
        }
      })
      .catch(err => { throw err })
    }
  }

  getWeatherReport() {
    const url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + this.state.lat + "&lon=" + this.state.lng + "&exclude=current,minutely,hourly,alerts&appid=" + process.env.REACT_APP_WEATHER_API_KEY

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          weatherData: data['daily'],
          errorMessage: data['message'],
        })
      })
      .catch(err => { throw err })
  }

  render() {
    let weatherReport

    if(this.state.isLocationFound) {
      weatherReport = <WeatherReport weatherData={this.state.weatherData} />
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1>Weather App</h1>
          <p className="author">by Ste Royle</p>
          <Form handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
          { weatherReport }
        </header>
      </div>
    )
  }
}

export default App;
