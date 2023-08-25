import {templates,select} from '../settings.js';

class Home {
  constructor(allSongs, playedSongs)  {
    const thisHome = this;

    thisHome.allSongs = allSongs;
    thisHome.playedSongs = playedSongs || [];
    thisHome.playedCategories = [];

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
    thisHome.initGreenPlayer();
    thisHome.playSongs(thisHome.allSongs);
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
    //const audioPlayers = document.querySelectorAll('.playlist');
    //console.log(audioPlayers);
    const links = document.querySelector('.list_of_categories');

    links.addEventListener('click', function(event) {
      event.preventDefault();
    
      const categoryItem = event.target;
      const clickedCategory = categoryItem.textContent.replace(',', '');
    
      // Remove 'active' class from previously clicked category
      const activeCategoryItem = links.querySelector('.active');
      if (activeCategoryItem) {
        activeCategoryItem.classList.remove('active');
      }
    
      // Toggle 'active' class on the clicked category item
      categoryItem.classList.toggle('active');
    
      if (thisHome.selectedCategory === clickedCategory) {
        // Reset to initial state if the same category is clicked again
        thisHome.selectedCategory = null;
        categoryItem.classList.remove('active');
      } else {
        thisHome.selectedCategory = clickedCategory;
      }
    
      // Show/hide songs based on the clicked category
      const allSongs = document.querySelectorAll('.playlist');
      allSongs.forEach(song => {
        const categoriesParagraph = song.querySelector('.song-details p#song-categories');
        const categoriesText = categoriesParagraph.textContent.replace('Categories:', '').trim();

        if (thisHome.selectedCategory) {
          if (categoriesText.includes(thisHome.selectedCategory)) {
            song.style.display = 'block'; // Show matched songs
          } else {
            song.style.display = 'none'; // Hide unmatched songs
          }
        } else {
          song.style.display = 'block'; // Show all songs when no category is selected
        }
      });
    });
  }

  playSongs(allSongs){

    const thisHome = this;
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
            if (!thisHome.playedCategories[category]) {
              thisHome.playedCategories[category] = 1;
            } else {
              thisHome.playedCategories[category]++;
            }
          }
          const favoriteCategoriesList = Object.entries(thisHome.playedCategories).sort((a,b) => b[1]-a[1]).map(el=>el[0]); 
          thisHome.mostPopularCategory = favoriteCategoriesList[0];

          console.log(thisHome.mostPopularCategory);
          console.log('Played Categories:', thisHome.playedCategories);

          for (const song of allSongs) {
            if (song.categories.includes(thisHome.mostPopularCategory)) {
              thisHome.playedSongs.push(song);
              console.log('listenedsongs', thisHome.playedSongs);
            }
          }
        }
      });
    } 
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