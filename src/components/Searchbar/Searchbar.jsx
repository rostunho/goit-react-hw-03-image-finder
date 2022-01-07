import React, { Component } from "react";

class Searchbar extends Component {
  state = {
    query: "",
  };

  handleInput = (event) => {
    // console.log(event.target.value);
    this.setState({ query: event.target.value });
  };

  onSubmitForm = (event) => {
    event.preventDefault();

    // console.log(this.state.query);

    this.props.onSubmit(this.state.query);
  };

  render() {
    // console.log(this.props);

    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.onSubmitForm}>
          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInput}
          />

          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>
        </form>
      </header>
    );
  }
}

export default Searchbar;
