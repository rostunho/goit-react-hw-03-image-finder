import React, { Component } from "react";

import { toast } from "react-toastify";
import api from "../../services/api";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: null,
    status: "idle",
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props && this.state.page !== 1) {
      this.setState({ images: [], page: 1 });
    }

    if (prevProps !== this.props || prevState.page !== this.state.page) {
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

      if (newImages.hits.length === 0) {
        return toast.error("This pictures do not exist", {
          autoClose: 3000,
        });
      }

      this.setState((state) => ({
        images: [...state.images, ...newImages.hits],
        status: "resolved",
      }));
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

  render() {
    return (
      <>
        <ul className="gallery">
          {this.state.images.map((image) => {
            return (
              <ImageGalleryItem
                key={image.id}
                // id={image.id}
                imageURL={image.webformatURL}
                largeImageURL={image.largeImageURL}
                tags={image.tags}
              />
            );
          })}
        </ul>
        <Button loadMore={this.loadNextPage} />
      </>
    );
  }
}

export default ImageGallery;
