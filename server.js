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


//============================================Weather local lab7=====================================================

// //http://localhost:3001/weather?lat=47.6038321&lon=-122.3300624&searchQuery=Seattle
// server.get('/weather',(req,res)=>{
// // res.send(weatherData)

// const lat= req.query.lat;
// const lon= req.query.lon;
// const cityName= req.query.searchQuery.toLocaleLowerCase();

// // console.log(lat,lon,cityName)

// const weatherDataResult= weatherData.find((item)=>{
// if ((lat === item.lat) || (lon===item.lon) || (cityName === item.city_name.toLocaleLowerCase())){
// return item;
// }

// return 'error' ;

// })


// let myData= createForCastObje(weatherDataResult)
// res.send(myData);

// })

// const createForCastObje = (weatherObj) => {
    
//     const forCastObjArr=[];

//     weatherObj.data.map((item)=>{
 
//         const date = item.datetime;
//         const description = `Low of ${item.low_temp}, high of ${item.max_temp} with ${item.weather.description}`;

//         forCastObjArr.push(new Forecast(date,description));

//     })

//   return forCastObjArr;
  
// }

// class Forecast{

//     constructor(date,description){
//        this.date = date
//        this.description =description
//     }
// }
//=================================================Weather API lab8=============================================================

// http://localhost:3001/getWeather?lat=47.6038321&lon=-122.3300624&searchQuery=Seattle
server.get('/getWeather',getWeatherHandler);

function getWeatherHandler(req,res){

    const city =req.query.searchQuery
    const lat = req.query.lat
    const lon = req.query.lon

    // https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=1d6da6b9e31745839be632003e29d9e8&include=minutely
    const URL=`https://api.weatherbit.io/v2.0/current?city=${city}lat=${lat}&lon=${lon}&key=1d6da6b9e31745839be632003e29d9e8&include=minutely`

    axios
    .get(URL)
    .then(result => {
        console.log('inside promise');
      let  weatherArrayAPI = result.data

      res.send(createForCastObj(weatherArrayAPI));
    })

    .catch(err => {
        res.send(err);
    })

    console.log('outside promise');
  };

  const createForCastObj = (weatherObj)=>{
 
    const foreCastObj =[];

    weatherObj.data.map((item)=>{

       const date= item.datetime;
       const description=  `Low of ${item.low_temp} ,High of ${item.max_temp} with ${item.weather.description}`;
       
       foreCastObj.push(new Forecast(date,description));
        console.log(foreCastObj)

    });
    return foreCastObj;
  };

  class Forecast{

    constructor(date,description){
        this.date=date;
        this.description= description
    }
  }

//=======================================================MOvies APi Lab8==========================================================================

// http://localhost:3001/getMovie?city=amman
server.get('/getMovie',getWeatherHandler);

function getWeatherHandler(req,res){
const city= req.query.city

// https://api.themoviedb.org/3/movie/550?api_key=6680ffabd529834b6beac25752cbb0ad
const URLMovie= `https://api.themoviedb.org/3/movie/550?api_key=6680ffabd529834b6beac25752cbb0ad`


axios
.get(URLMovie)
.then(result => {
    console.log('inside promise');

    let movieArr= result.data.results // results ?

    res.send(createForCastObjMovie(movieArr));
})

.catch(err => {
    res.send(err);
})
console.log('outside promise');
}

const createForCastObjMovie=(movieArrObj)=>{

    let movieArrCast=[];

    movieArrObj.map((item)=>{
       const title= item.title
       const overview= item.overview
       const vote_average= item.vote_average
       const vote_count= item.vote_count
       const poster_path= item.poster_path
       const popularity= item.popularity
       const release_date= item.release_date

       
    movieArrCast.push(new ForeCastMovie(tilte,overview,vote_average,vote_count,poster_path,popularity,release_date))
    })


    return movieArrCast;
}


class ForeCastMovie{
    constructor(title,overview,vote_average,vote_count,poster_path,popularity,release_date){
        this.title= title
        this.overview= overview
        this.vote_average = vote_average
        this.vote_count = vote_count
        this.poster_path = poster_path
        this.popularity = popularity
        this.release_date = release_date

    }
}
 
//============================================================================================================================================



//http://localhost:3001/..
server.get('*', (req,res)=>{
res.status(500).send( ` "error": "Something went wrong."`);

})

server.listen(PORT,()=>{
    console.log(`im listning on PORT ${PORT}`);
})




