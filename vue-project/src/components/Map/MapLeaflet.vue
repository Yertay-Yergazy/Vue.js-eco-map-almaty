<template>
  <l-map :zoom="zoom" :center="center" style="height: 100%; width: 100%">
    <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

    <!-- Маркеры для всех озер -->
    <l-marker
      v-for="lake in waterObjects"
      :key="lake.id"
      :lat-lng="[lake.latitude, lake.longitude]"
      @click="selectLake(lake)"
    >
      <l-popup>
        <div>
          <h3 class="font-bold">{{ lake.name }}</h3>
          <p>{{ lake.region }}</p>
        </div>
      </l-popup>
    </l-marker>

    <!-- Центрированная метка на выбранное озеро -->
    <l-marker
      v-if="selectedLake"
      :lat-lng="[selectedLake.latitude, selectedLake.longitude]"
    >
      <l-popup>
        <div>
          <h3 class="font-bold">{{ selectedLake.name }}</h3>
          <p>{{ selectedLake.region }}</p>
        </div>
      </l-popup>
    </l-marker>
  </l-map>
</template>

<script setup>
import * as L from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { defineProps } from "vue";

// Фикс для стандартных иконок Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url,
  ).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url)
    .href,
});

const props = defineProps({
  waterObjects: { type: Array, required: true },
  selectedLake: { type: Object },
  center: { type: Array, required: true },
  zoom: { type: Number, required: true },
  selectLake: { type: Function, required: true },
});
</script>
