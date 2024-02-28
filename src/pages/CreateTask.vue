<script setup>
import { onMounted,ref } from 'vue'
import Dashboard from "../components/Dashbord/Dashboard.vue";
import CreateTask from "../components/CreateTask/CreateTask.vue";
import { checkUser } from "../store/CheckLogin"
import { token } from "../store/user"
const login = ref(false);
onMounted( async () => {
  if (token().length == 0) {
    login.value = await checkUser();
  }
  else {
    login.value = true
  }
})
</script>

<template>
  <Dashboard v-if="login"/>
  <CreateTask v-if="login"/>
</template>

<style>
.main {
  width: 100vw;
  display: flex;
  justify-content: left;
  height: 100vw;
}
#app {
  width: 100vw;
  height: 100vh;
  margin: 0!important;
  padding: 0!important;
  background-color: white;
  display: flex;
  flex-direction: row;
  background: #1a1a1a;
}
</style>