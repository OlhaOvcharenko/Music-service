import {select,templates} from '../settings.js';

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
    const button = document.querySelector('.btn');

    button.addEventListener('click', function(event){
      event.preventDefault(); // Prevent form submission

      const input = document.querySelector(select.containerOf.input);
      const searchData = input.value.toLowerCase();
      const selectedCategory = document.getElementById('search_select').value;
  
      // Filter songs based on search criteria
      const filteredSongs = thisSearch.songs.filter((song) => {
        const isMatchTitle = searchData === '' || song.title.toLowerCase().includes(searchData);
        const isMatchCategory = selectedCategory === 'clean' || song.categories.includes(selectedCategory);

        return isMatchTitle && isMatchCategory;
      });


      thisSearch.updatePlaylist(filteredSongs);
    });
  }
  /*createAudioElement(song) {
    const audioElement = document.createElement('audio');

    audioElement.src = `songs/${song.filename}`;

    return audioElement;

  }*/

  updatePlaylist(filteredSongs) {
    const thisSearch = this;
    const playlistWrapper = document.querySelector(select.containerOf.searchPlaylist);
    playlistWrapper.innerHTML = ''; // Clear existing playlist
  
    for (const song of filteredSongs) {
      const songsObject = {
        id: song.id,
        title: song.title,
        author: song.author,
        filename:`songs/${song.filename}`,
        categories: song.categories,
        ranking: song.ranking,
      };
  
      const generatedSongHTML = templates.singleSong(songsObject); 
      playlistWrapper.insertAdjacentHTML('beforeend', generatedSongHTML);
  
      /*const containerOfAudio = document.getElementById(song.id);
      const audioElement = thisSearch.createAudioElement(song);
      containerOfAudio.appendChild(audioElement);*/

      //console.log(containerOfAudio);
      
      thisSearch.initGreenPlayer();
    
    }
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