const express = require('express');
const app = express();
const https = require("https");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
    // console.log(request);
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req, res){
    
    const city = req.body.cityName;
    const key = "1a7e434e99b98a441bde3fce4df8a714"; 
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&appid="+ key;
    https.get(url, function (response) {
        console.log(response);

        response.on("data", function (data) {
            const wdata = JSON.parse(data)
            const temp = wdata.main.feels_like
            const desc = wdata.weather[0].description
            const icon = wdata.weather[0].icon
            const imageurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p> The weather is currently " + desc + "<p>");
            res.write("<h1> The temperature is " + temp + "degrees <h1>");
            res.write("<img src=" + imageurl + ">"); 
            res.send();
        })
    })
})




app.listen(3000, function (request, response) {
    console.log("server started");
}); 