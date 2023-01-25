let fetchURL = "http://api.weatherapi.com/v1/current.json?key=bbe8663248294c28b60135807232301&q=", city="Budapest";

const rootElement = document.querySelector("#root");
rootElement.insertAdjacentHTML('beforeend', `<div hidden id="spinner"></div>`);
const spinner = document.getElementById("spinner");


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
          spinner.setAttribute('hidden', '');
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
    spinner.removeAttribute('hidden');
    //console.log(event.target.value);
    city = event.target.value;
    fetchURL = "http://api.weatherapi.com/v1/current.json?key=bbe8663248294c28b60135807232301&q="+city;
    setTimeout(fetchAPI, 1000, fetchURL);
});

const wrapContent = (tag, text) => {
  return `<${tag}>${text}</${tag}>`
};

const displayWeather = (data) => {
  if (!document.querySelector("#card")){
    rootElement.insertAdjacentHTML('beforeend', `<div id="card"></div>`);
  }
  const cardElement = document.querySelector("#card");
  cardElement.innerHTML = '';
  
  let textToHTML = wrapContent('div', ('city: ' + '<strong>' + data.location.name + '</strong>')) +
    wrapContent('div', ('region: ' + data.location.region + ' / country: ' +data.location.country)) +
    `<img src="${data.current.condition.icon}" alt="little icon">` +
    wrapContent('div', ('sky conditions: ' + data.current.condition.text)) +
    wrapContent('div', ('wind direction: ' + data.current.wind_dir)) +
    wrapContent('div', ('temperature: ' + data.current.temp_c + ' ˚C')) +
    wrapContent('div', ('wind speed: ' + data.current.wind_kph + ' km/h')) +
    wrapContent('div', ('temperature: ' + data.current.temp_f + ' ˚F')) +
    wrapContent('div', ('wind speed: ' + data.current.wind_mph + ' miles/h')) +
    wrapContent('div', ('humidity: ' + data.current.humidity + ' %')) +
    wrapContent('div', ('pressure: ' + data.current.pressure_mb + ' hPa'));


  cardElement.insertAdjacentHTML('afterbegin', textToHTML);
  
};






    // Write your JavaScript code before this line
  
  }



  
  window.addEventListener("load", loadEvent);
