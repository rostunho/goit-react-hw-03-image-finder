import React, { Component } from "react";

import { toast } from "react-toastify";
import fetchImages from "../../services/api";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: null,
    status: "idle",
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      try {
        const newImages = await fetchImages(this.props.query, this.state.page);

        if (newImages.hits.length === 0) {
          return toast.error("This pictures do not exist", {
            autoClose: 3000,
          });
        }
        this.setState({ images: newImages.hits });
      } catch (error) {
        this.setState({ error, status: "rejected" });
      }
    }
  }

  render() {
    // console.log(this.state.images);

    return (
      <>
        <ul className="gallery">
          {this.state.images.map((image) => (
            <ImageGalleryItem
              key={image.id}
              imageURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
              tags={image.tags}
            />
          ))}
        </ul>
      </>
    );
  }
}

// fetchImages("cat", 1);
export default ImageGallery;
