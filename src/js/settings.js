export const select = {
  
  templateOf: {
    pageHome: '#template-homepage-widget',
    singleSong: '#template-singlesong-widget',
    searchPage:'#template-search-page',
    discoverPage:'#template-discover-page',
    joinPage:'#template-join-page',
    categories: '#search_select',
    categoriesLink: '#template-categories-link',
  },

  containerOf: {
    home:'.home-container',
    search:'.search-container',
    discover:'.discover-container',
    join:'.join-container',
    subscribe: '.subscribe',
    playlist: '.playlist-wrapper',
    searchPlaylist: '.search-playlist-wrapper',
    discoverPlaylist: '.discover-playlist-wrapper',
    song: '.play-song',
    search_song: '.search-song',
    random_song: '.random-song',
    buttonSearch: '.btn',
    input: 'input',
    selectcategory: '#select_category',
    pages: '#pages',
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
  joinPage: Handlebars.compile(document.querySelector(select.templateOf.joinPage).innerHTML),
  categoriesLink: Handlebars.compile(document.querySelector(select.templateOf.categoriesLink).innerHTML),
};

export const settings = {

  db: {
    songs: 'songs',
  }
};