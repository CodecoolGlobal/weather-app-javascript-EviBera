let fetchURL = "http://api.weatherapi.com/v1/current.json?key=bbe8663248294c28b60135807232301&q=", city="Budapest";



const loadEvent = function() {
  
    // Write your JavaScript code after this line
  
    let fetchAPI = (fetchURL) =>{
        fetch(fetchURL)
            .then(function(response) {
                return response.json();
                })
            .then((data) => {

                if (fetchURL.includes('search')){
                  console.log('search data: ' + data);
                  document.querySelector("#citynames").innerHTML = '';
                  createDataList(data);
                };
                if (fetchURL.includes('current')){
                  console.log("weather")
                  console.log("current data: " + data);
                  displayWeather(data);
                  console.log(data);
                };

                })
            .catch(function(error) {
                console.log(error);
                });
        }

    //fetchWeather(fetchURL+city);
  
const rootElement = document.querySelector("#root");
rootElement.insertAdjacentHTML('beforeend', 
    `<label for="choice">Choose a city:</label>
    <input list="citynames" id="cities" name="city"></input>
    <datalist id="citynames"></datalist>`
  );


const selectElement = document.querySelector('#cities');


selectElement.addEventListener('input', (event) => {
  console.log(event.target.value);
  console.log(event.target.value.substring(0,3));
  
  if (event.target.value.length > 2) {
    city = event.target.value;
    fetchURL = "http://api.weatherapi.com/v1/search.json?key=bbe8663248294c28b60135807232301&q="+city;
    fetchAPI(fetchURL);
  }
});

const createDataList = (data) => {
  data.map(element => document.querySelector("#citynames").insertAdjacentHTML('beforeend', `<option value=${element["name"]}></option>`));
  
};


selectElement.addEventListener('change', (event) => {
    //console.log(event.target.value);
    city = event.target.value;
    fetchURL = "http://api.weatherapi.com/v1/current.json?key=bbe8663248294c28b60135807232301&q="+city;
    fetchAPI(fetchURL);
});

const wrapContent = (tag, text) => {
  return `<${tag}>${text}</${tag}>`
};

const displayWeather = (data) => {
  rootElement.insertAdjacentHTML('beforeend', `<div id="card"></div>`);
  const cardElement = document.querySelector("#card");
  cardElement.innerHTML = '';

  let textToHTML = wrapContent('div', ('sky conditions: ' + data.current.condition.text)) +
    wrapContent('div', ('humidity: ' + data.current.humidity)) +
    wrapContent('div', ('temperature (˚C): ' + data.current.temp_c)) +
    wrapContent('div', ('temperature (˚F): ' + data.current.temp_f));


  cardElement.insertAdjacentHTML('afterbegin', textToHTML);
  
};



    // Write your JavaScript code before this line
  
  }



  
  window.addEventListener("load", loadEvent);
