<script setup>
import { ref } from "vue";
import { debounce } from "lodash-es";

const emit = defineEmits(["search"]); // <-- создаём событие search
const query = ref("");

const onInput = debounce(() => {
  emit("search", query.value); 
}, 300);
</script>

<template>
  <input
    type="text"
    v-model="query"
    @input="onInput"
    placeholder="Поиск водоёма..."
    class="p-2 rounded bg-gray-800 text-white w-full"
  />
</template>
