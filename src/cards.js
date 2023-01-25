export const createCardsGallery = images =>
images.map(image => {
  return `
        <a class="gallery-link" href="${image.largeImageURL}">
          <div class="photo-card">
            <img class="photo-card-image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
            <div class="info">
              <p class="info-item"><b>Likes</b>${image.likes}</p>
              <p class="info-item"><b>Views</b>${image.views}</p>
              <p class="info-item"><b>Comments</b>${image.comments}</p>
              <p class="info-item"><b>Downloads</b>${image.downloads}</p>
            </div>
          </div>
        </a>
      `;
    })
    .join('');

