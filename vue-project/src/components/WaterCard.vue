<template>
  <div v-if="water">
    <h2 class="text-xl text-accent mb-4">{{ water.name }}</h2>

    <div class="grid grid-cols-2 gap-2 text-sm">
      <div v-for="(value, key) in water.quality" :key="key">
        <span class="text-muted">{{ key }}</span
        >:
        <span class="text-water">{{ value }}</span>
      </div>
    </div>
  </div>

  <div v-else class="text-muted">Выберите водоём</div>
</template>

<script setup>
defineProps({
  water: Object,
});
</script>
