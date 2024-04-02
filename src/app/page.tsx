'use client'
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import WeatherContainer from "@/components/WeatherContainer";
import { useEffect, useState } from "react";

export default function Home() {

  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const [ location, setLocation ] = useState<string>('')
  const [ forecast, setForecast ] = useState()

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        handleLocationSearch(`${latitude},${longitude}`)
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [])

  const handleLocationSearch = async (query: string) => {
    setIsLoading(true)
    console.log('back to root, searching for ' + query)
    const call = await fetch(`/api/forecast?q=${query}`)
    const res = await call.json()
    console.log(res)
    setForecast(res)
    setIsLoading(false)
  }

  return (
    <main>
      <Header />
      <SearchBar onSearch={handleLocationSearch} />
      <WeatherContainer forecast={forecast} isLoading={isLoading} />
    </main>
  )
}
