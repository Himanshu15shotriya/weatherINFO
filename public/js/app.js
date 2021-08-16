var fetchWeather = "/weather-info";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon i');
const weatherICON = document.querySelector('.weatherICON i');
const weatherCondition = document.querySelector('.weatherCondition');

const tempElement = document.querySelector('.temperature span');

const weatherFeelsLike = document.querySelector('.feelsLike')

const locationElement = document.querySelector('.place');

const dateElement = document.querySelector('.date');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

dateElement.textContent = new Date().getDate() + "  " + monthNames[new Date().getMonth()].substring(0, 9);

locationElement.textContent = `Made with ❤️ by Himanshu`;


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    locationElement.textContent = "Loading...";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    const locationApi = fetchWeather + "?address=" + search.value;
    fetch(locationApi).then(response => {
        response.json().then(data => {
            if(data.error) {
                locationElement.textContent = `Unable to find city ${data.cityName}`;
                tempElement.textContent = "";
                weatherCondition.textContent = "";
            } else {
                console.log()
                
                locationElement.textContent = data.cityName;
                tempElement.textContent = (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176);
                
                weatherCondition.textContent = data.description.toUpperCase();
                if(data.description == "haze") {
                    weatherICON.className = "fas fa-water"
                } else if(data.description == "scattered clouds") {
                    weatherICON.className = "fas fa-poo-storm"
                } else if(data.description == "mostly sunny") {
                    weatherICON.className = "fas fa-cloud-sun"
                } else if(data.description == "partly cloudy") {
                    weatherICON.className = "fas fa-cloud-sun"
                } else if(data.description == "moderate rain") {
                    weatherICON.className = "fas fa-cloud-rain"
                } else if(data.description == "few clouds") {
                    weatherICON.className = "fas fa-cloud-sun"
                } else if(data.description == "thunderstorms") {
                    weatherICON.className = "fas fa-bolt"
                } else if(data.description == "broken clouds") {
                    weatherICON.className = "fas fa-cloud-sun"
                } else if(data.description == "light rain") {
                    weatherICON.className = "fas fa-cloud-sun-rain"
                } else if(data.description == "heavy intensity rain") {
                    weatherICON.className = "fas fa-cloud-showers-heavy"
                } else if(data.description == "overcast clouds") {
                    weatherICON.className = "fas fa-cloud"
                } else if(data.description == "mist") {
                    weatherICON.className = "fas fa-smog"
                } else{
                    weatherICON.className = "fas fa-sun"
                }
            }
        }) 
    })
})