const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "24252951-ddd51d265365deb12d4398809";
const imagesPerPage = 12;

async function fetchImages(query, page) {
  try {
    const unparsedImages = await fetch(
      `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${imagesPerPage}`
    );

    if (!unparsedImages.ok) {
      return Promise.reject(
        new Error(`No results were found for your search "${query}"`)
      );
    }

    const images = await unparsedImages.json();
    return images;
  } catch (error) {
    throw error;
  }
}

export default fetchImages;
