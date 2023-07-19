<template>
    <main class="container text-light">
        <div class="pt-4 mb-8 relative">
            <input
                type="text"
                placeholder="Search for a city"
                v-model="searchQuery"
                @input="getSearchResults"
                class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
            />
            <ul
                class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top[66px]"
                v-if="openWeatherSearchResults"
            >
                <li
                    v-for="searchResult in openWeatherSearchResults"
                    :key="searchResult.id"
                    class="py-2 cursor-pointer"
                >
                    {{ searchResult.properties.city }}
                </li>
            </ul>
        </div>
    </main>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const openWeatherAPI_KEY = '5515a667829df13bed05d2662aaf92fe'
const searchQuery = ref('')
const queryTimeout = ref(0)
const openWeatherSearchResults = ref(null)

const getSearchResults = () => {
    clearTimeout(queryTimeout.value)
    queryTimeout.value = setTimeout(async () => {
        if (searchQuery.value !== '') {
            const result = await axios.get(
                `https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery.value}&limit=5&appid=${openWeatherAPI_KEY}`
            )
            console.log(result.data)
            openWeatherSearchResults.value = result.data.features
            return
        }
        openWeatherSearchResults.value = null
    }, 500)
}
</script>

<style lang="scss" scoped></style>
