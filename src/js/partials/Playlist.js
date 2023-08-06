import {templates,select} from '../settings.js';
/*import utils from '../utils.js';*/


class Playlist {
  constructor(songs) {
    const thisPlaylist = this;
  
    thisPlaylist.songs = songs;
    
    thisPlaylist.generatePlaylist();
    thisPlaylist.initGreenPlayer();
  
    
  }

  createAudioElement(song) {
    const audioElement = document.createElement('audio');
    
    audioElement.src = `songs/${song.filename}`;
    
    return audioElement;
  }
    
  generatePlaylist(){
    const thisPlaylist = this;
    const playlistContainer = document.querySelector(select.containerOf.playlist);
    // for every category (song)...
    for (const song of thisPlaylist.songs) {

      const songsData = {
        id: song.id,
        title: song.title,
        author: song.author,
        filename:`songs/${song.filename}`,
        categories: song.categories,
        ranking: song.ranking,
      };

      const generatedSongHTML = templates.singleSong(songsData);
      //const itemHTML = utils.createDOMFromHTML(generatedSongHTML);
      //playlistContainer.appendChild(itemHTML);

      playlistContainer.innerHTML += generatedSongHTML;

      const containerOfAudio = document.getElementById(song.id);
      const audioElement = thisPlaylist.createAudioElement(song);
      containerOfAudio.appendChild(audioElement);

      console.log(playlistContainer);
    }

  } 

  initGreenPlayer(){
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: '.play-song', 
      stopOthersOnPlay: true,
      
    });
  }

}

export default Playlist;