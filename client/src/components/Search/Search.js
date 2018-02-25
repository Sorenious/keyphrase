import React from "react";
import "./Search.css";

export const Search = props =>
  <form>
    <div className="form-group">
      <label htmlFor="search">Choose board theme:</label>
      <input
        onChange={props.handleInputChange}
        value={props.search}
        name="search"
        type="text"
        className="form-control"
        placeholder="Search for a Gif"
        id="search"
        style={{backgroundColor: props.colour}}
      />
        <button onClick={props.handleFormSubmit} className="btn btn-primary">
          Create Game
        </button>
    </div>
  </form>;
