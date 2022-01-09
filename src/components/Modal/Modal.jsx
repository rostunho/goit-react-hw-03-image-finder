import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalBox } from './Modal.styled';

class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    largeImage: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onPressEsc);

    document
      .getElementById('large-img')
      .addEventListener('load', this.onLoadImage);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onPressEsc);

    document
      .getElementById('large-img')
      .removeEventListener('load', this.onLoadImage);
  }

  onPressEsc = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  onBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  onLoadImage = () => {
    this.props.changeStatus('resolved');
  };

  render() {
    return createPortal(
      <Overlay onClick={this.onBackdropClick}>
        <ModalBox>
          <img
            id="large-img"
            src={this.props.largeImage}
            alt={this.props.tags}
          />
        </ModalBox>
      </Overlay>,
      document.getElementById('modal-root'),
    );
  }
}

export default Modal;
