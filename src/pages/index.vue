<script setup>
import { onMounted,ref } from 'vue'
import Index from "../components/Index/Index.vue";
import Dashboard from "/src/components/Dashbord/Dashboard.vue";
import Login from "/src/components/Login/Index.vue";
import { checkUser } from "../store/CheckLogin"
import { token } from "../store/user"
const loginFlag = ref(false);

onMounted( async () => {
  if ((token() == null) || (token().length == 0)) {
    loginFlag.value = await checkUser();
  }
  else {
    loginFlag.value = true
  }
})
</script>

<template>
  <Dashboard v-if="loginFlag"/>
  <Index v-if="loginFlag"/>
  <Login v-if="!loginFlag"/>
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
