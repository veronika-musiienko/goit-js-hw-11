import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const input = form.querySelector('input[type="text"]');

// const lightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });

form.addEventListener('submit', async event => {
  event.preventDefault();

  const query = input.value.trim();

  if (query === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(query);
    hideLoader();

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'No Results',
        message: 'No images found. Please try another query.',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    // lightbox.refresh();
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error(error);
  }

  form.reset();
});