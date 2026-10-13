import { parse,format } from 'date-fns';

const getWindDescription=(value)=>{
    if(value<10)   return 'Calm'
    if(value<20) return 'A little breezy';
     if(value<30) return 'Windy';
     return 'Very windy'
}

const getUVDescription=(value)=>{
    if(value<2) return 'Low';
    if(value<6) return 'Moderate';
     if(value<9) return 'High';
     return 'Extreme'
}

const getHumidityDescription=(value)=>{
    if(value<30) return 'Dry';
    else if(value<60) return 'Comfortable';
     else if(value<85) return 'Humid';
    else return 'Sticky'
}


const getDayAndHHMM=(rawdate)=>{
    const date= parse(rawdate, 'yyyy-MM-dd HH:mm', new Date());
    return format(date, 'EEEE, h:mm a');
}

const CurrentWeather=({data, location})=>{
    const {localtime, name}=location;
    const {temp_c, condition, feelslike_c,maxtemp_c, mintemp_c,
        wind_kph, humidity, uv}=data;

        return(
<div  className="grid grid-cols-2  gap-4 mt-20 bg-blue-100 p-10 ">
   <div className=" text-xl leftpart flex flex-row gap-4   ">
    <div className="flex flex-col gap-2">
    <h2>{name}</h2>
    <h1 className="temp ">{Math.round(temp_c)}°</h1>
     <p>↑{Math.round(maxtemp_c)}°/↓{Math.round(mintemp_c)}°</p>
     <p>Feels like {feelslike_c}°</p>
     <p>{getDayAndHHMM(localtime)}</p>
    </div>

    <div className='condition justify-center flex text-center flex-col w-[100px] h-[100px]'>
        <img src={condition.icon} alt={condition.text}></img>
        <h2 className=''>{condition.text}</h2>

    </div>
   </div>

   <div className="rightpart text-xl flex flex-col gap-5 ">
    <div className='gap-4  flex'>
        <span>💨 Wind</span>
        <span>{wind_kph} km/h</span>
        <br>
        </br>
        <small  className='mt-0.5 '>{getWindDescription(wind_kph)}</small>
    </div>

    <div className='gap-4 flex'>
     <span>💧 Humidity</span>
     <span>{humidity}%</span>
      <br>
        </br>
        <small className='mt-0.5'>{getHumidityDescription(humidity)}</small>
    </div>

    <div className='gap-4 flex'>
            <span>🌡️ UV index</span>
            <span className=''>{uv}</span>
             <br>
        </br>
        <small className='mt-0.5'>{getUVDescription(uv)}</small> 
    </div>

   </div>
</div>
        )
}

export default CurrentWeather;