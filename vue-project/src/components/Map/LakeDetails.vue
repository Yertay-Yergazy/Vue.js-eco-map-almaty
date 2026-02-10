<template>
  <aside
    v-if="lake"
    class="absolute top-0 right-0 h-full w-[30%] bg-gray-900/95 backdrop-blur border-l border-gray-700 z-[1000] flex flex-col p-6 shadow-2xl"
  >
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-white mb-1">
        {{ lake.name }}
      </h2>
      <p class="text-lg text-gray-400">
        {{ lake.region }}
      </p>
    </div>

    <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
      <div
        v-if="!Object.keys(waterQuality).length"
        class="text-center py-10 text-gray-500"
      >
        <div class="animate-pulse">Загрузка данных об озере...</div>
      </div>

      <div v-else class="grid grid-cols-1 gap-3">
        <div
          v-for="(label, key) in indicators"
          :key="key"
          class="bg-gray-800/50 border border-gray-700 rounded-xl p-4 flex justify-between items-center hover:bg-gray-800 transition-colors"
        >
          <span class="text-gray-300 font-medium">{{ label }}</span>
          <span class="font-mono font-bold text-pink-500 text-lg">
            {{ waterQuality[key] ?? "—" }}
          </span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { defineProps } from "vue";

// Принимаем пропсы
const props = defineProps({
  lake: { type: Object, required: true },
  waterQuality: { type: Object, required: true },
});

// Справочник индикаторов (ключи должны совпадать с ключами из API)
const indicators = {
  Z: "Загрязнение",
  H: "Жёсткость",
  O: "Кислород",
  Tr: "Прозрачность",
  G: "Газ",
  I: "Ионы",
  Fl: "Фтор",
  A: "Аммоний",
  M: "Минерализация",
  Fa: "Фауна",
  D: "Донные отложения",
  Thw: "Температура (глуб.)",
  W: "Запах",
  Ka: "Кальций",
  T: "Турбидность",
  SAR: "SAR",
  Tw: "Темп. воды",
  IIWP_Dc: "Индекс воды",
  pH: "pH",
};
</script>

<style scoped>
/* Тонкий скроллбар для эстетики */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #374151;
  border-radius: 10px;
}
</style>
