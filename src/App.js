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
      movies: [],
      currentURL: 'https://api.themoviedb.org/3/discover/movie?&with_genres=28&api_key=5dee9b99bfc124fbabfa815c9bb193ba',
      nextURL: '',
      page: 1,
      maxPage: 1

    };

    this.newSearch = this.newSearch.bind(this);
    this.genreChange = this.genreChange.bind(this);
    this.pageChange = this.pageChange.bind(this);
  }

  componentDidMount() {
    fetch(this.state.currentURL)
      .then(res => res.json())
      .then(resultObj => {
        let maxPage = resultObj.total_pages;
        let result = resultObj.results;
        let movies = result.map(movie => {
          return (
            <div className="movie col s6 m3 l2" key={movie.id}>
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.original_title} />
            </div>
          );
        });

        this.setState({ movies: movies, maxPage: maxPage });
      });
  }

  componentDidUpdate() {
    // console.log('updated')

    if (this.state.nextURL !== this.state.currentURL) {
      fetch(this.state.nextURL)
        .then(res => res.json())
        .then(resultObj => {

          let _maxPage = resultObj.total_pages;
          if (this.state.page === _maxPage) {
            let nextPageBTN = document.querySelector('#forward-button');
            nextPageBTN.classList.add('disabled', 'btn');
            // nextPageBTN.disabled = true;
          }
          else {
            let nextPageBTN = document.querySelector('#forward-button');
            nextPageBTN.classList.add('light-blue', 'btn');
            // nextPageBTN.disabled = false;
          }

          //update movies
          let result = resultObj.results;
          let movies = result.map(movie => {
            return (
              <div className="movie col s6 m3 l2" key={movie.id}>
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.original_title} />
              </div>
            );
          });

          this.setState({
            movies: movies,
            currentURL: this.state.nextURL,
            maxPage: _maxPage
          });
        });
    }
  }

  newSearch(keywords) {

    let currentURL = this.state.currentURL;

    // change directory
    let params = currentURL.substring(44);
    let _nextURL = `${this.state.baseURL}search/movie?${params}`;

    // reset page to 1
    let pstart = _nextURL.search('&page=');
    if (pstart !== -1) {
      pstart += 6;
      let pvalue = _nextURL.substring(pstart);

      let pend = pvalue.indexOf('&');
      pend = pstart + pend;
      _nextURL = _nextURL.substring(0, pstart) + '1' + _nextURL.substring(pend);

    }
    else {
      pstart = _nextURL.search('/movie?');
      pstart += 7;
      _nextURL = _nextURL.substring(0, pstart) + '&page=1' + _nextURL.substring(pstart);
    }

    // write query to url
    let start = _nextURL.search('&query=');
    if (start !== -1) {
      start += 7;
      _nextURL = _nextURL.substring(0, start);
      _nextURL += keywords
    }
    else {
      _nextURL += `&query=${keywords}`;
    }

    // remove genre 
    let gstart = _nextURL.search('with_genres=');
    if (gstart !== -1) {
      let gvalue = _nextURL.substring(gstart);
      let gend = gvalue.indexOf('&');
      gend = gstart + gend;
      _nextURL = _nextURL.substring(0, gstart - 1) + _nextURL.substring(gend);
    }

    this.setState({ nextURL: encodeURI(_nextURL), page: 1 });
  }

  genreChange(genreID) {
    let nextPageBTN = document.querySelector('#forward-button');
    nextPageBTN.classList.remove('disabled');
    nextPageBTN.classList.add('grey', 'darken-4', 'btn');
    let nextPageI = document.querySelector('#forward-button i');
    nextPageI.classList.add('material-icons', 'white-text');
    let searchText = document.querySelector('.search');
    searchText.placeholder = '';

    let currentURL = this.state.currentURL;
    let _nextURL;

    // change directory
    let dir = 'https://api.themoviedb.org/3/discover/movie?';
    if (this.state.currentURL.substring(0, 42) === 'https://api.themoviedb.org/3/search/movie?') {
      currentURL = dir + currentURL.substring(42)
    }

    // reset page to 1
    let pstart = currentURL.search('&page=');
    if (pstart !== -1) {
      pstart += 6;
      let pvalue = currentURL.substring(pstart);

      let pend = pvalue.indexOf('&');
      pend = pstart + pend;
      _nextURL = currentURL.substring(0, pstart) + '1' + currentURL.substring(pend);

    }
    else {
      pstart = currentURL.search('/movie?');
      pstart += 7;
      _nextURL = currentURL.substring(0, pstart) + '&page=1' + currentURL.substring(pstart);
    }

    let start = _nextURL.search('&with_genres=');
    if (start !== -1) {
      // update genreID
      start += 13;
      let value = _nextURL.substring(start);
      let end = value.indexOf('&');
      end = start + end;
      _nextURL = _nextURL.substring(0, start) + genreID + _nextURL.substring(end);
    }
    // add genreID
    else {
      start = _nextURL.search('/movie?');
      start += 7;
      _nextURL = _nextURL.substring(0, start) + '&with_genres=' + genreID + _nextURL.substring(start);
    }

    // remove query
    let qstart = _nextURL.search('&query=');
    if (qstart !== -1) {
      _nextURL = _nextURL.substring(0, qstart);
    }

    this.setState({ nextURL: encodeURI(_nextURL), page: 1 });
  }

  pageChange(page) {
    console.log(page)

    if (page === this.state.maxPage) {
      //disable forward button if only page of results
      let nextPageI = document.querySelector('#forward-button i');
      nextPageI.classList.remove('white-text');
      nextPageI.classList.add('grey-text', 'darken-2');
      let nextPageBTN = document.querySelector('#forward-button');
      nextPageBTN.classList.add('btn', 'disabled');
      return;
    }
    else {
      let nextPageBTN = document.querySelector('#forward-button');
      nextPageBTN.classList.remove('disabled');
      nextPageBTN.classList.add('grey', 'darken-4', 'btn');
      let nextPageI = document.querySelector('#forward-button i');
      nextPageI.classList.add('material-icons', 'white-text');
      let currentURL = this.state.currentURL;
      let _nextURL;

      let start = currentURL.search('page=');
      if (start !== -1) {
        start += 5;
        let value = currentURL.substring(start);
        let end = value.indexOf('&');
        end = start + end;
        _nextURL = currentURL.substring(0, start) + page + currentURL.substring(end);
      }
      else {
        let insertionPoint = currentURL.search('/movie?');
        insertionPoint += 7;
        // insertionPoint += 21;
        _nextURL = currentURL.substring(0, insertionPoint) + '&page=' + page + currentURL.substring(insertionPoint);
      }

      this.setState({ nextURL: encodeURI(_nextURL), page: page });
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
      // grey darken-4
      <div className="App grey darken-4">


        <nav>
          <div className="nav-wrapper grey darken-3">
            <div className="row">
              <div className="col s1 m4 l6">
                <a href="/" className="light-blue-text left"><i className="material-icons">graphic_eq</i></a>
              </div>
              <div className="col s4 m3 l2">
                <div id="genre-select" className="input-field">
                  <GenreMenu
                    genreChange={this.genreChange}
                    pageChange={this.pageChange}
                  ></GenreMenu>
                </div>
              </div>
              <SearchBar
                newSearch={this.newSearch}
              ></SearchBar>
            </div>
          </div>
        </nav>
        <Pagination
          pageChange={this.pageChange}
          page={this.state.page}
        ></Pagination>

        <div className="row">
          {this.state.movies}
        </div>








        {/* <nav>
          <div className="nav-wrapper">
            <div className="row">
              <div className="col s1">
                <a href="/" className="brand-logo">Logo</a>
              </div>
              <div className="col s2">
                <SearchBar
                  newSearch={this.newSearch}
                ></SearchBar>
              </div>
              <div className="col s5">
                <GenreMenu
                  genreChange={this.genreChange}
                  pageChange={this.pageChange}
                ></GenreMenu>
              </div>
            </div>
          </div>

        </nav>



       
        {this.state.movies} */}
      </div>
    );
  }
}



export default Movie8r;
