<template>
    <div v-for="city in savedCities" :key="city.id">
        <CityCard :city="city" @click="goToCityView(city)" />
    </div>
    <p v-if="savedCities.length === 0">
        No saved cities, add one by searching for it
    </p>
</template>

<script setup lang="ts">
import axios from 'axios'
import type { AxiosResponse } from 'axios'
import { ref } from 'vue'
import CityCard from './CityCard.vue'
import { useRouter } from 'vue-router'

interface Location {
    id: string
    city: string | string[]
    country: string | string[]
    coordinates: {
        lat: string | string[]
        lon: string | string[]
    }
    weather?: any
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

        weatherData.map((weather, index) => {
            savedCities.value[index].weather = weather.data
        })
    }
}

await getCities()

const router = useRouter()

const goToCityView = (city: Location) => {
    router.push({
        name: 'cityView',
        params: {
            city: city.city,
            country: city.country
        },
        query: {
            id: city.id,
            lat: city.coordinates.lat,
            lon: city.coordinates.lon,
        }
    })
}
</script>
