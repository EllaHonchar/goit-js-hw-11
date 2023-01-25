import { PixabayAPI } from "./pixabay-api";
import { createCardsGallery } from "./cards"; 
import { Notify } from 'notiflix/build/notiflix-notify-aio';
//import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchInput = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
const searchBtn = document.querySelector('.btn');
const endOfContent = document.querySelector('.js-load-end');

const pixabayAPI  = new PixabayAPI();
//console.log(pixabayAPI)

searchInput.addEventListener('submit', onSearchFormButtonClick);

async function onSearchFormButtonClick(event) {
    event.preventDefault();

    if(pixabayAPI.query === event.target.elements.searchQuery.value) {
        return;
    }
   searchBtn.disabled = true;

    pixabayAPI.query = event.target.elements.searchQuery.value.trim();
    pixabayAPI.page = 1;

    try {
        const { hits, totalHits} = await pixabayAPI.fetchPhotosByQuery();

        pixabayAPI.page += 1;
        event.target.reset();

        if( hits.length === 0) {
            failMessage();
            loadMoreButton.classList.add('is-hidden')
            event.target.reset();
            gallery.innerHTML = '';
            return;
        }
        if( pixabayAPI.query === '') {
            gallery.innerHTML='';
            return;
        }
        if( totalHits > pixabayAPI.perPage) {
            loadMoreButton.classList.remove('is-hidden')
        }
        gallery.innerHTML = createCardsGallery(hits);
    }
    catch (error) {
    console.log(error);}
    finally {
        searchBtn.disabled = false;
      }
    }


loadMoreButton.addEventListener('click', onLoadMoreBtnClick);

async function onLoadMoreBtnClick() {
    // loadMoreButton.disabled = true;
    pixabayAPI.page += 1;
  try {
    const { hits } = await pixabayAPI.fetchPhotosByQuery();
    
        gallery.insertAdjacentHTML(
        'beforeend',
        createCardsGallery(hits)
      );
      if (hits < pixabayAPI.perPage * pixabayAPI.page || hits < 40) {
      loadMoreButton.classList.add('is-hidden');
        infoMessage();
    //   endOfContent.classList.remove('is-hidden');
      
    };
        }
   catch (error) {
        console.log(error);
      } 
    }

function failMessage() {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
}
function infoMessage(){
    Notify.info("We're sorry, but you've reached the end of search results.");
}
