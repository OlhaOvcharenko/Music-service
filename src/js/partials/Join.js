
import {select,templates} from '../settings.js';

class Join {
  constructor() {
    const thisJoin = this;

    thisJoin.render();
  }

  render() {
    const generatedHTML = templates.joinPage();
    const joinContainer = document.querySelector(select.containerOf.join);

   joinContainer.innerHTML = generatedHTML; // Replace existing content

    const allElements = document.querySelectorAll('#upc'); // Use querySelectorAll to select all elements with ID 'upc'
  
    allElements.forEach(element => {
      element.textContent = element.textContent.toUpperCase(); // Convert text content to uppercase
    });
  }
}
  
export default Join;