import React from "react";


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
            let releaseDate = resObj.release_date;

            // format date
            let year = releaseDate.substr(0, releaseDate.indexOf('-'));
            let day = releaseDate.substr(releaseDate.length - 2, releaseDate.length);
            let month = releaseDate.substr(releaseDate.indexOf('-')+1, releaseDate.indexOf('-')-2);
            let formattedDate = `${month}/${day}/${year}`;

            this.setState({
              movieId: _movieId,
              title: resObj.original_title,
              backdrop_path: resObj.backdrop_path,
              overview: resObj.overview,
              release_date: formattedDate,
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
      <div class="grid-container">
        <div class="grid-x grid-margin-x">
          <div class="cell small-12">
            <button onClick={this.handleBackClick}><i className="fi-arrow-left white-text"></i></button><br />
            <img src={`https://image.tmdb.org/t/p/w500${this.state.backdrop_path}`} />
            <h1>{this.state.title}</h1>
            <p>Released: {this.state.release_date}</p>
            <p>{this.state.overview}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default MovieInfo;