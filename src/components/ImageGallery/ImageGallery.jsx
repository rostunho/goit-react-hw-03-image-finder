import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import api from '../../services/api';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import { Gallery } from './ImageGallery.styled';
import Modal from '../Modal/Modal';
import Spinner from 'components/Loader/Loader';

class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string,
  };

  state = {
    images: [],
    page: 1,
    error: null,
    status: 'idle',
    showModal: false,
    largeImageURL: null,
    currentTags: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;

    if (prevProps !== this.props) {
      this.setState({ images: [], page: 1 });
    }

    if ((prevProps !== this.props && page === 1) || prevState.page !== page) {
      this.updateImageGallery();
    }
  }

  updateImageGallery = async () => {
    const { page, images } = this.state;
    const { query } = this.props;

    this.setState({ status: 'pending', error: null });

    try {
      const newImages = await api.fetchImages(query, page);

      if (newImages.hits.length === 0 && images.length === 0) {
        this.setState({ status: 'rejected' });
        return toast.error(`There is no pictures of "${query}"`, {
          autoClose: 3000,
        });
      }

      if (newImages.hits.length === 0 && images.length !== 0) {
        this.setState({ status: 'rejected' });
        return toast.info(`There are all pictures of "${query}"`, {
          autoClose: 3000,
        });
      }

      this.setState(state => ({
        images: [...state.images, ...newImages.hits],
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ error: error.message, status: 'rejected' });
      toast.error(this.state.error);
    }

    if (page !== 1) this.scrollToBottom();
  };

  scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  loadNextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  changeStatus = newStatus => {
    this.setState({ status: newStatus });
  };

  openModal = event => {
    this.setState({
      showModal: true,
      largeImageURL: event.target.dataset.src,
      currentTags: event.target.dataset.alt,
      status: 'pending',
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
    const { images, showModal, largeImageURL, currentTags, status } =
      this.state;

    const spinnerOverlayColor = showModal
      ? 'transparent'
      : 'rgba(0, 0, 0, 0.5)';

    return (
      <>
        <Gallery>
          {images.map(image => {
            return (
              <ImageGalleryItem
                key={image.id}
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
            changeStatus={this.changeStatus}
            largeImage={largeImageURL}
            tags={currentTags}
          />
        )}
        {status === 'pending' && <Spinner bgColor={spinnerOverlayColor} />}
      </>
    );
  }
}

export default ImageGallery;
