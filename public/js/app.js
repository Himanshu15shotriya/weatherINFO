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

weatherCondition.textContent = "weather info"
locationElement.textContent = `Made with ❤️ by Himanshu`;


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    locationElement.textContent = "Loading...";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    weatherICON.className = "";
    const locationApi = fetchWeather + "?address=" + search.value;
    fetch(locationApi).then(response => {
        response.json().then((data) => {
            if(data.error) {
                locationElement.textContent = data.error;
                tempElement.textContent = "";
                weatherCondition.textContent = "";
            } else {
                locationElement.textContent = data.cityName +" "+ data.country
                tempElement.textContent = Math.round(data.temperature - 273.15) + "\u2103";
                
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
                }else if(data.description == "light intensity shower rain") {
                    weatherICON.className = "fas fa-cloud-sun-rain"
                } else{
                    weatherICON.className = "fas fa-sun"
                }
            }
        }) 
    })
})