import React, {useState, useEffect} from 'react'

// API key for openweathermap.org
const key = "770d3167b3eba3b1c6578ba7c1153c3b"
const url = "https://api.openweathermap.org/data/2.5/onecall"
const pitts = {
  lat : 40.44,
  lon : -79.99
}
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

  async function getWeather() {
    const get = await fetch(`${url}?lat=${pitts.lat}&lon=${pitts.lon}&appid=${key}`);
    get
      .json()
      .then(resp => {
        setWeather({
          currentTemp: convert(resp.current.temp),
          currentDescription: resp.current.weather[0].main,
          currentWindSpeed: resp.current.wind_speed + 'mph',
          currentWindDir: resp.current.wind_deg + '°',
        })
        console.log(resp)
      })
      .catch(err => {
        setErrors(err)
        console.log(errors)
      });
  }
  function convert(k) {
    k += -273.15
    let f = k * 9/5 
    f += 32
    return Math.round(f) + '°F'
  }
  function photo() {
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
    {/* test log area
    {JSON.stringify({weather})} */}
    <section>
    <h1>
      Current Weather In Pittsburgh
      </h1>
      <h2>
        {weather.currentTemp}
        </h2>
        <h3>
          conditions: {weather.currentDescription}
        </h3>
        <h4>
          wind speed: {weather.currentWindSpeed}
        </h4>
        <h4>
          wind direction: {weather.currentWindDir}
        </h4>
        <img id="indicator" alt="#" src={weather.currentDescription === "Rain" ? indicate.rain : indicate.sun} />
        </section>
    </div>
}
export default HomePage