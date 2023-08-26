
import {select,templates} from '../settings.js';

class Discover {
  constructor(playedSongs) {
    const thisDiscover = this;

    thisDiscover.render();
    thisDiscover.randomSong(playedSongs);
  }

  createAudioElement(song) {
    const audioElement = document.createElement('audio');
    audioElement.src = `songs/${song.filename}`;
    return audioElement;
  }

  randomSong(playedSongs) {
    const thisDiscover = this;

    const numberofSongs=playedSongs.length;
    console.log(numberofSongs);

    const randomIndex = Math.floor(Math.random() * playedSongs.length);
    const randomSong = playedSongs[randomIndex];
    if( playedSongs.length > 0){
    //console.log(randomSong);

      const playlistWrapper = document.querySelector(select.containerOf.discoverPlaylist);
      playlistWrapper.innerHTML = ''; // Clear previous content

      if(randomSong) {
        const filenameParts = randomSong.filename.replace('.mp3', '').replace(/-/g, '').split('_');
        const reversedParts = filenameParts.reverse();
        const fullName = reversedParts[1] + ' ' + reversedParts[0];
        const uppercaseFullName = fullName.toUpperCase();
        const discoverSong = 'discover-song' + '-' + randomSong.id;

        const templateData = {
          id: discoverSong,
          title: randomSong.title,
          author: uppercaseFullName,
          categories: randomSong.categories,
          ranking: randomSong.ranking,
          file: randomSong.filename,
        };

        thisDiscover.songsHTML = templates.singleSong(templateData);
        thisDiscover.songsHTML = thisDiscover.songsHTML.replaceAll('play-song', 'random-song');
        playlistWrapper.innerHTML += thisDiscover.songsHTML;


        const containerOfSong = document.getElementById(discoverSong);
        const audioElement = thisDiscover.createAudioElement(randomSong);
        containerOfSong.appendChild(audioElement);
      }
    } else {
      const messageWrapper = document.querySelector('.no-songs-message');
      const newElem = document.createElement('h3');
      newElem.textContent = 'No songs have been discovered yet. Listen to our music and we will prepare a special song for you!';
      console.log(newElem.textContent);

      // Insert the new <h3> element's content before the end of messageWrapper
      messageWrapper.insertAdjacentHTML('beforeend', newElem.textContent);
    
    }

    thisDiscover.initGreenPlayer();
  }

  render() {
    const generatedHTML = templates.discoverPage();
    const discoverContainer = document.querySelector(select.containerOf.discover);

    discoverContainer.innerHTML = generatedHTML; 

    const allElements = document.querySelectorAll('#upc'); 
    allElements.forEach(element => {
      element.textContent = element.textContent.toUpperCase(); 
    });
  }

  initGreenPlayer() {
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: '.random-song',
      stopOthersOnPlay: true,
    });
  }
}

export default Discover;