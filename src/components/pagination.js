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
      <div id="pagination" className="text-center">
        <button id="back-button" aria-label="page-back-button" onClick={this.handlePageChange}><i className="fi-arrow-left white-text"></i></button>
        <p id="page">{this.props.page}</p>
        <button id="forward-button" aria-label="page-forward-button" onClick={this.handlePageChange}><i className="fi-arrow-right white-text"></i></button>
      </div>

    )
  }
}

export default Pagination;