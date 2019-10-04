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
      <div id="search-container" className="grid-x">
        <div className="cell small-12">
          <input id="search-input" className="search " type="search" placeholder="search" onKeyPress={this.handleKeyPress} />
          <button type="button" id="search-button" className=" button" onClick={this.handleSearchButtonClick}><i className="fi-magnifying-glass"></i></button>
        </div>
      </div>
    );
  }
}

export default SearchBar;
