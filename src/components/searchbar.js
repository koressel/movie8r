import React from 'react';

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleSearchButtonClick() {
    let searchTextElement = document.querySelector('#search-input');
    let searchWords = searchTextElement.value;
    if (searchWords === '') {
      return;
    }
    else {
      searchTextElement.value = '';
      searchTextElement.placeholder = searchWords;
      searchTextElement.blur();
      this.props.newSearch(searchWords);
    }

  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      let searchTextElement = document.querySelector('#search-input');
      let searchWords = searchTextElement.value;
      searchTextElement.value = '';
      searchTextElement.placeholder = searchWords;
      searchTextElement.blur();
      this.props.newSearch(searchWords);
    }
  }

  render() {
    return (
      <ul id="search-container" className="menu">
        <li><input id="search-input" className="search browser-default" type="search" placeholder="search" onKeyPress={this.handleKeyPress} /></li>
        <li><button type="button" id="search-button" className=" button" onClick={this.handleSearchButtonClick}><i className="fi-magnifying-glass"></i></button></li>
      </ul>
    );
  }
}

export default SearchBar;

/* <div id="search-bar">
  <input id="search-text" onKeyPress={this.handleKeyPress} type="text" placehoder="search" />
  <button onClick={this.handleSearchButtonClick}>
    <i className="material-icons">search</i>
  </button>
</div> */