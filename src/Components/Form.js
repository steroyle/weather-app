import React from "react"
import "./Form.css"

function Form(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <label>Show me the weather in</label>
      <input
        type="text"
        name="locationSearch"
        placeholder="Enter your town or city"
        className="location-search"
        onChange={props.handleChange}
      />
      <button className="submit">Search</button>
    </form>
  )
}

export default Form