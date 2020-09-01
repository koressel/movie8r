import React from "react";
import 'jquery';


class MovieInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movieId: '',
      title: '',
      backdrop_path: '',
      overview: '',
      release_date: '',
    };

    this.handleBackClick = this.handleBackClick.bind(this);
  }

  componentDidUpdate(e) {
    // Fetch movie data
    if (this.props.movieId !== 'default') {
      if (this.props.movieId !== this.state.movieId) {
        let movieUrl = `https://api.themoviedb.org/3/movie/${this.props.movieId}?api_key=5dee9b99bfc124fbabfa815c9bb193ba&language=en-US`;
        let _movieId = this.props.movieId

        fetch(movieUrl)
          .then(res => res.json())
          .then(resObj => {
            this.setState({
              movieId: _movieId,
              title: resObj.original_title, 
              backdrop_path: resObj.backdrop_path, 
              overview: resObj.overview,
              release_date: resObj.release_date,
            })
          });
      }
      }
  }

  handleBackClick(e) {
    this.props.backClicked(true);
  }

  render() {
    return (
      <div id="info">
        <button onClick={this.handleBackClick}><i className="fi-arrow-left white-text"></i></button><br/>
        <img src={`https://image.tmdb.org/t/p/w500${this.state.backdrop_path}`} />
        <h1>{this.state.title}</h1>
        <p>Released: {this.state.release_date}</p>
        <p>{this.state.overview}</p>
      </div>
    )
  }
}

export default MovieInfo;