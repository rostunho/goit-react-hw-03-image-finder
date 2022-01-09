import React, { Component } from "react";

import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { ToastContainer } from "react-toastify";
import { AppContainer } from "./App.styled";

class App extends Component {
  state = {
    searchQuery: "",
  };

  onSearchQuery = (query) => {
    this.setState({ searchQuery: query });
  };

  render() {
    return (
      <AppContainer>
        <Searchbar onSubmit={this.onSearchQuery} />
        <ImageGallery query={this.state.searchQuery} />
        <ToastContainer />
      </AppContainer>
    );
  }
}

export default App;
