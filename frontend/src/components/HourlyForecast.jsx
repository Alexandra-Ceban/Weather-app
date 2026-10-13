import {format,parse} from 'date-fns';
const HourlyForecast=({data})=>{
return(

    <div className="hourly-container mt-10  gap-4  grid-flow-col auto-cols-[68px] grid grid-rows-2">
        {data.map((hour, index)=>{
            return(
                <div className="hour-card bg-blue-100 rounded-xl p-1 flex flex-col gap-2 mb-13" key={index}>
                  <div className="hour-time flex flex-row gap-1 ">
                    {format(parse(hour.time, 'yyyy-MM-dd HH:mm', new Date()), 'h a')}
                  </div>
                  <img src={hour.condition.icon} alt='icon'></img>
                  <div className='text-center'> 
                    {Math.round(hour.temp_c)}° </div>
                    <div>💧{hour.chance_of_rain}%</div>
                 
                </div>

            )
        })}
    </div>
)
}

export default HourlyForecast;