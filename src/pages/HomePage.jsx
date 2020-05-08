import React, {useState, useEffect} from 'react'

// data for fetch url
const key = "770d3167b3eba3b1c6578ba7c1153c3b"
const url = "https://api.openweathermap.org/data/2.5/onecall"
const pitts = {
  lat : 40.44,
  lon : -79.99
}
// data for dynamic background switch
const indicate = {
  sun: "https://cdn.pixabay.com/photo/2013/07/13/10/23/sun-157126_1280.png",
  rain: "https://cdn.pixabay.com/photo/2018/05/31/13/13/rain-3443977_1280.jpg",
  thunderstorm: "https://cdn.pixabay.com/photo/2013/04/01/09/22/thunderstorm-98541_1280.png",
  snow: "https://cdn.pixabay.com/photo/2014/04/02/14/10/cloud-306404_1280.png",
  drizzle: "https://cdn.pixabay.com/photo/2016/03/31/15/03/background-1292963_1280.png",
  cloudy: "https://cdn.pixabay.com/photo/2014/04/03/11/56/clouds-312651_1280.png"
}

const HomePage = () => {
  const  [errors, setErrors] =  useState(false)
  const  [weather,setWeather ]= useState({})

  const getWeather = async () => {
    const get = await fetch(`${url}?lat=${pitts.lat}&lon=${pitts.lon}&appid=${key}`);
    get
      .json()
      .then(resp => {
        setWeather({
          currentTemp: convert(resp.current.temp),
          currentDescription: resp.current.weather[0].main,
          currentWindSpeed: resp.current.wind_speed + 'mph',
          currentWindDir: resp.current.wind_deg + '°',
          currentWindDeg: resp.current.wind_deg,
          dailyMax: convert(resp.daily[0].temp.max),
          dailyMin: convert(resp.daily[0].temp.min),
        })
        console.log(resp)
      })
      .catch(err => {
        setErrors(err)
        console.log(errors)
      });
  }
  const convert = (k) => {
    k += -273.15
    let f = k * 9/5 
    f += 32
    return Math.round(f) + '°F'
  }
  const direction = () => {
    let deg = weather.currentWindDeg
    if (338 < deg < 24) {
      return 'North'
    } else if (295 < deg < 337) {
      return 'NorthWest'
    } else if (248 < deg < 294) {
      return 'West'
    } else if (203 < deg < 247) {
      return 'SouthWest'
    } else if (157 < deg < 202) {
      return 'South'
    } else if (112 < deg < 156) {
      return 'SouthEast'
    } else if (69 < deg < 111) {
      return 'East'
    } else if (25 < deg < 68) {
      return 'NorthEast'
    }
  }
  const photo = () => {
    let itIs = weather.currentDescription
    if ( itIs === 'Rain') {
      return `url(${indicate.rain})`
    } else if (itIs === 'Thunderstorm') {
      return `url(${indicate.thunderstorm})`
    } else if (itIs === 'Drizzle') {
      return `url(${indicate.drizzle})`
    } else if (itIs === 'Clouds') {
      return `url(${indicate.cloudy})`
    } else if (itIs === 'Snow') {
      return  `url(${indicate.snow})`
    } else {
      return `url(${indicate.sun})`
    }
  }

  useEffect(() => {
    getWeather()
  },[])
  return <div className="center-flex" 
  style={{backgroundImage: photo()}}>
    <section>
    <h1>
      Current Weather In Pittsburgh
      </h1>
      <h2>
        {weather.currentTemp}
        </h2>
        <h3>
          Conditions: {weather.currentDescription}
        </h3>
        <h4>
          Wind speed: {weather.currentWindSpeed}
        </h4>
        <h4>
          Wind direction: {direction()}-{weather.currentWindDir}
        </h4>
        <h3>High: {weather.dailyMax}</h3>
        <h3>Low: {weather.dailyMin}</h3>
        <img id="indicator" alt="#" src={photo().slice(4,-1)} />
        </section>
    </div>
}
export default HomePage