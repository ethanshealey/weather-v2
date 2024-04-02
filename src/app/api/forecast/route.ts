import { NextRequest, NextResponse } from "next/server";

const getLocation = async (q: string) => {
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&days=7&aqi=no&alerts=no&q=${q}`

    const call = await fetch(API_URL)
    const res = await call.json()

    if(res) {
        return { ...res?.location }
    }
}

export async function GET(request: NextRequest) {

    const url = new URL(request.url)
    const query = url.searchParams.get('q')

    const location = await getLocation(query ?? '')

    if(location) {
        const API_URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${location.lat}&lon=${location.lon}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=imperial`
        const call = await fetch(API_URL)
        const res = await call.json()
        return NextResponse.json({ ...location, ...res }, { status: 200 });
    }

    return NextResponse.json({ location }, { status: 200 });
        
}