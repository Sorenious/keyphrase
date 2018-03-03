import React from "react";
import "./Search.css";

export const Search = props =>
  <form>
    <div className="form-group" id="search">
      <label htmlFor="search">Choose board theme:</label>
      <input
        onChange={props.handleInputChange}
        value={props.search}
        name="search"
        type="text"
        className="form-control"
        placeholder="Choose a theme for your board"
      />
        <button onClick={props.handleFormSubmit} className="btn btn-primary">
          Create Game
        </button>
    </div>
  </form>;
