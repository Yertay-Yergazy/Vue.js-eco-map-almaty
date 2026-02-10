<template>
  <l-map :zoom="currentZoom" :center="center" style="height: 100%; width: 100%">
    <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

    <l-marker
      v-for="lake in waterObjects"
      :key="lake.id"
      :lat-lng="[lake.latitude, lake.longitude]"
      :icon="createCustomIcon(lake.Z)"
      @click="selectLake(lake)"
    >
      <l-popup>
        <div class="p-1">
          <h3 class="font-bold text-lg">{{ lake.name }}</h3>
          <p class="text-sm text-gray-600">{{ lake.region }}</p>
          <div
            class="mt-2 py-1 px-2 rounded text-white text-center"
            :style="{ backgroundColor: getZColor(lake.Z) }"
          >
            Индекс Z: {{ lake.Z || "Н/Д" }}
          </div>
        </div>
      </l-popup>
    </l-marker>
  </l-map>
</template>

<script setup>
import * as L from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { defineProps, watch, ref } from "vue";

const props = defineProps({
  waterObjects: { type: Array, required: true },
  selectedLake: { type: Object },
  zoom: { type: Number, default: 6 },
  selectLake: { type: Function, required: true },
});

const currentZoom = ref(props.zoom);
const center = ref([45.0, 77.0]);

// 1. Функция определения цвета (можно настроить пороги под ваши требования)
const getZColor = (z) => {
  if (z === null || z === undefined) return "#9ca3af"; // серый, если данных нет
  if (z <= 1) return "#22c55e"; // зеленый (отлично)
  if (z <= 2) return "#eab308"; // желтый (удовлетворительно)
  if (z <= 3) return "#f97316"; // оранжевый (плохо)
  return "#ef4444"; // красный (опасно)
};

// 2. Создание HTML-иконки в виде капли или круга
const createCustomIcon = (z) => {
  const color = getZColor(z);

  // Мы создаем SVG-иконку программно
  const html = `
    <div style="
      background-color: ${color};
      width: 24px;
      height: 24px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 2px solid white;
      box-shadow: 0 0 4px rgba(0,0,0,0.4);
    "></div>
  `;

  return L.divIcon({
    className: "custom-marker", // пустой класс, чтобы убрать дефолтные стили Leaflet
    html: html,
    iconSize: [24, 24],
    iconAnchor: [12, 24], // точка привязки (низ маркера)
    popupAnchor: [0, -24], // где будет всплывать попап относительно иконки
  });
};

watch(
  () => props.selectedLake,
  (newLake) => {
    if (newLake) {
      center.value = [newLake.latitude, newLake.longitude];
    }
  },
);
</script>

<style>
/* Чтобы убрать стандартный белый квадрат вокруг divIcon */
.leaflet-div-icon {
  background: transparent !important;
  border: none !important;
}
</style>
