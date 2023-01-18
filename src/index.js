import { PixabayAPI } from "./pixabay-api";
import { createCardsGallery } from "./cards"; 
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchInput = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

const pixabayAPI  = new PixabayAPI();

console.log(pixabayAPI)

searchInput.addEventListener('submit', onSearchFormButtonClick);

function onSearchFormButtonClick(event) {
    event.preventDefault();

    pixabayAPI.query = event.target.elements.searchQuery.value.trim();
    
    pixabayAPI.fetchPhotosByQuery()
    .then( data => {
        gallery.innerHTML = createCardsGallery(data.hits);
    
        loadMoreButton.classList.remove('is-hidden');
    })
    .catch(err => {
        console.log(err)
    })
}

loadMoreButton.addEventListener('click', onLoadMoreBtnClick);

function onLoadMoreBtnClick(event) {
console.log('hello')
}






//var gallery = $('.gallery a').simpleLightbox();
//gallery.next(); // Next Image