import React from 'react';
import './App.css';
import SearchBar from './components/searchbar';
import GenreMenu from './components/genremenu';
import Pagination from './components/pagination';

class Movie8r extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      APIKEY: '5dee9b99bfc124fbabfa815c9bb193ba',
      baseURL: 'https://api.themoviedb.org/3/',
      currentGenre: 'Action',
      nextGenre: 'Action',
      movies: [],
      currentPage: 1,
      nextPage: 1,
      currentSearchWords: '',
      nextSearchWords: '',
      currentURL: 'https://api.themoviedb.org/3/discover/movie?&with_genres=28&api_key=5dee9b99bfc124fbabfa815c9bb193ba',
      nextURL: ''

    };

    this.newSearch = this.newSearch.bind(this);
    this.genreChange = this.genreChange.bind(this);
    this.pageChange = this.pageChange.bind(this);
  }

  componentDidMount() {
    fetch(this.state.currentURL)
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
    console.log('updated')

    if (this.state.nextURL !== this.state.currentURL) {
      fetch(this.state.nextURL)
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

          this.setState({ movies: movies, currentURL: this.state.nextURL });
        });
    }

    //   let genre = this.getGenreID(this.state.nextGenre);
    //   let url;

    //   if (this.state.currentGenre !== this.state.nextGenre) {
    //     url = `${this.state.baseURL}discover/movie?with_genres=${genre}&api_key=${this.state.APIKEY}`;

    //     fetch(url)
    //       .then(res => res.json())
    //       .then(resultObj => {
    //         let result = resultObj.results;
    //         let movies = result.map(movie => {
    //           return (
    //             <div className="movie" key={movie.id}>
    //               <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.original_title} />
    //             </div>
    //           );
    //         });

    //         this.setState({ movies: movies, currentGenre: this.state.nextGenre });
    //         return;
    //       });
    //   }
    //   else {
    //     if (this.state.currentPage !== this.state.nextPage) {
    //       let genre = this.getGenreID(this.state.currentGenre);
    //       url = `${this.state.baseURL}discover/movie?with_genres=${genre}&page=${this.state.nextPage}&api_key=${this.state.APIKEY}`;

    //       fetch(url)
    //         .then(res => res.json())
    //         .then(resultObj => {
    //           let result = resultObj.results;
    //           let movies = result.map(movie => {
    //             return (
    //               <div className="movie" key={movie.id}>
    //                 <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.original_title} />
    //               </div>
    //             );
    //           });
    //           this.setState({ movies: movies, currentPage: this.state.nextPage });
    //         });
    //     }
    //     else {
    //       if (this.state.currentSearchWords !== this.state.nextSearchWords) {
    //         url = `${this.state.baseURL}search/movie?&api_key=${this.state.APIKEY}&query=${this.state.nextSearchWords}`;

    //         fetch(url)
    //           .then(res => res.json())
    //           .then(resultObj => {
    //             let result = resultObj.results;
    //             console.log(resultObj);
    //             let movies = result.map(movie => {
    //               return (
    //                 <div className="movie" key={movie.id}>
    //                   <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.original_title} />
    //                 </div>
    //               );
    //             });
    //             this.setState({ movies: movies, currentSearchWords: this.state.nextSearchWords });
    //           });
    //       }

    //     }
    //   }
  }

  newSearch(_nextSearchWords) {
    this.setState({ nextSearchWords: _nextSearchWords });
  }

  genreChange(genreID) {
    let currentURL = this.state.currentURL;
    let start = currentURL.search('&with_genres=');
    start += 13;
    let value = currentURL.substring(start);
    let end = value.indexOf('&');
    end = start + end;

    let _nextURL = currentURL.substring(0, start) + genreID + currentURL.substring(end);
    this.setState({ nextURL: _nextURL });
  }

  pageChange(_nextPage) {
    this.setState({ nextPage: _nextPage });
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
      <div className="App" >
        <SearchBar
          newSearch={this.newSearch}
        ></SearchBar>
        <GenreMenu
          genreChange={this.genreChange}
          pageChange={this.pageChange}
        ></GenreMenu>
        <Pagination
          pageChange={this.pageChange}
          currentPage={this.state.page}
          page={this.state.currentPage}
        ></Pagination>
        {this.state.movies}
      </div>
    );
  }
}



export default Movie8r;
