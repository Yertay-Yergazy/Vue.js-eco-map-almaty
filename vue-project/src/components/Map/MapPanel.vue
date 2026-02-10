<template>
  <div
    class="flex flex-col bg-gray-900 border-r border-gray-700 h-full overflow-hidden"
  >
    <div class="p-4 flex items-center justify-between border-b border-gray-800">
      <h2 class="font-bold text-lg text-pink-500 tracking-tight">
        Водные объекты
      </h2>

      <button
        @click="$emit('close')"
        class="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-gray-800 transition-all active:scale-95"
        title="Скрыть панель"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
      </button>
    </div>

    <div class="flex-1 overflow-y-auto p-4 custom-scrollbar">
      <SearchBar @onSearch="handleSearch" />

      <ul class="mt-4 space-y-2">
        <li
          v-for="lake in waterObjects"
          :key="lake.id"
          @click="selectLake(lake)"
          class="p-3 rounded-xl cursor-pointer bg-gray-800/30 border border-transparent hover:border-pink-500/50 hover:bg-[#ed1572]/10 transition-all duration-200 group"
        >
          <div class="flex flex-col">
            <span
              class="font-semibold group-hover:text-pink-400 transition-colors"
            >
              {{ lake.name }}
            </span>
            <span class="text-xs text-gray-500 uppercase tracking-wider mt-1">
              {{ lake.region }}
            </span>
          </div>
        </li>
      </ul>
    </div>

    <div class="mt-auto border-t border-gray-800 p-4 bg-gray-900/50">
      <button
        @click="showSettings = true"
        class="flex items-center space-x-3 text-gray-400 hover:text-white w-full p-2 rounded-xl hover:bg-gray-800 transition-all group"
      >
        <div
          class="bg-gray-800 p-2 rounded-lg group-hover:bg-gray-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 group-hover:rotate-45 transition-transform duration-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <span class="text-sm font-medium">Настройка и справка</span>
      </button>
    </div>
    <Teleport to="body">
      <div
        v-if="showSettings"
        class="fixed inset-0 z-[10001] flex items-end justify-start p-6"
        @click.self="showSettings = false"
      >
        <div
          class="fixed inset-0 bg-black/40"
          @click="showSettings = false"
        ></div>

        <div
          class="relative bg-gray-900 border border-gray-700 w-80 rounded-2xl shadow-2xl overflow-hidden slide-up-left shadow-pink-500/5"
        >
          <div
            class="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900"
          >
            <h3 class="font-bold text-gray-100">Настройки</h3>
            <button
              @click="showSettings = false"
              class="text-gray-500 hover:text-white transition-colors text-xl"
            >
              &times;
            </button>
          </div>

          <div class="p-2 bg-gray-900">
            <button
              v-for="item in settingsMenu"
              :key="item.text"
              class="w-full text-left p-3 hover:bg-gray-800 rounded-xl transition-all flex items-center space-x-3 group"
            >
              <span
                class="text-lg opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform"
              >
                {{ item.icon }}
              </span>
              <span
                class="text-gray-300 group-hover:text-white font-medium text-sm"
              >
                {{ item.text }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import SearchBar from "../SearchBar.vue";
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  waterObjects: { type: Array, required: true },
  handleSearch: { type: Function, required: true },
  selectLake: { type: Function, required: true },
});

// Определяем событие для родителя
defineEmits(["close"]);

const showSettings = ref(false);

const settingsMenu = [
  { icon: "🌓", text: "Тема оформления" },
  { icon: "💬", text: "Отправить отзыв" },
  { icon: "🔒", text: "Конфиденциальность" },
  { icon: "❓", text: "Справочный центр" },
  { icon: "📊", text: "Статистика запросов" },
];
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #374151;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #ed1572;
}

.scale-in-center {
  animation: scale-in-center 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
@keyframes scale-in-center {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
