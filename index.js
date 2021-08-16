const express = require('express');
const request = require("request");
const ejs = require('ejs');

const weatherData = require("./utils/weatherData")

const app = express();
const port = process.env.PORT ||3000



//set for ejs
app.set('view engine' , 'ejs');

//static folder
app.use(express.static('./'));



app.get("/",(req,res) => {
    res.render("index")
})

app.get("/weather-info",(req,res) => {
//     let city = req.query.city
//     request(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=caa5dd6dc211afd048b6cbd7bb2f35a3`, function (error, response, body) {
//         let data = JSON.parse(body)
//     if(response.statusCode === 200){
//         res.send(`The Weather in your city ${city.toUpperCase()} is :- 
//             Weather : ${(data.weather[0].description)},
//             Tempreture : ${Math.round(((data.main.temp)- 273.15)) + "°C"},
//             Feels Like : ${Math.round(((data.main.feels_like)- 273.15)) + "°C"},
//             Minimum Tempreture : ${Math.round(((data.main.temp_min)- 273.15)) + "°C"},
//             Maximum Tempreture : ${Math.round(((data.main.temp_max)- 273.15)) + "°C"},
//             Humidity : ${data.main.humidity}%,
//             Wind Speed : ${((data.wind.speed)*18/5).toFixed(1)} km/h
//         `)
//     }else{
//         res.send(`${city} is not a city please enter correct city name`)
//     }
// });
const address = req.query.address
    if(!address) {
        return res.send({
            error: "You must enter address in search text box"
        })
    }

    weatherData(address, (error, {temperature, description, cityName ,country} = {}) => {
        if(error) {
            return res.send({
                error : `Unable to find ${req.query.address}`
            })
        }
        res.send({
            temperature,
            description,
            cityName,
            country
        })
    })
})



app.listen(port, ()=> console.log(`Server is running at ${port}`))


