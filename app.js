const express=require("express");
const https = require("https");
const bodyParser=require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
})
app.post("/",function(req,res){
  //console.log(req.body.cityName);
  //console.log("Post request recieved");
  const query=req.body.cityName;
  const apiKey="ee62809c0166df78dfc8409b9b85c8dc";
  const unit="metric";
  const url= "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const imageUrl= "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>The temperature in "+query+" is "+ temp +"degress celcius</h1>");
      res.write("<h3>The weather is currently " + weatherDescription + "</h3>");
      res.write("<img src="+imageUrl+">");
      res.send();
    })
  })
})



app.listen(3000,function(){
  console.log("Server is running on port 3000.");
})
