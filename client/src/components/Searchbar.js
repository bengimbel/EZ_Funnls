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
    //submit search term for get request.
    console.log(this.state.searchInput, "Submitted Input");
  };
  render() {
    return (
      <div>
        <h1>Searchbar</h1>
        <form onSubmit={this.onFormSubmit} className="input-group">
          <input
            placeholder="Search resturants by zip code"
            className="form-control"
            value={this.state.searchInput}
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
