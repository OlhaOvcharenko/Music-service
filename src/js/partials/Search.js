import {select,templates} from '../settings.js';
import Playlist from './Playlist.js';

class Search {

  constructor(songs){
    const thisSearch = this;

    thisSearch.songs = songs;
    thisSearch.categoryList = [];

    thisSearch.render();
    //thisSearch.createPlaylist();
    thisSearch.getCategory();
    thisSearch.filterSongs();
    
    

    //console.log(data);
   
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
    thisSearch.button = document.querySelector(select.containerOf.buttonSearch);
  
    thisSearch.button.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent form submission
  
      const input = document.querySelector(select.containerOf.input);
      const searchData = input.value.toLowerCase();
      const selectedCategory = document.getElementById('search_select').value;
  
      // Filter songs based on search criteria
      const filteredSongs = thisSearch.songs.filter((song) => {
        const isMatchTitle = searchData === '' || song.title.toLowerCase().includes(searchData);
        const isMatchAuthor = searchData === '' || song.author.toLowerCase().includes(searchData);
        const isMatchCategory = selectedCategory === 'clean' || song.categories.includes(selectedCategory);
  
        if (searchData !== '' && selectedCategory !== '') {
          return (isMatchTitle || isMatchAuthor) && isMatchCategory;
        } else if (searchData !== '') {
          return isMatchTitle || isMatchAuthor;
        } else if (selectedCategory !== '') {
          return isMatchCategory;
        }
  
        return true; // Default case: no filters applied, show all songs
      });


      thisSearch.updatePlaylist(filteredSongs);

      console.log(filteredSongs)
    });
  }

  createAudioElement(song) {
    const audioElement = document.createElement('audio');
    
    audioElement.src = `songs/${song.filename}`;
    
    return audioElement;

  }

  updatePlaylist(filteredSongs) {
    const thisSearch = this;
    const playlistWrapper = document.querySelector(select.containerOf.searchPlaylist);
    //playlistWrapper.innerHTML = ''; // Clear existing playlist

    console.log(playlistWrapper);
  
    for (const song of filteredSongs) {
      thisSearch.songsData = {
        id: song.id,
        title: song.title,
        author: song.author,
        filename:`songs/${song.filename}`,
        categories: song.categories,
        ranking: song.ranking,
      };
      
      thisSearch.songsHTML = templates.singleSong(thisSearch.songsData); 
     

      thisSearch.songsHTML = thisSearch.songsHTML.replaceAll('play-song', 'search-song');
      playlistWrapper.innerHTML += thisSearch.songsHTML; 


      console.log(playlistWrapper.innerHTML)

      const containerOfSong = document.querySelector(select.containerOf.search_song);
      

      const audioElement = thisSearch.createAudioElement(song);
      containerOfSong.appendChild(audioElement);
  
      console.log('containerofaudio',containerOfSong);
      console.log(audioElement);
    }

    //thisSearch.initGreenPlayer();

  }


  render() {

    const generatedHTML = templates.searchPage();
    const searchContainer = document.querySelector(select.containerOf.search);

    searchContainer.innerHTML+= generatedHTML;

  }

  initGreenPlayer(){
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: '.search-song', 
      stopOthersOnPlay: true,
    });
  }

}

export default Search;