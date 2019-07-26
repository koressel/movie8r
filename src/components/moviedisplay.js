import React from "react";

class MovieDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      APIKEY: '5dee9b99bfc124fbabfa815c9bb193ba',
      baseURL: 'https://api.themoviedb.org/3/',
      movies: []

    };
  }

  componentDidMount() {
    let url = `${this.state.baseURL}discover/movie?&api_key=${this.state.APIKEY}`;

    fetch(url)
      .then(res => res.json())
      .then(resultObj => {
        let result = resultObj.results;

        let movies = result.map(movie => {
          return (
            <div className="movie" key={movie.id}>
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.original_title} />
            </div>
          );
        });

        this.setState({ movies: movies });
      });
  }

  render() {
    return (
      <div id="movie-display">
        {this.state.movies}
        <p>Genre: {this.props.genre}</p>
        <p>Search Words: {this.props.searchWords}</p>
      </div>
    )
  }
}

export default MovieDisplay;