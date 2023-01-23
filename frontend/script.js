let fetchURL = "http://api.weatherapi.com/v1/current.json?key=bbe8663248294c28b60135807232301&q=", city="Budapest";





const loadEvent = function() {
  
    // Write your JavaScript code after this line
  
    let fetchWeather = (fetchURL) =>{
        fetch(fetchURL)
            .then(function(response) {
                return response.json();
                })
            .then((data) => {
                let datas = data;
                
                console.log(data);
                
                })
            .catch(function(error) {
                console.log(error);
                });
        }

    fetchWeather(fetchURL+city);
  

const selectElement = document.querySelector('#cities');

selectElement.addEventListener('change', (event) => {
    console.log(event.target.value);
    city = event.target.value;
    fetchURL = "http://api.weatherapi.com/v1/current.json?key=bbe8663248294c28b60135807232301&q="+city;
    fetchWeather(fetchURL);
});
  





  
    // Write your JavaScript code before this line
  
  }



  
  window.addEventListener("load", loadEvent);
