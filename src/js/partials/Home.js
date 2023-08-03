import {templates,select} from '../settings.js';
import Search from './Search.js';

class Home {
  constructor(data) {
    const thisHome = this;

    thisHome.data = data;

    thisHome.render();
    thisHome.createPlaylist();
    thisHome.initGreenPlayer();
    //thisHome.getSongData();

    //console.log(data)

  }

  /*getSongData() {
    const thisHome = this;

    thisHome.data =  {};

    const url = '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : '') + '/' + 'songs';
    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        thisHome.allSongs = parsedResponse;
        thisHome.createPlaylist();
        thisHome.initGreenPlayer();
        //console.log('thisHome.data', JSON.stringify(thisHome.data.songs));
      });
  }*/

  createAudioElement(song) {
    const audioElement = document.createElement('audio');

    audioElement.src = `songs/${song.filename}`;

    return audioElement;
  }

  createPlaylist(){
    const thisHome = this;

    // for every category (song)...
    for (const song of thisHome.data) {
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
      const playlistContainer = document.querySelector(select.containerOf.playlist);
      playlistContainer.insertAdjacentHTML('beforeend', generatedSongHTML);
      //console.log(playlistContainer);

      const containerOfAudio = document.getElementById(song.id);
      
      const audioElement = thisHome.createAudioElement(song);
      containerOfAudio.appendChild(audioElement);

    }

  }

  render() {

    const generatedHTML = templates.pageHome();
    const homeContainer = document.querySelector(select.containerOf.home);

    homeContainer.innerHTML+= generatedHTML;

    //console.log('HTML', generatedHTML);
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