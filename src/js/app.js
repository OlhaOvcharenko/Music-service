import {select, classNames} from './settings.js';
import Home from './partials/Home.js';
import Search from './partials/Search.js';
import Discover from './partials/Discover.js';
import Join from './partials/Join.js';

const app = {


  playedSongs: [],

  pageInitHome: function() {
    const thisApp = this;

    thisApp.homeInstance = new Home(thisApp.songs);
  },
  
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

    thisApp.songs = {};
    //console.log(thisApp.songs);

    const url = '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : '') + '/' + 'songs';
    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (data) {
        thisApp.songs = data;
        //console.log(data);
      
        thisApp.pageInitHome(thisApp.songs);

        new Search(thisApp.songs);
        new Join(thisApp.songs);
          
        thisApp.initPages();
      });
  },

  initPopularSongs: function() {
    const thisApp = this;
    thisApp.discoverPageId = document.getElementById('discover');
  
    const audioElements = document.querySelectorAll('.play-songs');
    const allCategories = document.querySelectorAll('.list_of_categories li a'); // Select all category links
    const categories = Array.from(allCategories).map(categoryLink => categoryLink.textContent);
    let favoriteCategories = {};

    for(let audioElement of audioElements){

      const playerAudio = audioElement.querySelector('audio');

      playerAudio.addEventListener('play', function(e){
        e.preventDefault(); 

        for (let category of categories) {
    
          if(!favoriteCategories[category]){
            favoriteCategories[category] = 1;
          } else {
            favoriteCategories[category]++;
          }
        }
        const favoriteCategoriesList = Object.entries(favoriteCategories).sort((a,b) => b[1]-a[1]).map(el=>el[0]); 
        thisApp.mostPopularCategory = favoriteCategoriesList[0];
      }
      );}

    thisApp.discoverPageId.addEventListener('click', function(event) {
      event.preventDefault();
  
      if (thisApp.mostPopularCategory) {
        const songsInCategory = Object.values(thisApp.songs).filter(song =>
          song.categories.includes(thisApp.mostPopularCategory) &&
          !app.playedSongs.includes(song.id) // Filter out played songs
        );
  
        if (songsInCategory.length > 0) {
          const randomSong = songsInCategory[Math.floor(Math.random() * songsInCategory.length)];
          new Discover(randomSong);
        } else {
          console.log('No songs available in the most listened category.');
        }
      } else {
        console.log('No most listened category found.');
      }
    });
  },



  init: function() {
    const thisApp = this;
    thisApp.initData();
    thisApp.initPopularSongs();
  },

};
  
app.init();