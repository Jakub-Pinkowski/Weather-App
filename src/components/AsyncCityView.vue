<template>
    <div></div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const API = '5515a667829df13bed05d2662aaf92fe'

const getWeatherData = async () => {
    try {
        const weatherData = await axios.get(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lon}&exclude={part}&appid=${API}`
        )

        // Calculate current date and time
        const localOffset = new Date().getTimezoneOffset() * 60000
        const utc = weatherData.data.current.dt * 1000 + localOffset
        weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset

        // Calculate horly weather offset
        weatherData.data.hourly.forEach((hour: any) => {
            const utc = hour.dt * 1000 + localOffset
            hour.currentTime = utc + 1000 * weatherData.data.timezone_offset
        })
    } catch (error) {
        console.log(error)
    }
}
</script>
