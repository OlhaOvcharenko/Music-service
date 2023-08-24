
import {select,templates} from '../settings.js';

class Discover {
  constructor(playedSongs) {
    const thisDiscover = this;
    thisDiscover.playedSongs = playedSongs;

    thisDiscover.render();
    thisDiscover.randomSong();
  }

  createAudioElement(song) {
    const audioElement = document.createElement('audio');
    audioElement.src = `songs/${song.filename}`;
    return audioElement;
  }

  randomSong() {
    const thisDiscover = this;
    const playlistWrapper = document.querySelector(select.containerOf.discoverPlaylist);
    playlistWrapper.innerHTML = ''; // Clear previous content

    for (const song of thisDiscover.playedSongs) {
      const filenameParts = song.filename.replace('.mp3', '').replace(/-/g, '').split('_');
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

      const containerOfSong = playlistWrapper.querySelector(`[data-song-id="${song.id}"]`);

      const audioElement = thisDiscover.createAudioElement(song);
      containerOfSong.appendChild(audioElement);
    }

    thisDiscover.initGreenPlayer();
  }

  render() {
    const generatedHTML = templates.discoverPage();
    const discoverContainer = document.querySelector(select.containerOf.discover);

    discoverContainer.innerHTML = generatedHTML; // Replace existing content

    const allElements = document.querySelectorAll('[id^="upc-"]');

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