import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch } from 'react-icons/fa';
import {
  Header,
  Form,
  Input,
  SearchButton,
  ButtonLabel,
} from './Searchbar.styled';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };

  handleInput = event => {
    // console.log(event.target.value);
    this.setState({ query: event.target.value });
  };

  onSubmitForm = event => {
    event.preventDefault();
    const { query } = this.state;
    // console.log(query);
    if (query.trim() === '') {
      return toast.warn('Your search query is empty', {
        position: 'top-right',
        autoClose: 3000,
      });
    }

    this.props.onSubmit(query);
    event.target.value = '';
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    // console.log(this.props);
    return (
      <Header>
        <Form onSubmit={this.onSubmitForm}>
          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.handleInput}
          />

          <SearchButton type="submit">
            <FaSearch size="24" />
            <ButtonLabel>Search</ButtonLabel>
          </SearchButton>
        </Form>
      </Header>
    );
  }
}

export default Searchbar;
