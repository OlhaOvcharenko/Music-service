import {select,templates} from '../settings.js';

class Discover {

  constructor(songs){
    const thisDiscover = this;
  
    thisDiscover.songs = songs;

    thisDiscover.render();
    thisDiscover.randomSong(songs);
     
  }

  createAudioElement(song) {
    const audioElement = document.createElement('audio');
    
    audioElement.src = `songs/${song.filename}`;
    
    return audioElement;

  }


  randomSong(songs) {
    const thisDiscover = this;
    const numberOfSongs = songs.length;

    const randomSong = Math.floor(Math.random() * numberOfSongs) + 1;

    for (const song of thisDiscover.songs) {

      const filenameParts = song.filename.replace('.mp3', '').replace('-','').split('_');
      const reversedParts = filenameParts.reverse();
      const fullName = reversedParts[1] + ' ' + reversedParts[0];
      //console.log(reversedParts, 'fullname',fullName);
        
      const templateData = {
        id: song.id,
        title: song.title,
        author: fullName,
        categories: song.categories,
        ranking: song.ranking,
        file: song.filename,
      };

      if (song.id == randomSong) {
          
        const playlistWrapper = document.querySelector(select.containerOf.discoverPlaylist);

        thisDiscover.songsHTML = templates.singleSong(templateData); 
        thisDiscover.songsHTML = thisDiscover.songsHTML.replaceAll('play-song', 'random-song');
        playlistWrapper.innerHTML += thisDiscover.songsHTML; 
        //console.log(playlistWrapper.innerHTML);
          
        const containerOfSong = document.querySelector(select.containerOf.random_song);
          
        const audioElement = thisDiscover.createAudioElement(song);
        containerOfSong.appendChild(audioElement);
      
        //console.log('containerofaudio',containerOfSong);
        //console.log(audioElement);
      }
    }
    thisDiscover.initGreenPlayer();

  }

  render() {
    const generatedHTML = templates.discoverPage();
    const discoverContainer = document.querySelector(select.containerOf.discover);
    
    discoverContainer.innerHTML+= generatedHTML;

    const allElements = document.querySelectorAll('#upc'); // Use querySelectorAll to select all elements with ID 'upc'
  
    allElements.forEach(element => {
      element.textContent = element.textContent.toUpperCase(); // Convert text content to uppercase
    });
  
    //console.log('HTML', generatedHTML);
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