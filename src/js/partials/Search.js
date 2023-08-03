import {select, templates} from '../settings.js';

class Search {

  constructor(data){
    const thisSearch = this;

    thisSearch.data = data;

    thisSearch.render();
    thisSearch.createPlaylist();
    //console.log(data);
   
  }

  createAudioElement(song) {
    const audioElement = document.createElement('audio');

    audioElement.src = `songs/${song.filename}`;

    return audioElement;
  }

  createPlaylist(){
    const thisSearch = this;

    // for every category (song)...
    for (const song of thisSearch.data) {
      // Create a new object representing the song with selected properties
      const songsObject = {
        id: song.id,
        title: song.title,
        author: song.author,
        filename:`songs/${song.filename}`,
        categories: song.categories,
        ranking: song.ranking,
      };

      const generatedSongHTML = templates.singleSong(songsObject); 
      const playlistContainer = document.querySelector(select.containerOf.searchPlaylist);
      playlistContainer.insertAdjacentHTML('beforeend', generatedSongHTML);
      //console.log(playlistContainer);

      const containerOfAudio = document.getElementById(song.id);
      
      const audioElement = thisSearch.createAudioElement(song);
      containerOfAudio.appendChild(audioElement);

    

    }

  }
  render() {
    const generatedHTML = templates.searchPage();
    const searchContainer = document.querySelector(select.containerOf.search);

    searchContainer.innerHTML+= generatedHTML;


   // console.log('HTML', generatedHTML);
  }

  initGreenPlayer(){
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: '.play-song', 
      stopOthersOnPlay: true,
      
    });
  }


}

export default Search;