<template>
  <div class="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
    <Transition name="fade">
      <button
        v-if="!isPanelVisible"
        @click="isPanelVisible = true"
        class="absolute top-4 left-13 z-[1001] bg-gray-800/80 backdrop-blur p-2 rounded-xl border border-gray-700 hover:bg-pink-600 hover:border-pink-500 transition-all duration-300 shadow-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </Transition>

    <div
      class="absolute bottom-6 z-[1001] transition-all duration-500 ease-in-out"
      :style="{
        left: isPanelVisible ? 'calc(50% - 250px)' : '50%',
        transform: 'translateX(-50%)',
      }"
    >
      <button
        @click="$router.push('/filter')"
        class="flex items-center space-x-3 bg-gray-900/90 hover:bg-pink-600 backdrop-blur-md border border-gray-700 p-4 px-15 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 group"
      >
        <span class="text-white font-bold tracking-widest text-sm"
          >Поиск по формуле</span
        >
      </button>
    </div>

    <MapPanel
      v-show="isPanelVisible"
      class="h-full shrink-0 transition-all duration-500 ease-in-out z-[1002]"
      :class="
        isPanelVisible ? 'translate-x-0 w-[360px]' : '-translate-x-full w-0'
      "
      :waterObjects="waterObjects"
      :handleSearch="handleSearch"
      :selectLake="selectLake"
      @close="isPanelVisible = false"
    />

    <div
      class="relative flex-1 transition-all duration-500 ease-in-out overflow-hidden"
    >
      <MapLeaflet
        :waterObjects="waterObjects"
        :selectedLake="selectedLake"
        :center="center"
        :zoom="zoom"
        :selectLake="selectLake"
        class="w-full h-full"
      />

      <LakeDetails
        v-if="selectedLake"
        :lake="selectedLake"
        :waterQuality="waterQuality"
        class="absolute top-0 right-0 h-full w-[30%] z-50 shadow-2xl"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import MapLeaflet from "./MapLeaflet.vue";
import LakeDetails from "./LakeDetails.vue";
import MapPanel from "./MapPanel.vue";
import {
  fetchWaterObjects,
  searchWaterObjects,
  fetchWaterQuality,
} from "../../api/waterApi";

const isPanelVisible = ref(true);
const waterObjects = ref([]);
const waterQuality = ref({});
const selectedLake = ref(null);

const zoom = ref(6);
const center = ref([45.0, 77.0]);

// Хак для перерисовки карты при движении панели
watch(isPanelVisible, () => {
  setTimeout(() => {
    window.dispatchEvent(new Event("resize"));
  }, 500);
});

async function loadWaterObjects() {
  waterObjects.value = await fetchWaterObjects();
}

async function handleSearch(query) {
  if (!query) return loadWaterObjects();
  waterObjects.value = await searchWaterObjects(query);
}

async function selectLake(lake) {
  selectedLake.value = lake;
  const data = await fetchWaterQuality(lake.id);
  waterQuality.value = data.water_quality || {};
  center.value = [lake.latitude, lake.longitude];
  zoom.value = 12;
}

onMounted(() => {
  loadWaterObjects();
});
</script>

<style scoped>
/* Плавное исчезновение кнопки бургера */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Фикс для того, чтобы панель выезжала красиво */
.translate-x-0 {
  transform: translateX(0);
}
.-translate-x-full {
  transform: translateX(-100%);
}
</style>
