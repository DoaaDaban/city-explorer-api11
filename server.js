'use strict';

const express = require ("express"); 
const server= express();

const cors = require('cors'); 
server.use(cors()); 

require('dotenv').config();

const PORT = 3001;

const weatherData = require('./data/weather.json');


// http://localhost:3001/
server.get('/',(req,res) =>{
res.send('hello from root route');
})




//http://localhost:3001/weather?lat=47.6038321&lon=-122.3300624&searchQuery=Seattle
server.get('/weather',(req,res)=>{
// res.send(weatherData)

const lat= req.query.lat;
const lon= req.query.lon;
const cityName= req.query.searchQuery.toLocaleLowerCase();

// console.log(lat,lon,cityName)

const weatherDataResult= weatherData.find((item)=>{
if ((lat === item.lat) || (lon===item.lon) || (cityName === item.city_name.toLocaleLowerCase())){
return item;
}

return 'error' ;

})


let myData= createForCastObje(weatherDataResult)
res.send(myData);

})

const createForCastObje = (weatherObj) => {
    
    const forCastObjArr=[];

    weatherObj.data.map((item)=>{
 
        const date = item.datetime;
        const description = `Low of ${item.low_temp}, high of ${item.max_temp} with ${item.weather.description}`;

        forCastObjArr.push(new Forecast(date,description));

    })

  return forCastObjArr;
  
}






class Forecast{

    constructor(date,description){
       this.date = date
       this.description =description
    }

}








//http://localhost:3001/..
server.get('*', (req,res)=>{
res.status(500).send( ` "error": "Something went wrong."`);

})

server.listen(PORT,()=>{
    console.log(`im listning on PORT ${PORT}`);
})



