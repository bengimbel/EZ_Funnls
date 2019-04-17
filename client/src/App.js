import React, { Component } from "react";
import logo from "./logo.svg";
import SearchBar from "./components/Searchbar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <SearchBar />
        </div>
      </div>
    );
  }
}

export default App;
