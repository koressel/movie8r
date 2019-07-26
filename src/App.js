import React from 'react';
import ReactDOM from 'react-dom';
// import logo from './logo.svg';
import './App.css';
import SearchBar from './components/searchbar';
import GenreMenu from './components/genremenu';
import MovieDisplay from './components/moviedisplay';

class Movie8r extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchWords: "300",
      genre: '',
      page: 1
    };

    this.newSearch = this.newSearch.bind(this);
    this.genreChange = this.genreChange.bind(this);
  }

  newSearch(searchWords) {
    this.setState({ searchWords: searchWords });
  }

  genreChange(genre) {
    this.setState({ genre: genre });
  }

  render() {
    return (
      <div className="movie8r">

        <SearchBar newSearch={this.newSearch}></SearchBar>

        <GenreMenu genreChange={this.genreChange}></GenreMenu>

        <MovieDisplay
          searchWords={this.state.searchWords}
          genre={this.state.genre}
        >
        </MovieDisplay>

      </div>
    )
  }
}

ReactDOM.render(
  <Movie8r />,
  document.getElementById('root')
);

export default Movie8r;
