import React from 'react';
import './App.css';
import SearchBar from './components/searchbar';
import GenreMenu from './components/genremenu';
import Pagination from './components/pagination';
import Install from './components/install';
import ColorMode from './components/colormode';


class Movie8r extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      APIKEY: '5dee9b99bfc124fbabfa815c9bb193ba',
      baseURL: 'https://api.themoviedb.org/3/',
      popularPosterElements: [],
      movieElements: [],
      currentURL: 'https://api.themoviedb.org/3/discover/movie?&api_key=5dee9b99bfc124fbabfa815c9bb193ba',
      nextURL: '',
      page: 1,
      maxPage: 1

    };

    this.handleMovieClick = this.handleMovieClick.bind(this);
    this.newSearch = this.newSearch.bind(this);
    this.genreChange = this.genreChange.bind(this);
    this.pageChange = this.pageChange.bind(this);
  }


  componentDidMount() {
    const $ = window.$;
    $(document).foundation();

    fetch(this.state.currentURL)
      .then(res => res.json())
      .then(resultObj => {
        if (this.state.page === 1) {
          let lastPageI = document.querySelector('#back-button i');
          lastPageI.classList.remove('white-text');
          lastPageI.classList.add('grey-text');
          let lastPageA = document.querySelector('#back-button');
          lastPageA.classList.add('disabled');
        }
        let maxPage = resultObj.total_pages;
        let result = resultObj.results;
        let backdropID = 1;
        let popularPosterElements = result.map(movie => {
          if (backdropID === 1) {
            return (
              <li className="is-active orbit-slide" key={backdropID}>
                <figure className="orbit-figure">
                  <img className="orbit-image" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="Space" />
                </figure>
              </li>
            );
          }
          else {
            return (
              <li className="orbit-slide" key={backdropID}>
                <figure className="orbit-figure">
                  <img className="orbit-image" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="Space" />
                </figure>
              </li>
            );
          }

        });
        let movieElements = result.map(movie => {
          return (
            <div className="movie cell small-4 medium-3 large-2" key={movie.id}>
              <img onClick={this.handleMovieClick} src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} id={movie.original_title} alt={movie.original_title} />
            </div>
          );
        });

        this.setState({ movieElements: movieElements, maxPage: maxPage, popularPosterElements: popularPosterElements });
      });
  }

  componentDidUpdate() {
    if (this.state.nextURL !== this.state.currentURL) {
      fetch(this.state.nextURL)
        .then(res => res.json())
        .then(resultObj => {
          let _maxPage = resultObj.total_pages;
          if (this.state.page === _maxPage) {
            let nextPageI = document.querySelector('#forward-button i');
            nextPageI.classList.remove('white-text');
            nextPageI.classList.add('grey-text');
            let nextPageA = document.querySelector('#forward-button');
            nextPageA.classList.add('disabled');
          }

          if (this.state.page === 1) {
            let lastPageI = document.querySelector('#back-button i');
            lastPageI.classList.remove('white-text');
            lastPageI.classList.add('grey-text');
            let lastPageA = document.querySelector('#back-button');
            lastPageA.classList.add('disabled');
          }
          else {
            let lastPageI = document.querySelector('#back-button i');
            lastPageI.classList.remove('grey-text');
            lastPageI.classList.add('white-text');
            let lastPageA = document.querySelector('#back-button');
            lastPageA.classList.remove('disabled');
          }

          //update movies
          let result = resultObj.results;
          let movieElements = result.map(movie => {
            return (
              <div className="movie cell small-4 medium-3 large-2" key={movie.id}>
                <img onClick={this.handleMovieClick} src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} id={movie.original_title} alt={movie.original_title} />
              </div>
            );
          });

          this.setState({
            movieElements: movieElements,
            currentURL: this.state.nextURL,
            maxPage: _maxPage
          });
        });
    }
  }

  handleMovieClick(e) {
    let title = e.target.id;
    title = title.toLowerCase();
    title = title.replace(/:/g, "");
    title = title.replace(/ /g, "-");

    window.location.href = `https://bmovie.cc/movies/${title}/`;
  }

  newSearch(keywords) {

    let nextPageI = document.querySelector('#forward-button i');
    nextPageI.classList.add('white-text');
    let nextPageA = document.querySelector('#forward-button');
    nextPageA.classList.remove('disabled');

    // set genre to default
    let newReleaseOption = document.querySelector('#genre-menu').getElementsByTagName('option')[0];
    newReleaseOption.selected = 'selected';
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
    let nextPageI = document.querySelector('#forward-button i');
    nextPageI.classList.add('white-text');
    let searchText = document.querySelector('.search');
    searchText.placeholder = 'search';

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

    if (genreID === 0) {
      let start = _nextURL.search('&with_genres=');
      if (start !== -1) {
        // update genreID
        start += 13;
        let value = _nextURL.substring(start);
        let end = value.indexOf('&');
        end = start + end;
        _nextURL = _nextURL.substring(0, (start - 13)) + _nextURL.substring(end);
      }
      // add genreID
      else {
        start = _nextURL.search('/movie?');
        start += 7;
        _nextURL = _nextURL.substring(0, start) + _nextURL.substring(start);
      }
    }
    else {
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
    }

    // remove query
    let qstart = _nextURL.search('&query=');
    if (qstart !== -1) {
      _nextURL = _nextURL.substring(0, qstart);
    }

    this.setState({ nextURL: encodeURI(_nextURL), page: 1 });
  }

  pageChange(page) {
    if (page === (this.state.maxPage + 1)) {
      //disable forward button if only page of results
      let nextPageI = document.querySelector('#forward-button i');
      nextPageI.classList.remove('white-text');
      nextPageI.classList.add('grey-text');
      let nextPageA = document.querySelector('#forward-button');
      nextPageA.classList.add('disabled');
      return;
    }
    else {
      window.scrollTo(0, 0);

      let nextPageI = document.querySelector('#forward-button i');
      nextPageI.classList.remove('grey-text');
      nextPageI.classList.add('white-text');
      let nextPageA = document.querySelector('#forward-button');
      nextPageA.classList.remove('disabled');
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
      <div className="App">

        <div className="title-bar title-bar-show" data-responsive-toggle="mobile-menu" data-hide-for="medium">
          <div className="title-bar-left">
            <a href="/" id="logo">Movie8r</a>
          </div>
          <div className="title-bar-right">
            <button className="menu-icon" type="button" data-toggle="mobile-menu"></button>
          </div>
        </div>


        <div className="top-bar grid-x" id="mobile-menu" data-animate="hinge-in-from-top hinge-out-from-top">


          <div className="cell small-1 medium-2  large-2 show-for-medium">
            <a href="/" id="logo">Movie8r</a>
          </div>

          <div className="cell small-12 medium-4 large-4">
            <SearchBar
              newSearch={this.newSearch}
            ></SearchBar>
          </div>

          <div className="cell small-12 medium-3 large-3">
            <GenreMenu
              genreChange={this.genreChange}
              pageChange={this.pageChange}
            ></GenreMenu>
          </div>

          <div className="cel small-12 medium-1 large-1">
            <Install></Install>
          </div>

          <div className="cel small-12 medium-1 large-1">
            <ColorMode></ColorMode>
          </div>

        </div>





        <div className="grid-container fluid">
          <div id="movie-container" className="grid-x grid-margin-x">
            {this.state.movieElements}
          </div>
        </div>
        <Pagination
          pageChange={this.pageChange}
          page={this.state.page}
        ></Pagination>
      </div>
    );
  }
}



export default Movie8r;
