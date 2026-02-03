// src/composables/useWaterMap.js
import { ref, onMounted } from "vue";
import {
  fetchWaterObjects,
  searchWaterObjects,
  fetchWaterQuality,
} from "../../api/waterApi";

export function useWaterMap() {
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

  return {
    waterObjects,
    waterQuality,
    selectedLake,
    zoom,
    center,
    loadWaterObjects,
    handleSearch,
    selectLake,
  };
}
