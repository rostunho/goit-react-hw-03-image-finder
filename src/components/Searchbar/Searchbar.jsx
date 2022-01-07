import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    const { query } = this.state;
    // console.log(query);
    if (query.trim() === "") {
      return toast.warn("Your search query is empty", {
        position: "top-right",
        autoClose: 3000,
      });
    }

    this.props.onSubmit(query);
    event.target.value = "";
    this.setState({ query: "" });
  };

  render() {
    const { query } = this.state;
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
            value={query}
            onChange={this.handleInput}
          />

          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>
        </form>
        <ToastContainer />
      </header>
    );
  }
}

export default Searchbar;
