let fetchURL = "", city="", origImg, favArray = [];

const rootElement = document.querySelector("#root");

rootElement.insertAdjacentHTML('beforeend', `<div id="pic" class="container-flex "></div>`);
const pictureElement = document.querySelector("#pic");

pictureElement.insertAdjacentHTML('beforeend', `<div hidden id="spinner"></div>`);
const spinner = document.getElementById("spinner");

pictureElement.insertAdjacentHTML('beforeend', 
    `<div class="row m-0 p-0"><div class="col-12 p-3">
    <input list="citynames" id="cities" name="city" placeholder="Choose a city"></input>
    <datalist id="citynames"></datalist></div></div>`
  );

const selectElement = document.querySelector('#cities');

const loadEvent = function() {


  let fetchPicture = (theme) => {

    fetch("https://api.pexels.com/v1/search?query=" + theme, { 
      headers: {
        Authorization: 'KxcTUGcE6J6QwkzCc4K53QUcAlbI1VYtvXJzJwCuombgqBlJHYsUh5uM'
      }
    })
    .then(resp => {
      return resp.json()
    })
    .then(data => {
      // console.log('photos: ');
      // console.log(data.photos);
      let picture = (data.photos[Math.floor(Math.random() * data.photos.length)])
      // console.log('pic to the app: ');
      // console.log(picture);
      // console.log(picture.src);
      //pictureElement.innerHTML = '';
      //pictureElement.insertAdjacentHTML('afterbegin', `<img src=${picture.src.landscape} alt=${picture.alt}>`);
      theme == "winter landscape" ? origImg = picture.src.original : "";
     
      if(typeof(picture) !== "undefined")
        {
        pictureElement.style.background = `transparent url(${picture.src.original}) no-repeat center center`;
        }
      else
        {
        pictureElement.style.background = `transparent url(${origImg}) no-repeat center center`;
        }
      pictureElement.style.backgroundSize = 'cover';
      // note.style.color = 'red';
    });
    
  };

  fetchPicture("winter landscape");



  
    let fetchAPI = (fetchURL) =>{
      fetch(fetchURL)
      .then(function(response) {
        return response.json();
      })

      .then((data) => {

        if (fetchURL.includes('search')){
          // console.log('search data: ' + data);
          document.querySelector("#citynames").innerHTML = '';
          createDataList(data);
        };

        if (fetchURL.includes('current')){
          spinner.setAttribute('hidden', '');
                  //console.log("weather")
                  //console.log("current data: " + data);
                  displayWeather(data);
                  //console.log(data);
        };

      })
            .catch(function(error) {
                //console.log(error);
            });
    };

  
  
  selectElement.addEventListener('input', (event) => {
    //console.log(event.target.value);
    //console.log(event.target.value.substring(0,3));
  
    if (event.target.value.length < 2) {
      console.log(favArray);
      document.querySelector("#citynames").innerHTML = "";
      createDataList(favArray);
      }


    if (event.target.value.length > 2) {
      city = event.target.value;
      fetchURL = "http://api.weatherapi.com/v1/search.json?key=bbe8663248294c28b60135807232301&q="+city;
      fetchAPI(fetchURL);
    }
  });


  const createDataList = (data) => {
    console.log(data);
    data.map(element => document.querySelector("#citynames").insertAdjacentHTML('beforeend', `<option value=${element["name"]}></option>`));
  };


  selectElement.addEventListener('change', (event) => {
      spinner.removeAttribute('hidden');
      //console.log(event.target.value);
      city = event.target.value;
      fetchURL = "http://api.weatherapi.com/v1/current.json?key=bbe8663248294c28b60135807232301&q="+city;
      setTimeout(fetchAPI, 1000, fetchURL);
      fetchPicture(city);
  });





  const wrapContent = (tag, text) => {
    return `<${tag}>${text}</${tag}>`
  };


  const displayWeather = (data) => {
    if (!document.querySelector("#card")){
      pictureElement.insertAdjacentHTML('beforeend', `<div class="row"><div class="col-4"></div><div class="col-4"><div id="card" class="p-3"></div></div><div class="col-4"></div></div>`);
    }
    const cardElement = document.querySelector("#card");
    cardElement.innerHTML = '';
    
    let textToHTML = wrapContent('div', ('city: ' + '<strong>' + data.location.name + '</strong>' + '<span id="addFav" class="star empty">&starf;</span>')) +
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

    if(document.querySelector("#addFav"))
      {
      document.querySelector("#addFav").addEventListener('click', (event) => {
        if (!favArray.includes(data.location.name)) {
          favArray.push({name : data.location.name});
        }
        });
      }
    
  };






  
  
}
  
  window.addEventListener("load", loadEvent);
