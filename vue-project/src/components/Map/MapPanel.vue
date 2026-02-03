<template>
  <div class="w-1/3 p-4 overflow-auto border-r border-gray-700">
    <SearchBar @onSearch="handleSearch" />

    <!-- Список озер -->
    <ul class="mt-4 space-y-2">
      <li
        v-for="lake in waterObjects"
        :key="lake.id"
        @click="selectLake(lake)"
        class="p-2 rounded-lg cursor-pointer hover:bg-[#ed1572] hover:text-white transition-colors duration-200"
      >
        <span class="font-semibold">{{ lake.name }}</span>
        <span class="text-gray-400">({{ lake.region }})</span>
      </li>
    </ul>

    <!-- Панель выбранного озера -->
    <div v-if="selectedLake" class="mt-6 p-4 bg-gray-800 rounded-lg shadow-lg">
      <h3 class="text-xl font-bold mb-2">{{ selectedLake.name }}</h3>
      <p class="mb-2 text-gray-300">Регион: {{ selectedLake.region }}</p>
      <p v-if="selectedLake.description" class="mb-2 text-gray-400">
        {{ selectedLake.description }}
      </p>

      <h4 class="font-semibold mb-2">Показатели воды:</h4>
      <div class="grid grid-cols-2 gap-2 text-sm">
        <div
          v-for="(value, key) in waterQuality"
          :key="key"
          class="flex justify-between border-b border-gray-700 py-1"
        >
          <span class="text-gray-300">{{ key }}</span>
          <span class="font-medium">{{ value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchBar from "../SearchBar.vue";
import { defineProps } from "vue";

const props = defineProps({
  waterObjects: { type: Array, required: true },
  waterQuality: { type: Object, required: true },
  selectedLake: { type: Object },
  handleSearch: { type: Function, required: true },
  selectLake: { type: Function, required: true },
});
</script>
