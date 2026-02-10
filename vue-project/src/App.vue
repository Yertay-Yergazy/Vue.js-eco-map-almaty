<template>
  <RouterView />
</template>

<script setup>
// В простых случаях здесь даже не нужно ничего импортировать,
// если RouterView зарегистрирован глобально (что обычно делает плагин router)
</script>

<style>
/* Сбрасываем лишние отступы, чтобы карта занимала весь экран */
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

body {
  overflow: hidden; /* Чтобы не было случайных скроллов у всего приложения */
}
</style>
