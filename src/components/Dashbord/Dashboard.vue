<script setup>
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const exit = () => {
  localStorage.setItem('token',"")
  window.location.replace("/")
}
</script>
<template>
  <div class="dashbord">
    <div class="title">Панель управления</div>
    <div class="menu">
      <div class="element_menu" @click="router.push('/')">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-520q-33 0-56.5-23.5T120-600v-160q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v160q0 33-23.5 56.5T760-520H200Zm0-80h560v-160H200v160Zm0 480q-33 0-56.5-23.5T120-200v-160q0-33 23.5-56.5T200-440h560q33 0 56.5 23.5T840-360v160q0 33-23.5 56.5T760-120H200Zm0-80h560v-160H200v160Zm0-400v-160 160Zm0 400v-160 160Z"/></svg>
        <span>Проекты</span>
      </div>
      <div class="element_menu" @click="router.push('/analytics-project')">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-162v82h560v-350L522-280 360-442 200-282Zm0-114 160-160 158 158 242-272v-90H200v364Zm0-154v-120 272-158 274-160 162-270Zm0 154v-364 362-158 160Zm0 114v-160 162-270 350-82Z"/></svg>
        <span>Анализ по прокетам</span>
      </div>
      <div class="element_menu" @click="router.push('/users')">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
        <span>Пользователи</span>
      </div>
      <div class="element_menu" @click="router.push('/settings')">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M686-132 444-376q-20 8-40.5 12t-43.5 4q-100 0-170-70t-70-170q0-36 10-68.5t28-61.5l146 146 72-72-146-146q29-18 61.5-28t68.5-10q100 0 170 70t70 170q0 23-4 43.5T584-516l244 242q12 12 12 29t-12 29l-84 84q-12 12-29 12t-29-12Zm29-85 27-27-256-256q18-20 26-46.5t8-53.5q0-60-38.5-104.5T386-758l74 74q12 12 12 28t-12 28L332-500q-12 12-28 12t-28-12l-74-74q9 57 53.5 95.5T360-440q26 0 52-8t47-25l256 256ZM472-488Z"/></svg>
        <span>Настройки</span>
      </div>
      <div class="element_menu" @click="exit">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
        <span>Выход</span>
      </div>
    </div>
  </div>



</template>


<style lang="scss" scoped>
.dashbord {
  width: 250px;
  max-width: 250px;
  min-width: 250px;
  background: #292929;
  border-right: 1px solid #4E4F57;
}
.menu {
  margin-top: 10px;
}
.title {
  margin-left: 10px;
  margin-top: 30px;
  color: #fff;
  font-family: Mulish;
  font-size: 20px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.20000000298023224px;
  text-align: left;
  padding-bottom: 20px;
  border-bottom: 1px solid #4E4F57;

}
.element_menu {
  cursor: pointer;
  fill:#fff;
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-bottom: 20px;
  color: #363740;
  font-family: Mulish;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  span {
    color: white;
    padding-left: 10px;
  }

}
.element_menu:hover {
  span {
    color:#646cff!important;
  }

  background: #3a3a3a;
}


</style>