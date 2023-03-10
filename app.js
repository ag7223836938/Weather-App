const express = require("express");
const app = express();
const https = require("https")
const bodyParser = require("body-parser");
const _=require("lodash");
// import "./public/style.css";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function (req, resp) {
    // console.log(req);
    resp.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, resp) {
    const query = _.capitalize(req.body.city);
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=edad1b77f3bee0be853e588be12cdd5f&units=metric";

    https.get(url, function (res) {
        res.on("data", function (data) {
            const wdata = JSON.parse(data);
            const temp = wdata.main.temp;
            const description = wdata.weather[0].description;
            const icon = wdata.weather[0].icon;
            const img = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            resp.write("<p style='color:violet;font-size:2rem;'>weather at "+query+" is " + description + "</p>");
            resp.write("<h1>Temperature at " + query + " is " + (temp) + " degree celcius.</h1>");
            resp.write("<img src=" + img + ">");
            resp.send();
        })
    })
})

app.listen(5000);