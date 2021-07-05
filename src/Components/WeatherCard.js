import React from "react"
import "./WeatherCard.css"

class WeatherCard extends React.Component {
  constructor(props) {
    super()

    this.state = {

    }
  }
  render() {

    const date = new Date(this.props.item.dt * 1000)
    const weekday = date.toLocaleDateString('en-UK', { weekday: 'long' }); // e.g. Tuesday
    const formattedDate = date.toLocaleDateString('en-UK', { day: 'numeric', month: 'numeric', year: 'numeric'}); // e.g. Tuesday

    const iconUrl = "./" + this.props.item.weather[0].icon + ".png"

    return (
      <div className="card">
        <img
          src={iconUrl}
          alt={this.props.item.weather[0].main + " - " +this.props.item.weather[0].description}
          title={this.props.item.weather[0].main + " - " +this.props.item.weather[0].description}
          width="100"
          height="100"
        />
        <h3>{weekday}</h3>
        <p>{formattedDate}</p>
      </div>
    )
  }
}

export default WeatherCard