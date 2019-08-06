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
      <div id="pagination" className="white-text">
        <a id="back-button" className="grey darken-4 btn" href="#" onClick={this.handlePageChange}><i className="material-icons" >chevron_left</i></a>
        <p id="page">{this.props.page}</p>
        <a id="forward-button" className="grey darken-4 btn" href="#" onClick={this.handlePageChange}><i className="material-icons" >chevron_right</i></a>
      </div>
    )
  }
}

export default Pagination;