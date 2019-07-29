import React from 'react';

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleSearchButtonClick() {
    let searchTextElement = document.querySelector('#search-text');
    let searchWords = searchTextElement.value;
    searchTextElement.value = '';
    searchTextElement.placeholder = searchWords;
    searchTextElement.blur();
    this.props.newSearch(searchWords);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      let searchTextElement = document.querySelector('#search-text');
      let searchWords = searchTextElement.value;
      searchTextElement.value = '';
      searchTextElement.placeholder = searchWords;
      searchTextElement.blur();
      this.props.newSearch(searchWords);
    }
  }

  render() {
    return (
      <div id="search-bar">
        <input id="search-text" onKeyPress={this.handleKeyPress} type="text" placehoder="search" />
        <button onClick={this.handleSearchButtonClick}>search icon</button>
      </div>

    );
  }
}

export default SearchBar;