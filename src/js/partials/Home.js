import {templates, select} from '../settings.js';

class Home {
  constructor(element){
    const thisHome = this;
    
    thisHome.render(element);
    thisHome.initGreenPlayer();
  }
  
  render(element) {
    const thisHome = this;
  
    const generatedHTML = templates.pageHome();
  
    thisHome.dom = {};
    thisHome.dom.wrapper = element;
  
    element.innerHTML = generatedHTML;
    //console.log(generatedHTML);
  }

  initGreenPlayer(){
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: '.play-song', // inits Green Audio Player on each audio container that has class "player"
      stopOthersOnPlay: true,
   });
  }
}


export default Home;