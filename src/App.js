import React, { Component } from "react";

import Searchbar from "./components/Searchbar/Searchbar";

class App extends Component {
  state = {
    searchQuery: "",
  };

  onSearchQuery = (query) => {
    this.setState({ searchQuery: query });
  };

  render() {
    return <Searchbar onSubmit={this.onSearchQuery} />;
  }
}

export default App;
