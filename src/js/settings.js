export const select = {
  
  templateOf: {
    pageHome: '#template-homepage-widget',
    singleSong: '#template-singlesong-widget',
    searchPage:'#template-search-page',
  },

  containerOf: {
    home:'.home-wrapper',
    search:'.search-wrapper',
    discover:'.discover-wrapper',
    pages: '#pages',
    subscribe: '.subscribe',
    playlist: '.playlist-wrapper',
    song: '.play-song',
    buttonSearch: '.btn',
  },

  nav: {
    links: '.main-nav a',
  },

};

export const classNames = {
  nav: {
    active: 'active',
  },
  pages: {
    active: 'active',
  },
};

export const templates = {
  pageHome: Handlebars.compile(document.querySelector(select.templateOf.pageHome).innerHTML),
  singleSong: Handlebars.compile(document.querySelector(select.templateOf.singleSong).innerHTML),
  searchPage: Handlebars.compile(document.querySelector(select.templateOf.searchPage).innerHTML),
};

export const settings = {

  db: {
    songs: 'songs',
  }
};