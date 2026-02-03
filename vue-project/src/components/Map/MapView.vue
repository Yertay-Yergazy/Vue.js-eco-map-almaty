<template>
  <div class="flex h-screen bg-gray-900 text-gray-100">
    <MapPanel
      :waterObjects="waterObjects"
      :waterQuality="waterQuality"
      :selectedLake="selectedLake"
      :handleSearch="handleSearch"
      :selectLake="selectLake"
    />
    <MapLeaflet
      :waterObjects="waterObjects"
      :center="center"
      :zoom="zoom"
      :selectLake="selectLake"
    />
  </div>
</template>

<script setup>
import MapPanel from "./MapPanel.vue";
import MapLeaflet from "./MapLeaflet.vue";
import { useWaterMap } from "./useWaterMap";

const {
  waterObjects,
  waterQuality,
  selectedLake,
  zoom,
  center,
  handleSearch,
  selectLake,
} = useWaterMap();
</script>
