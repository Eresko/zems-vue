<script setup>
import { ref } from 'vue'
import Project from "../Project/Project.vue";
const type = ref(1);
</script>

<template>
  <div class="main">
    <Project v-if="type==1"/>
  </div>
</template>

<style>
.main {
  width: 100vw;
  display: flex;
  justify-content: left;
  height: 100%;
}
#app {
  max-width: 1920px!important;
  height: 200vh;
  margin: 0!important;
  padding: 0!important;
  background-color: white;
}
</style>