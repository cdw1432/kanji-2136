<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
    category: String,
    kind: String
});

const jsonData = ref<any[]>([]);

const loadJsonData = async () => {
  try {
    const jsonModule = await import(`../../words/${props.category}/${props.kind}.json`);
    jsonData.value = jsonModule.default;
  } catch (error) {
    console.error(`Failed to load JSON data for category ${props.category}/${props.kind}.`, error);
  }
};

watch(() => {
    return props.category, props.kind
}, loadJsonData);

onMounted(loadJsonData);
</script>

<template>
  <div>
    <div v-for="data in jsonData" :key="data.word">
      <p>
        <a>{{ data.word }}</a>[{{ data.reading }}] => {{ data.definition }}
      </p>
    </div>
  </div>
</template>

<style scoped>
</style>
