import {select, settings, templates} from '../settings.js';

class Search {

  constructor(songs){
    const thisSearch = this;

    thisSearch.songs = songs;
    thisSearch.categoryList = [];

    thisSearch.render();
    thisSearch.createPlaylist();
    thisSearch.getCategory();
    //console.log(data);
   
  }

  createAudioElement(song) {
    const audioElement = document.createElement('audio');

    audioElement.src = `songs/${song.filename}`;

    return audioElement;
  }

  createPlaylist(){
    const thisSearch = this;
   
    // for every category (song)...
    for (const song of thisSearch.songs) {
      // Create a new object representing the song with selected properties
      const songsObject = {
        id: song.id,
        title: song.title,
        author: song.author,
        filename:`songs/${song.filename}`,
        categories: song.categories,
        ranking: song.ranking,
      };

      const generatedSongHTML = templates.singleSong(songsObject); 
      const playlistWrapper = document.querySelector(select.containerOf.searchPlaylist);
      
      playlistWrapper.insertAdjacentHTML('beforeend', generatedSongHTML);
    
      const containerOfAudio = document.getElementById(song.id);
      const audioElement = thisSearch.createAudioElement(song);
      containerOfAudio.appendChild(audioElement);
      console.log(containerOfAudio);


      /*for (const category of song.categories) {
        if (!thisSearch.categoryList.includes(category)) {
          thisSearch.categoryList.push(category);
        }
      }*/
    }

    //thisSearch.createCategoriesList(thisSearch.categoryList);
  }

  getCategory(){
    const thisSearch = this;

    for (const song of thisSearch.songs) {
      const categoriesOfSong = song.categories; // Assuming each song object has a "categories" property
  
      for (const category of categoriesOfSong) {
        if (!thisSearch.categoryList.includes(category)) {
          thisSearch.categoryList.push(category);
        }
      }
    }
  
    thisSearch.createCategoriesList(thisSearch.categoryList);
  }

  createCategoriesList(categories) {
    const selectElement = document.getElementById('search_select');
    selectElement.innerHTML = ''; // Clear existing options

    const defaultOption = document.createElement('option');
    defaultOption.value = 'clean';
    selectElement.appendChild(defaultOption);
    
    for (const category of categories) {
      const optionElement = document.createElement('option');
      optionElement.value = category;
      optionElement.textContent = category;
      selectElement.appendChild(optionElement);
    }
  }

  filterSongs(){
    const thisSearch = this;
    const button = document.querySelector(select.containerOf.buttonSearch);

    button.addEventListener('submit', function(event){
      event.preventDefault(); // Prevent form submission
    
    });

  }

  render() {
    const generatedHTML = templates.searchPage();
    const searchContainer = document.querySelector(select.containerOf.search);

    searchContainer.innerHTML+= generatedHTML;


   // console.log('HTML', generatedHTML);
  }

  initGreenPlayer(){
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: '.play-song', 
      stopOthersOnPlay: true,
      
    });
  }


}

export default Search;