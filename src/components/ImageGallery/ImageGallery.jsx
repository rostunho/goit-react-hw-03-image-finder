import React, { Component } from "react";

import { toast } from "react-toastify";
import api from "../../services/api";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";
import { Gallery } from "./ImageGallery.styled";
import Modal from "../Modal/Modal";

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: null,
    status: "idle",
    showModal: false,
    largeImageURL: null,
    currentTags: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({ images: [], page: 1 });
      // console.log("1");
      // this.updateImageGallery();
    }

    if (
      (prevProps !== this.props && this.state.page === 1) ||
      prevState.page !== this.state.page
    ) {
      this.updateImageGallery();
    }
  }

  updateImageGallery = async () => {
    this.setState({ status: "pending" });

    try {
      const newImages = await api.fetchImages(
        this.props.query,
        this.state.page
      );

      if (newImages.hits.length === 0 && this.state.images.length === 0) {
        return toast.error(`"${this.props.query}"pictures do not exist`, {
          autoClose: 3000,
        });
      }

      if (newImages.hits.length === 0 && this.state.images.length !== 0) {
        return toast.info(`There are all pictures of "${this.props.query}"`, {
          autoClose: 3000,
        });
      }

      this.setState((state) => ({
        images: [...state.images, ...newImages.hits],
        status: "resolved",
      }));

      // console.log("2");
    } catch (error) {
      this.setState({ error: error.message, status: "rejected" });
    }

    this.scrollToBottom();
  };

  scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  loadNextPage = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  openModal = (event) => {
    this.setState({
      showModal: true,
      largeImageURL: event.target.dataset.src,
      currentTags: event.target.dataset.alt,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      largeImageURL: null,
      currentTags: null,
    });
  };

  render() {
    const { images, showModal, largeImageURL, currentTags } = this.state;

    return (
      <>
        <Gallery>
          {images.map((image) => {
            return (
              <ImageGalleryItem
                key={image.id}
                // id={image.id}
                imageURL={image.webformatURL}
                largeImageURL={image.largeImageURL}
                tags={image.tags}
                openModal={this.openModal}
              />
            );
          })}
        </Gallery>
        {images.length !== 0 && <Button loadMore={this.loadNextPage} />}
        {showModal && (
          <Modal
            closeModal={this.closeModal}
            largeImage={largeImageURL}
            tags={currentTags}
          />
        )}
      </>
    );
  }
}

export default ImageGallery;
