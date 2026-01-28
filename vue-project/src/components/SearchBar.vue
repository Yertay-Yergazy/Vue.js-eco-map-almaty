<template>
  <div>
    <input
      type="text"
      v-model="query"
      @input="onInput"
      placeholder="Поиск по озерам или рекам..."
      class="w-full p-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#ed1572]"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { debounce } from "lodash-es"; // установи через npm i lodash-es

const props = defineProps({
  onSearch: Function,
});

const query = ref("");

const onInput = debounce(() => {
  props.onSearch(query.value);
}, 300);
</script>
