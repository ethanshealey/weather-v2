import formatTemp from '@/helpers/formatTemp'
import formatWindSpeed from '@/helpers/formatWindSpeed'
import getShortWeekdayNameByEpoch from '@/helpers/getShortWeekdayNameByEpoch'
import getWeatherIconFromImageName from '@/helpers/getWeatherIconFromImageName'
import Spinner from '@/components/Spinner'
import { useEffect, useState } from 'react'

type WeatherContainerType = {
  forecast: any,
  isLoading: boolean
}

const WeatherContainer = ({ forecast, isLoading }: WeatherContainerType) => {

  const [ unit, setUnit ] = useState<string>('f')
  const [ current, setCurrent ] = useState<any>(undefined)
  const [ currentIndex, setCurrentIndex ] = useState<number>(0)
  const [ isImageLoaded, setIsImageLoaded ] = useState<boolean>(false)

  useEffect(() => {
    console.log(current)
  }, [current])

  useEffect(() => {
    if(forecast) {
      console.log(forecast.daily)
      setCurrent((_: any) => forecast.daily)
      setCurrentIndex((_: any) => 0)
    }
  }, [forecast])

  const handleImageLoad = () => {
    setIsImageLoaded(true)
  }

  return (
    <div id="weather-container">
      { forecast && (
        <>
        { current && !isLoading ? (
          <div id="weather" style={{ display: isImageLoaded ? 'flex' : 'none' }}>
          <div className="location">
            <h1>{ forecast?.name }<span className='location-sub'>{ forecast?.region }, { forecast?.country }</span></h1>
          </div>
          <div className='weather-info'>
            <img src={getWeatherIconFromImageName(current[currentIndex]?.weather[0]?.icon)} onLoad={handleImageLoad} />
            <div className="current-weather-info">
              <h1 className='temp'>
                { formatTemp(current[currentIndex]?.temp.day, unit) }
                <span className='unit-switcher'>
                  <span className={unit === 'f' ? 'active-unit' : 'unit'} onClick={() => setUnit('f')}>°F</span> 
                  <span className='unit-divider'> | </span> 
                  <span className={unit === 'c' ? 'active-unit' : 'unit'} onClick={() => setUnit('c')}>°C</span>
                </span>
              </h1>
              <div className="other-info">
                <p>High: { formatTemp(current[currentIndex]?.temp.max, unit) }</p>
                <p>Low: { formatTemp(current[currentIndex]?.temp.min, unit) }</p>
                <p>Humidity: { parseInt(current[currentIndex]?.humidity) + '%' }</p>
                <p>Wind: { formatWindSpeed(current[currentIndex]?.wind_speed, unit) }</p>
              </div>
            </div>
          </div>
          <div id="description">
            <p>{ current[currentIndex]?.summary }</p>
          </div>
          <div className="date-picker-wrapper">
            <div className="date-picker">
              {
                current.map((day: any, idx: number) => (
                  <div key={`${day.dt}-${idx}`} className={`day ${idx === currentIndex ? 'day-active' : ''}`} onClick={() => setCurrentIndex(idx)}>
                    <h1 className='weekday'>{ getShortWeekdayNameByEpoch(day.dt) }</h1>
                    <img src={getWeatherIconFromImageName(day.weather[0].icon)} />
                    <div className="high-low">
                      <p className='high'>{ formatTemp(day.temp.max, unit) }°</p>
                      <p className='low'>{ formatTemp(day.temp.min, unit) }°</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        ) : (
          <div id="weather-loading">
            <Spinner />
          </div>
        )}
        </>
      )}
      
    </div>
  )
}

export default WeatherContainer