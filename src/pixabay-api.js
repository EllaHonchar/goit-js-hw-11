'use strict';

import axios from 'axios';

export class PixabayAPI {
    static BASE_URL = 'https://pixabay.com/api/';
    static API_KEY = '32917844-8e8c51c8f603babcea5f94901';
  
    constructor() {
      this.page = 1;
      this.query = null;
      this.per_page = 40;
    }
    

 async fetchPhotosByQuery() {
    const searchParams = {
       params: {
            key: PixabayAPI.API_KEY,
            q: this.query,
            image_type: 'photo',
            orientation:  'horizontal',
            safesearch:  true,
            page: this.page,
            perPage: 40
    }
    };
 
    const { data } = await axios.get(`${PixabayAPI.BASE_URL}`, searchParams);
    return data;
}
}

