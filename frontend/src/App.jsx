import { useState, useEffect } from 'react';
import {getWeatherData} from './api.js';
import {SearchBar} from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather.jsx'; 
import HourlyForecast from './components/HourlyForecast';
import WeeklyForecast from './components/WeeklyForecast';

import { parse, isValid } from 'date-fns';
import './App.css';


const getGradientClass=(hour)=>{
  if(hour >=6 && hour<9) return 'bg-sunrise';
  if(hour>=9 && hour<17 ) return 'bg-day';
  if(hour>=17 && hour<20) return 'bg-sunset';
  return 'bg-night';
};


function App() {
  const [city,setCity]= useState('Auckland');
  const[weather, setWeather]=useState(null);
  const[loading, setLoading]=useState(false);
  const[error,setError]= useState('');


  const localtime= weather?.location?.localtime;
  const parsedTime=localtime
  ? parse(localtime, 'yyyy-MM-dd HH:mm', new Date())
  : new Date();

  const hour= isValid(parsedTime)
  ? parsedTime.getHours()
  : new Date().getHours();

  const gradientClass=getGradientClass(hour);
  useEffect(()=>{
    const fetchW=async ()=>{
      setLoading(true);
      setError('');
      try{
     const data= await getWeatherData(city);
     console.log('Weather data received:', data);

    if (
  !data ||
  data.error ||
  !data.forecast?.forecastday?.length
) {
  throw new Error(
    data?.error?.message || 'Invalid weather data'
  );
}

     const {mintemp_c, maxtemp_c}= data.forecast.forecastday[0].day
     setWeather({
      current:{...data.current, mintemp_c, maxtemp_c},
      hourly:data.forecast.forecastday[0].hour,
      weekly:data.forecast.forecastday.slice(1),
      location: data.location
     })
      }
      catch(error){
        console.log(error);
        setError('Could not load weather. Please try again.');
      }
      finally{
        setLoading(false);
      }
    }

    fetchW();
  },[city])

  return(
      <div className={`min-h-screen ${getGradientClass } app`}
      
      >
      

      
        <div className=' relative  mx-auto px-4 container max-w-5xl'>
         <SearchBar onSearch={setCity} />
         {loading && <p>Loading....</p>}
         {error && <p>{error}</p>}
         {weather && (
          <>
          <CurrentWeather data={weather.current} location={weather.location} />
          <HourlyForecast data={weather.hourly}/>
          <WeeklyForecast  data={weather.weekly}/>
          
          </>
         )}
        </div>
      </div>
      


  )

  }

export default App
