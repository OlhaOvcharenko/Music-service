import {templates,select} from '../settings.js';
import Playlist from './Playlist.js';

class Home {
  constructor(songs) {
    const thisHome = this;

    thisHome.songs = songs;
    thisHome.categoryList = [];
    console.log(thisHome.categoryList);
    thisHome.render();
    thisHome.getCategory();
  
    thisHome.playlistInstance = new Playlist(thisHome.songs);
  }

  getCategory() {
    const thisHome = this;

    for (const song of thisHome.songs) {
      const categoriesOfSong = song.categories; // Assuming each song object has a "categories" property

      for (const category of categoriesOfSong) {
        if (!thisHome.categoryList.includes(category)) {
          thisHome.categoryList.push(category); // Corrected to use "categoryList" instead of "categories"
        }
      }
    }

    const listOfCategories = document.querySelector('.list_of_categories');
    listOfCategories.innerHTML = ''; // Clear existing options

    // Generate and append the list of categories to the HTML
    for (const category of thisHome.categoryList) {
      const categoryItem = document.createElement('li');
      categoryItem.textContent = category;
      listOfCategories.appendChild(categoryItem);
    }
  }

  render() {

    const generatedHTML = templates.pageHome();
    const homeContainer = document.querySelector(select.containerOf.home);

    homeContainer.innerHTML+= generatedHTML;

    //console.log('HTML', generatedHTML);
  }

}


export default Home;