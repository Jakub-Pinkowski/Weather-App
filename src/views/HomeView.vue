<template>
    <main class="container text-white">
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
                <p v-if="searchError">Something went wrong, please try again</p>
                <p v-if="!searchError && openWeatherSearchResults.length === 0">
                    No results, try a different city
                </p>
                <template v-else>
                    <li
                        v-for="searchResult in openWeatherSearchResults"
                        :key="searchResult.lat"
                        class="py-2 cursor-pointer"
                        @click="previewCity(searchResult)"
                    >
                        {{ searchResult.name }}, {{ searchResult.country
                        }}<span v-if="searchResult.state">, {{ searchResult.state }}</span>
                    </li>
                </template>
            </ul>
        </div>
        <div class="flex flex-col gap-4">
            <Suspense>
                <CityList />
                <template #fallback>
                    <CityCardSkeleton />
                </template>
            </Suspense>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import CityList from '@/components/CityList.vue'
import CityCardSkeleton from '@/components/CityCardSkeleton.vue'

interface LocationObject {
    name: string
    local_names: Record<string, string>
    lat: number
    lon: number
    country: string
    state?: string
}

const openWeatherAPI_KEY = '5515a667829df13bed05d2662aaf92fe'
const searchQuery = ref('')
const queryTimeout = ref(0)
const openWeatherSearchResults = ref<LocationObject[] | null>(null) // Change the type here
const searchError = ref(false)

const getSearchResults = () => {
    clearTimeout(queryTimeout.value)
    queryTimeout.value = setTimeout(async () => {
        if (searchQuery.value !== '') {
            try {
                const result = await axios.get(
                    `https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery.value}&limit=5&appid=${openWeatherAPI_KEY}`
                )
                console.log(result.data)
                openWeatherSearchResults.value = result.data
            } catch (error) {
                searchError.value = true
            }
            return
        }
        openWeatherSearchResults.value = null
    }, 500)
}

const router = useRouter()

const previewCity = (city: LocationObject) => {
    console.log(city)
    router.push({
        name: 'cityView',
        params: {
            city: city.name,
            country: city.country
        },
        query: {
            lat: city.lat,
            lon: city.lon,
            preview: 'true'
        }
    })
}
</script>

<style lang="scss" scoped></style>
