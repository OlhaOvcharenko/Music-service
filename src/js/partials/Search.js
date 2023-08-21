import {select,templates} from '../settings.js';
class Search {

  constructor(songs){
    const thisSearch = this;

    thisSearch.songs = songs;
    thisSearch.categoryList = [];
    thisSearch.render();
    thisSearch.getCategory();
    thisSearch.filteringSongs();
  
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
    const selectElement = document.getElementById('select_category');
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


  createAudioElement(song) {
    const audioElement = document.createElement('audio');
    
    audioElement.src = `songs/${song.filename}`;
    
    return audioElement;

  }

  filteringSongs(){
    const thisSearch = this;
    const button = document.querySelector('.btn');
    const input = document.querySelector(select.containerOf.input);
    const selectCategories = document.getElementById('select_category');
    let selectedCategory;

    selectCategories.addEventListener('input', function (event) {
      event.preventDefault();
      selectedCategory = event.target.value;
      //console.log(selectedCategory);
    });

    button.addEventListener('click', function(event){
      event.preventDefault(); // Prevent form submission
      const inputString = input.value.toLowerCase();

      const playlistContainer = document.querySelector(select.containerOf.searchPlaylist);
      playlistContainer.innerHTML = '';
      console.log(playlistContainer);
    

      
      for (const song of thisSearch.songs) {
        const filenameParts = song.filename.replace('.mp3', '').replace('-','').split('_');
        const reversedParts = filenameParts.reverse();
        const fullName = `${reversedParts[1]} ${reversedParts[0]}`;

        thisSearch.songsData = {
          id: song.id,
          title: song.title,
          author: fullName,
          filename:`${song.filename}`,
          categories: song.categories,
          ranking: song.ranking,
        };

        const titleMatch = song.title.toLowerCase().includes(inputString);
        const authorMatch = fullName.toLowerCase().includes(inputString);
        
        thisSearch.matchedSongs = (titleMatch || authorMatch) && (song.categories.includes(selectedCategory) || selectedCategory == undefined || selectedCategory.includes('clean')); 

        console.log('title',song.title);
        //console.log('list',matchedSongs);


        if(thisSearch.matchedSongs == true){
         
          thisSearch.songsHTML = templates.singleSong(thisSearch.songsData); 
          thisSearch.songsHTML = thisSearch.songsHTML.replaceAll('play-song', 'search-song');
          playlistContainer.innerHTML += thisSearch.songsHTML; 

          const containerOfSong = document.querySelector('.search-song'+ song.id);

          thisSearch.audioElement = thisSearch.createAudioElement(song);
          playlistContainer.appendChild(thisSearch.audioElement);
      
          console.log('containerofaudio',thisSearch.containerOfSong);
          //console.log(playlistWrapper.innerHTML);
          //console.log(audioElement);',containerOfSong);
          //console.log(audioElement);  
          
        }
      }
      thisSearch.initGreenPlayer();
    });
  }


  render() {

    const generatedHTML = templates.searchPage();
    const searchContainer = document.querySelector(select.containerOf.search);

    searchContainer.innerHTML+= generatedHTML;

    const allElements = document.querySelectorAll('#upc'); // Use querySelectorAll to select all elements with ID 'upc'
  
    allElements.forEach(element => {
      element.textContent = element.textContent.toUpperCase(); // Convert text content to uppercase
    });

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