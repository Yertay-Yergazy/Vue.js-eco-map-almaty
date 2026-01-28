<template>
  <div class="grid grid-cols-12 h-screen">
    <div class="col-span-3 bg-panel p-4">
      <WaterList @select="selectWater" />
    </div>

    <div class="col-span-3 bg-panel p-4">
      <WaterCard :water="selectedWater" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import WaterList from "../components/WaterList.vue";
import WaterCard from "../components/WaterCard.vue";

const selectedWater = ref(null);

const selectWater = (water) => {
  selectedWater.value = water;
};
</script>
