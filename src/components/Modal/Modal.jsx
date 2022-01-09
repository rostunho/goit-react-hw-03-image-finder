import React, { Component } from "react";
import { createPortal } from "react-dom";
import { Overlay, ModalBox } from "./Modal.styled";

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.onPressEsc);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onPressEsc);
  }

  onPressEsc = (event) => {
    if (event.code === "Escape") {
      this.props.closeModal();
    }
  };

  onBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.onBackdropClick}>
        <ModalBox>
          <img src={this.props.largeImage} alt={this.props.tags} />
        </ModalBox>
      </Overlay>,
      document.getElementById("modal-root")
    );
  }
}

export default Modal;
