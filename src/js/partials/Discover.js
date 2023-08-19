import {select,templates} from '../settings.js';


class Discover {

  constructor(songs){
    const thisDiscover = this;
  
    thisDiscover.songs = songs;

    thisDiscover.render();
    //thisDiscover.randomSong(songs);
     
  }

  /*randomSong(songs) {
      const thisDiscover = this;
      const numberOfSongs = songs.length;

      const randomSong = Math.floor(Math.random() * numberOfSongs) + 1;

      const songData = [];

      for (const song of thisDiscover.songs) {
        /*const templateData = {
            id: song.id,
            title: song.title,
            author: song.author,
            categories: song.categories,
            ranking: song.ranking,
            file: song.filename,
            fileUrl: '<source src="./songs/' + song.filename + '" type="audio/mpeg">',
        };

        if (song.id == randomSong) {
          
          songData.push(song);

          const playlistContainer = document.querySelector(select.containerOf.discoverPlaylist);
    
          // Create a new playlist instance with the randomly selected song
          const playlistInstance = new Playlist(songData);
    
          // Append the playlist instance to the container
          playlistContainer.appendChild(playlistInstance.dom.playlistInstance);

        }
      }
      new Player(select.containerOf.songOfDiscoverPlaylist)
    }*/

  render() {
    const generatedHTML = templates.discoverPage();
    const discoverContainer = document.querySelector(select.containerOf.discover);
    
    discoverContainer.innerHTML+= generatedHTML;
    
    
    //console.log('HTML', generatedHTML);
  }
    
}

export default Discover;