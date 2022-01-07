function ImageGalleryItem({ imageURL, largeImageURL, tags }) {
  return (
    <li className="gallery-item">
      <img src={imageURL} alt={tags} />
    </li>
  );
}

export default ImageGalleryItem;
