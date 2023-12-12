<script setup lang="ts">
import Title from './components/Title.vue'
import Content from './components/Content.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <Title msg="일본어 단어장" />
    </div>
  </header>

  <main>
    <Content />
  </main>
</template>

<style scoped>

@media (min-width: 1024px) {
}
</style>
