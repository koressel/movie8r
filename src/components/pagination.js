import React from "react";

class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(e) {
    let pageElement = document.querySelector('#page');
    let page = Number(pageElement.innerHTML);
    let buttonClicked = e.target.id;
    let nextPage;

    if (buttonClicked === "forward-button") {
      nextPage = page + 1;
    }

    if (buttonClicked === "back-button") {
      if (page === 1) {
        return;
      }
      nextPage = page - 1;
    }

    this.props.pageChange(nextPage);
    pageElement.innerHTML = nextPage;
  }


  render() {
    return (
      <div id="pagination">
        <button id="back-button" onClick={this.handlePageChange}>back icon</button>
        <p id="page">1</p>
        <button id="forward-button" onClick={this.handlePageChange}>forward icon</button>
      </div>
    )
  }
}

export default Pagination;