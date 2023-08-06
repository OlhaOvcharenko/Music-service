import {templates,select} from '../settings.js';
import Playlist from './Playlist.js';

class Home {
  constructor(songs) {
    const thisHome = this;

    thisHome.songs = songs;

    thisHome.render();
    //thisHome.createPlaylist();
    //thisHome.initGreenPlayer();

    // Create an instance of the Playlist class with the songs array
    thisHome.playlistInstance = new Playlist(thisHome.songs);

  }

  /*createAudioElement(song) {
    const audioElement = document.createElement('audio');

    audioElement.src = `songs/${song.filename}`;

    return audioElement;
  }

  createPlaylist(){
    const thisHome = this;

    // for every category (song)...
    for (const song of thisHome.songs) {
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

  }*/

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