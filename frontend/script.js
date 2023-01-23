const loadEvent = function() {
  
    // Write your JavaScript code after this line
  
const rootElement = document.querySelector("#root");
console.log('Hello!');
rootElement.insertAdjacentHTML('beforeend', `<label for="place">Chose a city: </label><input type="text" id="city">`);


  
    // Write your JavaScript code before this line
  
  }
  
  window.addEventListener("load", loadEvent);