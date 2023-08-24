import {templates,select} from '../settings.js';

class Home {
  constructor(allSongs)  {
    const thisHome = this;

    thisHome.allSongs = allSongs;

    thisHome.categoryList = [];
    //console.log(thisHome.categoryList);
    thisHome.render();
    thisHome.generatePlaylist(thisHome.allSongs);

    thisHome.renderCategories(thisHome.allSongs);
    thisHome.filterByCategory();
  }

  createAudioElement(song) {
    
    const audioElement = document.createElement('audio');
    
    audioElement.src = `songs/${song.filename}`;
    
    return audioElement;
  
  }
    
  generatePlaylist(allSongs) {
    const thisHome = this;
    const playlistContainer = document.querySelector(select.containerOf.playlist);
   
    for (const song of allSongs) {
      
      const filename = song.filename || '';
      const filenameParts = filename.replace('.mp3', '').replace(/-/g, '').split('_');
      const reversedParts = filenameParts.reverse();
      const fullName = reversedParts[1] + ' ' + reversedParts[0];
      const uppercaseFullName = fullName.toUpperCase();
  
      const songData = {
        id: song.id,
        title: song.title,
        author: uppercaseFullName,
        filename: `${song.filename}`,
        categories: song.categories,
        ranking: song.ranking,
      };
  
      const songHTML = templates.singleSong(songData);
      playlistContainer.innerHTML += songHTML;
  
      const containerOfAudio = document.getElementById(song.id);
      const audioElement = thisHome.createAudioElement(song);
      containerOfAudio.appendChild(audioElement);
    }
    thisHome.initGreenPlayer(); // Move this line outside of the loop
  }

  renderCategories(allSongs) {
    const thisHome = this;

    const listOfCategories = document.querySelector('.all-categories');
    listOfCategories.innerHTML = ''; // Clear existing options

    for (const song of allSongs) {
      const categoriesOfSong = song.categories;

      for (const category of categoriesOfSong) {
        if (!thisHome.categoryList.includes(category)) {
          thisHome.categoryList.push(category);
        }
      }
    }

    const linkHTMLData = { categories: thisHome.categoryList };
    const linkHTML = templates.categoriesLink(linkHTMLData);
    listOfCategories.innerHTML = linkHTML;
  }

  filterByCategory() {
    const thisHome = this;
    const playlistContainer = document.querySelector(select.containerOf.playlist);
    const categoryList = document.querySelector('.list_of_categories');
  
    //add event on list of categories
    categoryList.addEventListener('click', function(event) {
      event.preventDefault();
      
      //define clicked item
      const categoryItem = event.target;

      // Add 'active' class to the clicked item
      categoryItem.classList.toggle('active');
  
      const clickedCategory = event.target.textContent.replace(',', '');
  
      playlistContainer.innerHTML = '';
  
      if (thisHome.selectedCategory === clickedCategory) {
        // Reset back to initial state if the same category is clicked again
        thisHome.selectedCategory = null;
        thisHome.generatePlaylist(thisHome.allSongs); // Display all songs
      
      } else {

        //find previously clecked category with class active
        const activeCategoryItem = categoryList.querySelector('.active');

        if (activeCategoryItem) {
          activeCategoryItem.classList.remove('active');
        }

        // Add 'active' class to the currently clicked category
        categoryItem.classList.add('active');

        // Filter songs by the clicked category
        

        thisHome.selectedCategory = clickedCategory;
        thisHome.filteredSongs = thisHome.allSongs.filter(song =>
          song.categories.includes(clickedCategory));

        thisHome.generatePlaylist(thisHome.filteredSongs);
      }
    });
  }
  

  render() {

    const generatedHTML = templates.pageHome();
    const homeContainer = document.querySelector(select.containerOf.home);

    homeContainer.innerHTML+= generatedHTML;

    const allElements = document.querySelectorAll('[id^="upc-"]'); // Use querySelectorAll to select all elements with ID 'upc'
  
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