import React, { Component } from "react";
import Main from "./components/Main";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

//Apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="container">
            <Main />
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
