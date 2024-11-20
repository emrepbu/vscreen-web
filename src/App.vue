<script setup>
import ScreenComponent from './components/ScreenComponent.vue';

</script>

<template>
  <main>
    <ScreenComponent
        headerText="Screen 1"
        :initialPosition="{ x: 100, y: 100 }"
        :initialSize="{ width: 300, height: 200 }"
        content="This is the content of Screen 1."
        headerColor="#FF5722"
    />
    <ScreenComponent
        headerText="Screen 2"
        :initialPosition="{ x: 500, y: 100 }"
        :initialSize="{ width: 300, height: 200 }"
        content="This is the content of Screen 2."
        headerColor="#3F51B5"
    />
  </main>
</template>

<style scoped>

</style>
