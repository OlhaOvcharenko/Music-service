import {templates,select} from '../settings.js';
import Playlist from './Playlist.js';

class Home {
  constructor(songs) {
    const thisHome = this;

    thisHome.songs = songs;

    thisHome.render();
  
    thisHome.playlistInstance = new Playlist(thisHome.songs);
    thisHome.initGreenPlayer();
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