const loadEvent = function() {
  
    // Write your JavaScript code after this line
  
const rootElement = document.querySelector("#root");
rootElement.insertAdjacentHTML('beforeend', `<label for="place">Chose a city: </label><input type="text" id="city">`);

const cityInputElement = document.querySelector("#city");
cityInputElement.addEventListener('input', function(event) {
  console.log(event.target.value, event.target.value.substring(0, 3))
})
  
    // Write your JavaScript code before this line
  
  }
  
  window.addEventListener("load", loadEvent);