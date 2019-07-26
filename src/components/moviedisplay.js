import React from "react";

class MovieDisplay extends React.Component {
  render() {
    return (
      <div id="movie-display">
        <p>Genre: {this.props.genre}</p>
        <p>Search Words: {this.props.searchWords}</p>
      </div>
    )
  }
}

export default MovieDisplay;