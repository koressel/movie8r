import React from 'react';
import ReactDOM from 'react-dom';
// import logo from './logo.svg';
import './App.css';
import SearchBar from './components/searchbar';
import GenreMenu from './components/genremenu';
import MovieDisplay from './components/moviedisplay';
import Pagination from './components/pagination';

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
    this.pageChange = this.pageChange.bind(this);
  }

  newSearch(_searchWords) {
    this.setState({ searchWords: _searchWords });
  }

  genreChange(_genre) {
    this.setState({ genre: _genre });
    this.pageChange(1);
  }

  pageChange(_page) {
    this.setState({ page: _page });
  }

  render() {
    return (
      <div className="movie8r">

      /*
      *
      **********************************************************************************************
      *                                                                                            *
      * Pagination needs to be a child of the moviedisplay component w/ multidirectional data flow *
      *                                                                                            *
      **********************************************************************************************
      *
      */

        <Pagination pageChange={this.pageChange}></Pagination>

        <SearchBar newSearch={this.newSearch}></SearchBar>

        <GenreMenu genreChange={this.genreChange}></GenreMenu>

        <MovieDisplay
          searchWords={this.state.searchWords}
          genre={this.state.genre}
          page={this.state.page}
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
