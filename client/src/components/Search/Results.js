import React from "react";

export const Results = props =>
  <ul className="list-group">
    {props.results.map(result =>
      <li className="list-group-item" key={result.id}>
        <img alt={result.title} className="img-responsive" src={result.images.fixed_width_still.url} />
      </li>
    )}
  </ul>;