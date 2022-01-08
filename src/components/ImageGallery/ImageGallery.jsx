import React, { Component } from "react";

import { toast } from "react-toastify";
import fetchImages from "../../services/api";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: null,
    status: "idle",
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props || prevState !== this.state) {
      this.setState({ status: "pending" });

      try {
        const newImages = await fetchImages(this.props.query, this.state.page);

        if (newImages.hits.length === 0) {
          return toast.error("This pictures do not exist", {
            autoClose: 3000,
          });
        }
        this.setState({
          images: [...prevState.images, ...newImages.hits],
          status: "resolved",
        });
      } catch (error) {
        this.setState({ error, status: "rejected" });
      }
    }
  }

  loadMorePictures = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    console.log(this.state.images);

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
        <Button loadMore={this.loadMorePictures} />
      </>
    );
  }
}

// fetchImages("cat", 1);
export default ImageGallery;
