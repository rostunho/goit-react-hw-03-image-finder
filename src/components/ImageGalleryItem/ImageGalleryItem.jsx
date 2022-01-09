import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

function ImageGalleryItem({ imageURL, largeImageURL, tags, openModal }) {
  return (
    <Item>
      <Image
        src={imageURL}
        data-src={largeImageURL}
        alt={tags}
        data-alt={tags}
        onClick={openModal}
      />
    </Item>
  );
}

ImageGalleryItem.propTypes = {
  imageURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
