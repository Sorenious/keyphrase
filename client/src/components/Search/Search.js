import React, { Component } from "react";
import "./Search.css";

export class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: "",
      difficulty: ""
    };

    this.a = props;
  }

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  render()  {
    return <div>
      <div className="form-group" id="search">
        <label htmlFor="search">Choose board theme:</label>
        <input
          onChange={this.handleInputChange}
          value={this.search}
          name="search"
          type="text"
          className="form-control"
          placeholder="Choose a theme for your board"
          required="required"
        />
        <span>
          <input onClick={this.handleInputChange} type="radio" name="difficulty" value="16" />
          <label>Beginner (4x4)</label>
        </span>
        <span>
          <input onClick={this.handleInputChange} type="radio" name="difficulty" value="25" />
          <label>Veteran (5x5)</label>
        </span>
          <button onClick={e=>this.props.handleFormSubmit(e, this.state)} className="btn btn-primary">
            Create Game
          </button>
      </div>
    </div>;
  }
}