<script setup lang="ts">
import { ref } from 'vue';
import Display from './Display.vue';
const currentCategory = ref('a');
const currentKind = ref('a');

const changeCategory = (category: string, kind: string) => {
  currentCategory.value = category;
  currentKind.value = kind;
  console.log(currentCategory.value)
};
</script>

<template>
  <div>
    <ul>
      <button @click="changeCategory('a','a')"><li>a</li></button>
      <button @click="changeCategory('a','i')"><li>i</li></button>
      <button @click="changeCategory('a','u')"><li>u</li></button>
      <button @click="changeCategory('a','e')"><li>e</li></button>
      <button @click="changeCategory('a','o')"><li>o</li></button>
    </ul>
    <ul>
      <button @click="changeCategory('ka','ka')"><li>ka</li></button>
      <button @click="changeCategory('ka','ki')"><li>ki</li></button>
      <button @click="changeCategory('ka','ku')"><li>ku</li></button>
      <button @click="changeCategory('ka','ke')"><li>ke</li></button>
      <button @click="changeCategory('ka','ko')"><li>ko</li></button>
    </ul>
    <ul>
      <button @click="changeCategory('sa','sa')"><li>sa</li></button>
      <button @click="changeCategory('sa','shi')"><li>shi</li></button>
      <button @click="changeCategory('sa','su')"><li>su</li></button>
      <button @click="changeCategory('sa','se')"><li>se</li></button>
      <button @click="changeCategory('sa','so')"><li>so</li></button>
    </ul>
    <ul>
      <button @click="changeCategory('ta','ta')"><li>ta</li></button>
      <button @click="changeCategory('ta','chi')"><li>chi</li></button>
      <button @click="changeCategory('ta','tsu')"><li>tsu</li></button>
      <button @click="changeCategory('ta','te')"><li>te</li></button>
      <button @click="changeCategory('ta','to')"><li>to</li></button>
    </ul>
    <Display :category="currentCategory" :kind="currentKind" />
  </div>
</template>

<style scoped>
button {
  padding: 10px 10px;
  margin-left: 3px;
}

ul {
  list-style: none;
}
</style>
