import {select, classNames} from './settings.js';
import Home from './partials/Home.js';
import Search from './partials/Search.js';
import Discover from './partials/Discover.js';

const app = {

  
  /*initHome: function() {

    const thisApp = this;

    // Get the home container and the corresponding data
    thisApp.homeContainer = document.querySelector(select.containerOf.home);
    thisApp.home = new Home(thisApp.homeContainer);
    
  },*/

  /* initSearch: function() {

    const thisApp = this;

    thisApp.searchContainer = document.querySelector(select.containerOf.search);
    thisApp.search = new Search(thisApp.searchContainer);
    
  },*/

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

  /*initPlaylist(){
    const thisApp = this;
    // console.log('thisApp.data:', thisApp.data);
    for (let song in thisApp.data.allSongs) {
      new Home(thisApp.data.allSongs[song]);
    }

  },*/

  initData: function() {
    const thisApp = this;

    thisApp.songs =  {};

    const url = '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : '') + '/' + 'songs';
    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        thisApp.songs = parsedResponse;

        new Home(thisApp.songs);
        new Search(thisApp.songs);
        new Discover(thisApp.songs);
        
        
        thisApp.initPages();
        //console.log('thisHome.data', JSON.stringify(thisHome.data.songs));
      });
  },
  

  init: function() {
    const thisApp = this;
    thisApp.initData();
  },

};
  
app.init();