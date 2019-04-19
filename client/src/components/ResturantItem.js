import React, { Component } from "react";

class ResturantItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      saved: false
    };
  }

  componentDidMount = () => {
    const { visitedResturants, resturantData } = this.props;
    if (
      visitedResturants.filter(item => item.id === resturantData.id).length > 0
    ) {
      this.setState({
        saved: true
      });
    }
  };

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
      <button className="btn btn-success btn-sm" disabled>
        Saved!
      </button>
    ) : (
      <button className="btn btn-primary btn-sm" onClick={this.addToList}>
        Save Resturant
      </button>
    );
    return (
      <div className="container" style={styles.container}>
        <div className="row" style={styles.rowItem}>
          <div className="col-8">
            <div className="row">
              <h6 style={styles.resturantName}>{name}</h6>
            </div>
            <div className="row">
              <p style={styles.text}>{vicinity}</p>
            </div>
            <div className="row">
              <p style={styles.text}>{rating}</p>
            </div>
          </div>
          <div className="col-4 text-right align-self-center">
            <p className="text-right" style={styles.text}>
              {renderButton}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ResturantItem;

const styles = {
  container: {
    border: "1px solid #E8E8E8",
    margin: "10px",
    backgroundColor: "#E8E8E8"
  },
  rowItem: {
    padding: "10px"
  },
  resturantName: {
    margin: "0",
    padding: "0"
  },
  text: {
    margin: "0",
    padding: "0",
    fontSize: "14px"
  }
};
