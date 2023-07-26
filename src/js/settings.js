export const select = {
  
  templateOf: {
    pageHome: '#template-homepage-widget',
  },

  containerOf: {
    home:'.home-wrapper',
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
};