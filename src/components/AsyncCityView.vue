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
            `https://api.openweathermap.org/data/2.5/weather?lat=${route.query.lat}&lon=${route.query.lon}&appid=${API}&units=metric`
        )

        return weatherData
    } catch (error) {
        console.log(error)
    }
}

const weatherData = await getWeatherData()
console.log(weatherData)
</script>
