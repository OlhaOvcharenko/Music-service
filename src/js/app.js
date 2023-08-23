import {select, classNames} from './settings.js';
import Home from './partials/Home.js';
import Search from './partials/Search.js';
import Discover from './partials/Discover.js';
import Join from './partials/Join.js';

const app = {
  
  initPages: function() {
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    //console.log(thisApp.pages);
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#/', '');
    
    
    let pageMatchingHash = thisApp.pages[0].id;
    
    for(let page of thisApp.pages){
      if(page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
        
      }
    }
    //console.log('pageMatchingHash2', pageMatchingHash);
    thisApp.activatePage(pageMatchingHash);
    
    for(let link of thisApp.navLinks){
      link.addEventListener('click', (event)=>{

        const clickedElement = event.currentTarget;
        event.preventDefault();
        //console.log('clickedElement', clickedElement);

        // get page ID from href attr.
        const id = clickedElement.getAttribute('href').replace('#', '');
        //console.log(clickedElement,'clickedElement');
        // run thisApp.activatePage() with ID
        thisApp.activatePage(id);
        //console.log(id, 'id');
        // change URL hash, add / to prevent scrolling to #

        window.location.hash = '#/' + id;

      });
    }

  },

  activatePage: function(pageId){

    const thisApp = this;

    for(let page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }
    for(let link of thisApp.navLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
  },

  initData: function() {
    const thisApp = this;

    thisApp.songs =  {};
    console.log(thisApp.songs);

    const url = '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : '') + '/' + 'songs';
    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        thisApp.songs = parsedResponse;
        console.log(parsedResponse);
      
        new Home(thisApp.songs);
        new Search(thisApp.songs);
        //new Discover(thisApp.songs);
        new Join(thisApp.songs);
          
        thisApp.initPages();
        //console.log('thisHome.data', JSON.stringify(thisHome.data.songs));
      });
  },

  createAudioElement(song) {
    const audioElement = document.createElement('audio');
    audioElement.src = `songs/${song.filename}`;
    return audioElement;
  },

  /*getData(){
    const thisApp= this;

    const filenameParts = song.filename.replace('.mp3', '').replace('-','').split('_');
    const reversedParts = filenameParts.reverse();
    const fullName = reversedParts[1] + ' ' + reversedParts[0];
    const uppercaseFullName = fullName.toUpperCase(); 

    const getSongsSummary = {};
    
    getSongsSummary.id = thisApp.id;
    getSongsSummary.title = thisApp.title;
    getSongsSummary.author = uppercaseFullName;
    getSongsSummary.filename = thisApp.filename;
    getSongsSummary.categories = thisApp.categories;
    getSongsSummary.ranking = thisApp.ranking;
    getSongsSummary.audioElement = createAudioElement(song);

    return getSongsSummary;

  },*/

  
  initPopularSongs: function() {
    const thisApp = this;
    thisApp.discoverPageId = document.getElementById('discover');
    const popularSongs = [];

    for (const song of Object.values(thisApp.songs)) {
      const audio = thisApp.createAudioElement(song);

      audio.addEventListener('play', function(event) {
        const clickedAudio = event.target;

        if (clickedAudio) {
          popularSongs.push(song);
        }
      });
    }

    thisApp.discoverPageId.addEventListener('click', function(event) {
      event.preventDefault();

      const mostListenedCategory = thisApp.getMostListenedCategory();
      const songsInCategory = popularSongs.filter(song => song.category === mostListenedCategory);

      if (songsInCategory.length > 0) {
        const randomSong = songsInCategory[Math.floor(Math.random() * songsInCategory.length)];
        new Discover(randomSong);
      } else {
        console.log('No songs available in the most listened category.');
      }
    });
  },

  getMostListenedCategory: function() {
    const thisApp = this;
    let mostListenedCategory = '';
    let maxCount = 0;

    for (const category in thisApp.categoryCounts) {
      if (thisApp.categoryCounts.hasOwnProperty(category)) {
        const count = thisApp.categoryCounts[category];
        if (count > maxCount) {
          maxCount = count;
          mostListenedCategory = category;
        }
      }
    }

    return mostListenedCategory;
  },


  init: function() {
    const thisApp = this;
    thisApp.initData();
    thisApp.initPopularSongs();
  },

};
  
app.init();