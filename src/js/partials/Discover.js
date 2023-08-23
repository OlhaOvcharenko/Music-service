import {select,templates} from '../settings.js';

class Discover {

  constructor(randomSong){
    const thisDiscover = this;
  
    thisDiscover.render();
    thisDiscover.randomSong(randomSong);
     
  }

  createAudioElement(song) {
    const audioElement = document.createElement('audio');
    audioElement.src = `songs/${song.filename}`;
    return audioElement;
  }

  randomSong(randomSong) {
    const thisDiscover = this;
    const playlistWrapper = document.querySelector(select.containerOf.discoverPlaylist);
    
    for (const song of randomSong) {
      const filenameParts = song.filename.replace('.mp3', '').replace('-', '').split('_');
      const reversedParts = filenameParts.reverse();
      const fullName = reversedParts[1] + ' ' + reversedParts[0];

      const templateData = {
        id: song.id,
        title: song.title,
        author: fullName,
        categories: song.categories,
        ranking: song.ranking,
        file: song.filename,
      };

      thisDiscover.songsHTML = templates.singleSong(templateData);
      thisDiscover.songsHTML = thisDiscover.songsHTML.replaceAll('play-song', 'random-song');
      playlistWrapper.innerHTML += thisDiscover.songsHTML;

      const containerOfSong = document.querySelector(select.containerOf.random_song);

      const audioElement = thisDiscover.createAudioElement(song);
      containerOfSong.appendChild(audioElement);
    }

    thisDiscover.initGreenPlayer();
  }

  render() {
    const generatedHTML = templates.discoverPage();
    const discoverContainer = document.querySelector(select.containerOf.discover);

    discoverContainer.innerHTML += generatedHTML;

    const allElements = document.querySelectorAll('[id^="upc-"]');

    allElements.forEach(element => {
      element.textContent = element.textContent.toUpperCase();
    });
  }

  initGreenPlayer(){
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: '.random-song', 
      stopOthersOnPlay: true,
    });
  }
    
}

export default Discover;