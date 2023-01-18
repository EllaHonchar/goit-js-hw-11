import { PixabayAPI } from "./pixabay-api";
import { createCardsGallery } from "./cards"; 
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchInput = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
const searchBtn = document.querySelector('.btn');

const pixabayAPI  = new PixabayAPI();
//console.log(pixabayAPI)
searchInput.addEventListener('submit', onSearchFormButtonClick);

function onSearchFormButtonClick(event) {
    event.preventDefault();

    searchBtn.disabled = true;

    pixabayAPI.query = event.target.elements.searchQuery.value.trim();
    pixabayAPI.page = 1;

    pixabayAPI.fetchPhotosByQuery()
    .then( data => {
        if (data.hits.length === 0) {
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            event.target.reset();
            // gallery.innerHTML = '';

            return;
        }

        if (data.totalHits > 40) {
            loadMoreButton.classList.remove('is-hidden');
        }

        gallery.innerHTML = createCardsGallery(data.hits);
    })
    .catch(err => {
        console.log(err)
    })
    .finally(() => {
        searchBtn.disabled = false;
    })
}

loadMoreButton.addEventListener('click', onLoadMoreBtnClick);

function onLoadMoreBtnClick(event) {
    pixabayAPI.page += 1;

    pixabayAPI
    .fetchPhotosByQuery()
    .then(data => {
        gallery.insertAdjacentHTML(
            'beforeend', 
            createCardsGallery(data.hits)
            );

        if (data.totalHits === pixabayAPI.hits) {
            loadMoreButton.classList.add('is-hidden')
        }

    })
    .catch(err => {
        console.log(err)
    });
};






//var gallery = $('.gallery a').simpleLightbox();
//gallery.next(); // Next Image