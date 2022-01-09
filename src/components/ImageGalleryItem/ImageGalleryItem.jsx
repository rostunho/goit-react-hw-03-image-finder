import { Item, Image } from "./ImageGalleryItem.styled";

function ImageGalleryItem({ imageURL, largeImageURL, tags }) {
  return (
    <Item className="gallery-item">
      <Image src={imageURL} alt={tags} />
    </Item>
  );
}

export default ImageGalleryItem;
