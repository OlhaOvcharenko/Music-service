import {select,templates} from '../settings.js';
class Search {

  constructor(allSongs, playedSongs){
    const thisSearch = this;

    thisSearch.allSongs = allSongs;
    thisSearch.playedSongs = playedSongs || [];
    console.log(thisSearch.playedSongs);

    thisSearch.playedCategories = [];

    thisSearch.categoryList = [];

    thisSearch.render();
    thisSearch.getCategory(thisSearch.allSongs);
    thisSearch.filteringSongs(thisSearch.allSongs);
    //thisSearch.collectPlayedSongs(thisSearch.allSongs);
  
  }

  getCategory(allSongs){
    const thisSearch = this;

    for (const song of allSongs) {
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

  filteringSongs(allSongs) {
    const thisSearch = this;
    const button = document.querySelector('.btn');
    const input = document.querySelector(select.containerOf.input);
    const selectCategories = document.getElementById('select_category');
    let selectedCategory = '';
  
    selectCategories.addEventListener('input', function (event) {
      event.preventDefault();
      selectedCategory = event.target.value;
    });
  
    button.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent form submission
      const inputString = input.value.toLowerCase().trim(); // Trim the input
  
      const playlistContainer = document.querySelector(select.containerOf.searchPlaylist);

      playlistContainer.innerHTML = '';
  
      for (const song of allSongs) {
        const filenameParts = song.filename.replace('.mp3', '').replace(/-/g, '').split('_'); // Replace all '-' occurrences
        const reversedParts = filenameParts.reverse();
        const fullName = `${reversedParts[1]} ${reversedParts[0]}`;
  
        const searchedSong = 'searched-song' + '-' + song.id;
  
        const songHTMLData = {
          id: searchedSong,
          title: song.title,
          author: fullName,
          filename: `${song.filename}`,
          categories: song.categories,
          ranking: song.ranking,
        };
  
        const titleMatch = song.title.toLowerCase().includes(inputString);
        const authorMatch = fullName.toLowerCase().includes(inputString);
        const categoryMatch = (
          (selectedCategory === '' || selectedCategory.includes('clean')) ||
          (song.categories.includes(selectedCategory) &&
           ((titleMatch && authorMatch) || (titleMatch || authorMatch)))
        );
        if ((titleMatch || authorMatch) && categoryMatch) {
          const songHTML = templates.singleSong(songHTMLData);
          playlistContainer.innerHTML += songHTML; 
          
          const songContainer = document.getElementById(searchedSong);
  
          songContainer.classList.remove('play-song');
          songContainer.classList.add('searched-song');
  
          const audioElement = thisSearch.createAudioElement(song);
          songContainer.appendChild(audioElement);
        }
      }
      thisSearch.initGreenPlayer();
      thisSearch.playSongs(thisSearch.allSongs);
    });
  }

  playSongs(allSongs){

    const thisSearch = this;
    const audioPlayers = document.querySelectorAll('.playlist');

    for(let audioElement of audioPlayers){
    const audio = audioElement.querySelector('audio');

    audio.addEventListener('play', function(event){
      event.preventDefault(); 
      console.log(audio);
      const categoriesParagraph = audioElement.querySelector('.song-details p#song-categories');
      const categoriesText = categoriesParagraph.textContent.replace('Categories:', '').trim();

      if (categoriesText !== '') {
        const categoriesArray = categoriesText.split(',').map(category => category.trim());
        console.log(categoriesArray);
        for (let category of categoriesArray) {
          if (!thisSearch.playedCategories[category]) {
            thisSearch.playedCategories[category] = 1;
          } else {
            thisSearch.playedCategories[category]++;
          }
        }
        const favoriteCategoriesList = Object.entries(thisSearch.playedCategories).sort((a,b) => b[1]-a[1]).map(el=>el[0]); 
        thisSearch.mostPopularCategory = favoriteCategoriesList[0];

        console.log(thisSearch.mostPopularCategory);
        console.log('Played Categories:', thisSearch.playedCategories);

        for (const song of allSongs) {
          if (song.categories.includes(thisSearch.mostPopularCategory)) {
            thisSearch.playedSongs.push(song);
            console.log('listenedsongs', thisSearch.playedSongs);
          }
        }
      }
      });
    } 
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
      selector: '.searched-song', 
      stopOthersOnPlay: true,
    });
  }

}

export default Search;