import {parseISO, format} from 'date-fns';

const WeeklyForecast=({data})=>{
  return(

    <div className='flex  text-center mb-10 flex-col gap-10'>
{data.map((day,index)=>{
    return(
       
        <div className="weekly-container text-center  items-center mb-5 bg-blue-100 rounded-xl p-3  w-[980px] flex flex-row justify-between" key={index}>
         <div className="day-label text-xl">
            {format(parseISO(day.date), 'EEE')} </div>
          <div>
            🌧️ {day.day.daily_chance_of_rain}%
          </div>
            <div className='w-[180px] flex flex-col items-center justify-center'> 
                <img className="w-[60px]" src={day.day.condition.icon} alt="icon"></img>
                <span>{day.day.condition.text}</span>

            </div>
          <div> {Math.round(day.day.maxtemp_c)}°/ {Math.round(day.day.mintemp_c)}°</div>

        </div>
        
    )
})}

    </div>
  )
}
export default WeeklyForecast;
