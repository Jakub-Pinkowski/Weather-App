<template>
    <div class="flex flex-col flex-1 items-center">
        <!-- Banner-->
        <div
            v-if="route.query.preview"
            class="text-white p-4 bg-weather-secondary w-full text-center"
        >
            You are currently previewing this city, click the "+" icon to start tracking it
        </div>
        <!-- Weather Overview-->
        <div class="flex flex-col items-center text-white py-12">
            <h1 class="text-4xl mb-2">
                {{ route.params.city }}
            </h1>
            <p class="text-sm mb-12">
                {{
                    new Date().toLocaleDateString('en-UK', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                    })
                }}
                {{
                    new Date().toLocaleTimeString('en-UK', {
                        hour: 'numeric',
                        minute: 'numeric'
                    })
                }}
            </p>
            <p class="text-8xl mb-8">{{ Math.round(weatherData.main.temp) }}°C</p>
            <div class="text-center">
                <p>
                    Feels like
                    {{ Math.round(weatherData.main.feels_like) }}°C
                </p>
                <p class="capitalize">
                    {{ weatherData.weather[0].description }}
                </p>
                <img
                    class="w-[150px] h-auto"
                    :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
                    alt="weather_conditions" 
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const API = '5515a667829df13bed05d2662aaf92fe'

const getWeatherData = async () => {
    try {
        const weatherData = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${route.query.lat}&lon=${route.query.lon}&appid=${API}&units=metric`
        )

        return weatherData.data
    } catch (error) {
        console.log(error)
    }
}

const weatherData = await getWeatherData()
console.log(weatherData)
console.log(route.query)
</script>
