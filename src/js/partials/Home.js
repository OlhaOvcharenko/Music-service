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

    const url = '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : '') + '/' + 'songs';
    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        thisHome.data.songs = parsedResponse;
        thisHome.createPlaylist();
        console.log('thisHome.data', JSON.stringify(thisHome.data.songs));
      });
  }

  createAudioElement(song) {
    const audioElement = document.createElement('audio');
    audioElement.controls = true;
    audioElement.src = `songs/${song.filename}`;

    return audioElement;
  }

  createPlaylist(){
    const thisHome = this;

    // for every category (song)...
    for (const song of thisHome.data.songs) {
      // Create a new object representing the song with selected properties
      const songObject = {
        id: song.id,
        title: song.title,
        author: song.author,
        filename:`songs/${song.filename}`,
        categories: song.categories,
        ranking: song.ranking,
      };

      const generatedSongHTML = templates.singleSong(songObject); 
      const playlistContainer = document.querySelector(select.containerOf.playlist);
      playlistContainer.insertAdjacentHTML('beforeend', generatedSongHTML);
      console.log(playlistContainer);

      const containerOfAudio = document.querySelector(select.containerOf.song);
      
      const audioElement = thisHome.createAudioElement(song);
      playlistContainer.appendChild(audioElement);
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