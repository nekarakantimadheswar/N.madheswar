const express = require("express");
const https= require ("https");
const bodyParser =require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
     
})
app.post("/",function(req,res){
    var query=req.body.cityName;
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid=8ccbfbd9a409258ef3d3bd1f3f5fc7c9"
    https.get(url,function(response){
        response.on("data",function(data){
           const weatherData = JSON.parse(data)
        console.log(weatherData);
           const temp =weatherData.main.temp;
           const humidity= weatherData.main.humidity;
           const pressure =weatherData.main.pressure;
           const description=weatherData.weather[0].description;
           const icon =weatherData.weather[0].icon;
          
           const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
           const wind=weatherData.wind.speed;
           res.setHeader("content-type","text/html");
           var today = new Date();
           var options = {
            weekday:"long",
            day:"numeric",
            month:"long"
           };
           var day = today.toLocaleDateString('en-us',options);
           res.write('<h3>'+day+"</h3><br>");
           res.write("<img  src="+imageURL+">");
           res.write("weather is "+description+"<br>");
           res.write("<h2>the temperature in "+query+ " is "+temp+"   °C"+"</h2><br>");
           res.write("<h3>humidity :"+humidity+"%"+"</h3><br>");
           res.write('<h3>wind:'+wind+" km/h"+"</h3>"); 
           res.write('<h3>pressure:'+pressure+" N/m2"+"</h3>"); 
           
           res.send();
        })
    })
})


app.listen(3000,function(){
    console.log("server is running..")
})