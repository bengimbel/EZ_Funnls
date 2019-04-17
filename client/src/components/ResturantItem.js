import React, { Component } from "react";

class ResturantItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resturantsVisited: [],
      saved: false
    };
  }
  addToList = () => {
    this.props.saveResturant(this.props.resturantData);
    this.setState((prevState, props) => {
      return {
        saved: !prevState.saved
      };
    });
  };

  render() {
    const { name, vicinity, rating } = this.props.resturantData;
    const { saved } = this.state;
    const renderButton = saved ? (
      <button className="btn btn-success" disabled>
        Saved!
      </button>
    ) : (
      <button className="btn btn-primary" onClick={this.addToList}>
        Save Resturant
      </button>
    );
    return (
      <div>
        {name}
        {vicinity}
        {rating}
        {renderButton}
      </div>
    );
  }
}

export default ResturantItem;
