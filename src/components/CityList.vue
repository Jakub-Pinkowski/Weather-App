<template>
    <div></div>
</template>

<script setup lang="ts">
import axios from 'axios'
import type { AxiosResponse } from 'axios'
import { ref } from 'vue'

interface Location {
    id: string
    city: string | string[]
    country: string | string[]
    coordinates: {
        lat: string | string[]
        lon: string | string[]
    }
}

const API = '5515a667829df13bed05d2662aaf92fe'

const savedCities = ref<Location[]>([])
const getCities = async () => {
    const savedCitiesData = localStorage.getItem('savedCities')
    if (savedCitiesData) {
        savedCities.value = JSON.parse(savedCitiesData)

        const requests: Promise<AxiosResponse<any>>[] = []
        savedCities.value.map((city) => {
            requests.push(
                axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${city.coordinates.lat}&lon=${city.coordinates.lon}&appid=${API}&units=metric`
                )
            )
        })
        const weatherData = await Promise.all(requests)
    }
}
</script>
