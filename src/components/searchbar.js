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

      <div>
        <div className="col s4 m4 l3">
          <div id="search-div" className="input-field">
            <input id="search-input" className="search browser-default" type="search" placeholder="search" onKeyPress={this.handleKeyPress} />
          </div>
        </div>
        <div className="col s1">
          <ul>
            <li>
              <a id="search-button" className=" light-blue waves-effect waves-light btn" onClick={this.handleSearchButtonClick}><i className="material-icons">search</i></a>
            </li>
          </ul>
        </div>
        {/* <form>
          <div className="input-field">
            <input id="search-text" type="search" onKeyPress={this.handleKeyPress} required />
            <label className="label-icon" for="search"><i className="material-icons">search</i></label>
            <i className="material-icons">close</i>
          </div>
        </form> */}
      </div>





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