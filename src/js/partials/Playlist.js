import {templates,select} from '../settings.js';
/*import utils from '../utils.js';*/


class Playlist {
  constructor(songs) {
    const thisPlaylist = this;

    thisPlaylist.songs = songs;

    thisPlaylist.generatePlaylist();
    //thisPlaylist.initGreenPlayer();
  }


  createAudioElement(song) {
    
    const audioElement = document.createElement('audio');
    
    audioElement.src = `songs/${song.filename}`;
    
    return audioElement;
  
  }
    
  generatePlaylist(){
    const thisPlaylist = this;
    const playlistContainer = document.querySelector(select.containerOf.playlist);
    //console.log(playlistContainer)
    // for every category (song)...
    for (const song of thisPlaylist.songs) {

      thisPlaylist.songsData = {
        id: song.id,
        title: song.title,
        author: song.author,
        filename:`${song.filename}`,
        categories: song.categories,
        ranking: song.ranking,
      };
      //console.log(thisPlaylist.songsData);

      thisPlaylist.songsHTML = templates.singleSong(thisPlaylist.songsData);
      //console.log(thisPlaylist.songsHTML);
    
    
      playlistContainer.innerHTML += thisPlaylist.songsHTML;

      //console.log(playlistContainer.innerHTML);

      const containerOfAudio = document.getElementById(song.id);
      const audioElement = thisPlaylist.createAudioElement(song);
      containerOfAudio.appendChild(audioElement);

    }
  } 

  
  /*initGreenPlayer(){
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: '.play-song', 
      stopOthersOnPlay: true,
    });
  }*/

}

export default Playlist;