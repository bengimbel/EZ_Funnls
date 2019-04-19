import React, { Component } from "react";

class Searchbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: ""
    };
  }

  handleInputChange = e => {
    this.setState({
      searchInput: e.target.value
    });
  };

  onFormSubmit = e => {
    e.preventDefault();
    const { isSearchTabActive, submitZipCode, renderSearchList } = this.props;
    const { searchInput } = this.state;
    submitZipCode(searchInput);
    if (!isSearchTabActive) {
      renderSearchList();
    }
    this.setState({
      searchInput: ""
    });
  };

  render() {
    const { searchInput } = this.state;
    return (
      <div className="container">
        <div className="row">
          <form onSubmit={this.onFormSubmit} className="input-group">
            <div className="col-10 justify-content-center">
              <input
                placeholder="Search resturants by zip code"
                className="form-control"
                value={searchInput}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="col-2 justify-content-center">
              <span className="input-group-btn">
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Searchbar;

const styles = {
  button: {
    marginLeft: "10px"
  }
};
