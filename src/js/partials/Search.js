import { templates} from '../settings.js';

class Search {

  constructor(element,){
    const thisSearch = this;
    thisSearch.render(element);
    thisSearch.songsSearch();
  }


 songsSearch(){

  const searchButton = document.getElementById("search");

  searchButton.addEventListener("click", function (event) {
    event.preventDefault();

    let searchInputValue = document.getElementById("song-name").value;
    const filteredSongs = []; // Change from object to array

    for (const song of thisHome.data.songs) {
      // Create a new object representing the song with selected properties
      const songObject = {
        id: song.id,
        title: song.title,
        author: song.author,
        filename: `songs/${song.filename}`,
        categories: song.categories,
        ranking: song.ranking,
      };

      // Use strict equality === or loose equality == for comparison
      if (searchInputValue === songObject.title) {
        filteredSongs.push(songObject); // Change from filteredSongs[song] to filteredSongs.push(...)
      }
    }

    console.log(filteredSongs);
  });
}

  render(element) {
    const thisSearch = this;

    const generatedHTML = templates.searchPage();

    thisSearch.dom = {};
    thisSearch.dom.wrapper = element;

    element.innerHTML = generatedHTML;

   // console.log('HTML', generatedHTML);
  }


}

export default Search;