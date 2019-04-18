import React, { Component } from "react";

class ResturantItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      saved: false
    };
  }

  componentDidMount() {
    const { visitedResturants, resturantData } = this.props;
    if (
      visitedResturants.filter(item => item.id === resturantData.id).length > 0
    ) {
      this.setState({
        saved: true
      });
    }
  }

  addToList = () => {
    const { saveResturant, resturantData } = this.props;
    saveResturant(resturantData);
    this.setState(prevState => {
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
