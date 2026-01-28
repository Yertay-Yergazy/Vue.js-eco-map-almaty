<template>
  <div class="flex h-screen bg-gray-900 text-gray-100">
    <!-- Левая панель -->
    <div class="w-1/3 p-4 overflow-auto border-r border-gray-700">
      <SearchBar @onSearch="handleSearch" />

      <ul class="mt-4 space-y-2">
        <li
          v-for="lake in waterObjects"
          :key="lake.id"
          @click="selectLake(lake)"
          class="p-2 rounded-lg cursor-pointer hover:bg-[#ed1572] hover:text-white transition-colors duration-200"
        >
          {{ lake.name }} ({{ lake.region }})
        </li>
      </ul>

      <div
        v-if="selectedLake"
        class="mt-6 p-4 bg-gray-800 rounded-lg shadow-lg"
      >
        <h3 class="text-xl font-bold mb-2">{{ selectedLake.name }}</h3>
        <p class="mb-2">Регион: {{ selectedLake.region }}</p>
        <h4 class="font-semibold mb-1">Показатели воды:</h4>
        <ul class="text-sm space-y-1">
          <li v-for="(value, key) in waterQuality" :key="key">
            {{ key }}: {{ value }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Карта -->
    <div class="flex-1">
      <l-map :zoom="zoom" :center="center" style="height: 100%; width: 100%">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <l-marker
          v-for="lake in waterObjects"
          :key="lake.id"
          :lat-lng="[lake.lat || center[0], lake.lng || center[1]]"
          @click="selectLake(lake)"
        />
      </l-map>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { LMap, LTileLayer, LMarker } from "vue3-leaflet";
import "leaflet/dist/leaflet.css";
import SearchBar from "./SearchBar.vue";
import {
  fetchWaterObjects,
  searchWaterObjects,
  fetchWaterQuality,
} from "../api/waterApi";

const waterObjects = ref([]);
const waterQuality = ref({});
const selectedLake = ref(null);

const zoom = ref(6);
const center = ref([45.0, 77.0]);

async function loadWaterObjects() {
  waterObjects.value = await fetchWaterObjects();
}

async function handleSearch(query) {
  if (!query) {
    await loadWaterObjects();
    return;
  }
  waterObjects.value = await searchWaterObjects(query);
}

async function selectLake(lake) {
  selectedLake.value = lake;
  waterQuality.value = await fetchWaterQuality(lake.id);
}

onMounted(() => {
  loadWaterObjects();
});
</script>

<style scoped>
.leaflet-container {
  background: #0b0b0b;
}
</style>
