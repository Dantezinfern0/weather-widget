import React, {useState, useEffect} from 'react'

// API key for openweathermap.org
const key = "770d3167b3eba3b1c6578ba7c1153c3b"
const pitts = {
  lat : 40.44,
  lon : -79.99
}
const HomePage = () => {
  const  [hasError, setErrors] =  useState(false)
  const  [weather,setWeather ]= useState({})
  async function fetchData() {
    const get = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${pitts.lat}&lon=${pitts.lon}&appid=${key}`);
    get
      .json()
      .then(resp => {
        setWeather(resp)
        console.log(resp)
      })
      .catch(err => setErrors(err));
  }
  function convert(kelvin) {
    kelvin += -273.15
    let f = kelvin * 9/5 
    f += 32
    return f
  }
  useEffect(() => {
    fetchData()
  },[])
  return <div>

    <button>Get Weather</button>
    <h4>Current Temp</h4>

    </div>
}
export default HomePage