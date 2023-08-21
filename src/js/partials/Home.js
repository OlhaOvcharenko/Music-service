import {templates,select} from '../settings.js';

class Home {
  constructor(songs) {
    const thisHome = this;

    thisHome.songs = songs;

    thisHome.categoryList = [];
   
    console.log('allcategories', thisHome.categoryList);
    thisHome.render();
    thisHome.generatePlaylist(thisHome.songs);
    thisHome.renderCategories();
    thisHome.filterByCategory();
  }

  createAudioElement(song) {
    
    const audioElement = document.createElement('audio');
    
    audioElement.src = `songs/${song.filename}`;
    
    return audioElement;
  
  }
    
  generatePlaylist(songs){
    const thisHome = this;
    const playlistContainer = document.querySelector(select.containerOf.playlist);
    //console.log(playlistContainer)
    // for every category (song)...
    for (const song of songs) {

      const filenameParts = song.filename.replace('.mp3', '').replace('-','').split('_');
      const reversedParts = filenameParts.reverse();
      const fullName = reversedParts[1] + ' ' + reversedParts[0];
      const uppercaseFullName = fullName.toUpperCase(); 

      //console.log(reversedParts, 'fullname',fullName);

      const songData = {
        id: song.id,
        title: song.title,
        author: uppercaseFullName,
        filename:`${song.filename}`,
        categories: song.categories,
        ranking: song.ranking,
      };
      //console.log(thisPlaylist.songsData);
        
      const songHTML = templates.singleSong(songData);
      //console.log(thisPlaylist.songsHTML);
      playlistContainer.innerHTML += songHTML;

      //console.log(playlistContainer.innerHTML);

      const containerOfAudio = document.getElementById(song.id);
      const audioElement = thisHome.createAudioElement(song);
      containerOfAudio.appendChild(audioElement);

    }
    thisHome.initGreenPlayer();
  } 

  renderCategories(){
    const thisHome = this;

    for (const song of thisHome.songs) {

      const categoriesOfSong = song.categories;

      for (const category of categoriesOfSong) {
        if (!thisHome.categoryList.includes(category)) {
          thisHome.categoryList.push(category); // Corrected to use "categoryList" instead of "categories"
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
  }

  filterByCategory() {
    const thisHome = this;
    const playlistContainer = document.querySelector(select.containerOf.playlist);
    const categoryList = document.querySelector('.list_of_categories');
  
    categoryList.addEventListener('click', function(event) {
      event.preventDefault();
  
      const categoryItem = event.target;
      // Add 'active' class to the clicked category
      categoryItem.classList.toggle('active');
  
      const clickedCategory = event.target.textContent;
  
      playlistContainer.innerHTML = '';
  
      thisHome.filteredSongs = thisHome.songs.filter(song =>
        song.categories.includes(clickedCategory));
  
      thisHome.generatePlaylist(thisHome.filteredSongs);

    });
  }

  render() {

    const generatedHTML = templates.pageHome();
    const homeContainer = document.querySelector(select.containerOf.home);

    homeContainer.innerHTML+= generatedHTML;

    const allElements = document.querySelectorAll('#upc'); // Use querySelectorAll to select all elements with ID 'upc'
  
    allElements.forEach(element => {
      element.textContent = element.textContent.toUpperCase(); // Convert text content to uppercase
    });
  }

  initGreenPlayer(){
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: '.play-song', 
      stopOthersOnPlay: true,
    });
  }


}


export default Home;