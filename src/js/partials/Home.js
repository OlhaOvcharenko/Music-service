import {templates, settings, select} from '../settings.js';

class Home {
  constructor(element){
    const thisHome = this;

    thisHome.render(element);

    thisHome.getSongData();
    thisHome.initGreenPlayer();
  
  }

  getSongData() {
    const thisHome = this;

    thisHome.data =  {};

    const url = settings.db.url + '/' + settings.db.songs;
    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        thisHome.data.songs = parsedResponse;
        thisHome.createPlaylist();
        console.log('thisHome.data', JSON.stringify(thisHome.data.songs));
      })
  }
  
  createPlaylist(){
    const thisHome = this;

    for (const songData of thisHome.data.songs) {

      const generatedSongHTML = templates.singleSong(songData); 
      const playlistContainer = document.querySelector(select.containerOf.playlist);
      playlistContainer.insertAdjacentHTML('beforeend', generatedSongHTML);
      console.log(playlistContainer);

    }
  }

  render(element) {
    const thisHome = this;

    const generatedHTML = templates.pageHome();

    thisHome.dom = {};
    thisHome.dom.wrapper = element;

    element.innerHTML = generatedHTML;

    //console.log('HTML', generatedHTML);
  }


  initGreenPlayer(){
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: '.play-box .play-song', 
      stopOthersOnPlay: true,
    });
  }
}


export default Home;