import React from "react";

class GenreMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let genreID;
    let genreName = e.target.value;
    switch (genreName) {
      case 'Action':
        genreID = 28;
        break;
      case 'Adventure':
        genreID = 12;
        break;
      case 'Animation':
        genreID = 16;
        break;
      case 'Comedy':
        genreID = 35;
        break;
      case 'Crime':
        genreID = 80;
        break;
      case 'Documentary':
        genreID = 99;
        break;
      case 'Drama':
        genreID = 18;
        break;
      case 'Family':
        genreID = 10751;
        break;
      case 'Fantasy':
        genreID = 14;
        break;
      case 'History':
        genreID = 36;
        break;
      case 'Horror':
        genreID = 27;
        break;
      case 'Music':
        genreID = 10402;
        break;
      case 'Mystery':
        genreID = 9648;
        break;
      case 'Romance':
        genreID = 10749;
        break;
      case 'Science Fiction':
        genreID = 878;
        break;
      case 'Thriller':
        genreID = 53;
        break;
      case 'War':
        genreID = 10752;
        break;
      case 'Western':
        genreID = 37;
        break;
      default:
        genreID = 0;
    }
    // this.props.pageChange(1);
    this.props.genreChange(genreID);
  }

  render() {
    return (
      <select className="browser-default" onChange={this.handleChange}>
        <option>Action</option>
        <option>Adventure</option>
        <option>Animation</option>
        <option>Comedy</option>
        <option>Crime</option>
        <option>Documentary</option>
        <option>Drama</option>
        <option>Family</option>
        <option>Fantasy</option>
        <option>History</option>
        <option>Horror</option>
        <option>Music</option>
        <option>Mystery</option>
        <option>Romance</option>
        <option>Science Fiction</option>
        <option>Thriller</option>
        <option>War</option>
        <option>Western</option>
      </select>
    )
  }
}

export default GenreMenu;

/* <select onChange={this.handleChange}>
  <option>Action</option>
  <option>Adventure</option>
  <option>Animation</option>
  <option>Comedy</option>
  <option>Crime</option>
  <option>Documentary</option>
  <option>Drama</option>
  <option>Family</option>
  <option>Fantasy</option>
  <option>History</option>
  <option>Horror</option>
  <option>Music</option>
  <option>Mystery</option>
  <option>Romance</option>
  <option>Science Fiction</option>
  <option>Thriller</option>
  <option>War</option>
  <option>Western</option>
</select> */