import { Item, Image } from "./ImageGalleryItem.styled";

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

export default ImageGalleryItem;
