export const select = {
  
  templateOf: {
    pageHome: '#template-homepage-widget',
    singleSong: '#template-singlesong-widget',
    searchPage:'#template-search-page',
    discoverPage:'#template-discover-page',
    categories: '#search_select',
  },

  containerOf: {
    home:'.home-wrapper',
    search:'.search-wrapper',
    discover:'.discover-wrapper',
    pages: '#pages',
    subscribe: '.subscribe',
    playlist: '.playlist-wrapper',
    song: '.play-song',
    search_song: '.search-song',
    random_song: '.random-song',
    buttonSearch: '.btn',
    searchPlaylist: '.search-playlist-wrapper',
    discoverPlaylist: '.discover-playlist-wrapper',
    songOfDiscoverPlaylist: 'discover-playlist-wrapper .play-song',
    input: 'input',
    selectcategory: '#select_category',
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
  discoverPage: Handlebars.compile(document.querySelector(select.templateOf.discoverPage).innerHTML),
};

export const settings = {

  db: {
    songs: 'songs',
  }
};