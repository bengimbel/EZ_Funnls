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
      <div>
        <form onSubmit={this.onFormSubmit} className="input-group">
          <input
            placeholder="Search resturants by zip code"
            className="form-control"
            value={searchInput}
            onChange={this.handleInputChange}
          />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </span>
        </form>
      </div>
    );
  }
}

export default Searchbar;
