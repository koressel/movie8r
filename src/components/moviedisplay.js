import React from "react";
import { isGenericTypeAnnotation } from "@babel/types";

class MovieDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      APIKEY: '5dee9b99bfc124fbabfa815c9bb193ba',
      baseURL: 'https://api.themoviedb.org/3/',
      genre: '',
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

  componentDidUpdate() {
    if (this.props.genre !== this.state.genre) {
      let genre = this.getGenreID(this.props.genre);
      let url = `${this.state.baseURL}discover/movie?with_genres=${genre}&api_key=${this.state.APIKEY}`;

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
          this.setState({ movies: movies, genre: this.props.genre })

        });
    }
  }


  getGenreID(genre) {
    let id = 0;
    switch (genre) {
      case 'Action':
        id = 28;
        break;
      case 'Adventure':
        id = 12;
        break;
      case 'Animation':
        id = 16;
        break;
      case 'Comedy':
        id = 35;
        break;
      case 'Crime':
        id = 80;
        break;
      case 'Documentary':
        id = 99;
        break;
      case 'Drama':
        id = 18;
        break;
      case 'Family':
        id = 10751;
        break;
      case 'Fantasy':
        id = 14;
        break;
      case 'History':
        id = 36;
        break;
      case 'Horror':
        id = 27;
        break;
      case 'Music':
        id = 10402;
        break;
      case 'Mystery':
        id = 9648;
        break;
      case 'Romance':
        id = 10749;
        break;
      case 'Science Fiction':
        id = 878;
        break;
      case 'TV Movie':
        id = 10770;
        break;
      case 'Thriller':
        id = 53;
        break;
      case 'War':
        id = 10752;
        break;
      case 'Western':
        id = 37;
        break;
      default:
        id = 0;
    }

    return id;
  }

  render() {
    return (
      <div id="movie-display">
        {this.state.movies}
        {/* <p>Genre: {this.getGenreID(this.props.genre)}</p>
        <p>Search Words: {this.props.searchWords}</p> */}
      </div>
    )
  }
}

export default MovieDisplay;