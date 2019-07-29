import React from "react";

class GenreMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    // this.props.pageChange(1);
    this.props.genreChange(e.target.value);
  }

  render() {
    return (
      <select onChange={this.handleChange}>
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