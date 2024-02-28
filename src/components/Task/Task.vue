<script setup>
import { ref,watchEffect,onMounted,reactive,computed } from 'vue'
import { debouncedWatch } from '@vueuse/core'
const clients = ref([]);
import Pagination from "/src/components/Base/Pagination/Pagination.vue";
import 'notyf/notyf.min.css';
import {getTask,page,filters,searchText,projectId} from "./Task"
import dayjs from 'dayjs'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()

const route = useRoute()
debouncedWatch(searchText, () => getTask(), { debounce: 500 })
const nameProject =ref("")
watchEffect( async () => {
  if (page.current !== page.old) {
    page.old = page.current;
    await getTask();
  }
})
onMounted( async () => {
  page.current =1
  page.old=1;
  if (route.query.name) {
    nameProject.value =route.query.name
  }
  if (route.query.id) {
    projectId.value = route.query.id
    await getTask()
  }
})

</script>


<template>
  <div class="clients">
    <div class="title">Задачи прокта :{{ nameProject }}</div>
    <div class="search">
      <div class="search__block">
        <input type="text" class="search__input" v-model="searchText">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
      </div>
    </div>
    <div class="projects_block_button">
      <button @click="router.push('/create-task?id=' + projectId + '&name=' + nameProject)">Создать задачу</button>
    </div>
    <div class="task_length">
      <span>Задач:</span>
      <span>{{ filters.total }}</span>
    </div>
    <div class="body_clients">
      <div class="body_clients__header">
        <div class="body_clients__name">
          Название
        </div>
        <div class="body_clients__description">
          Описание
        </div>
        <div class="body_clients__count_task">
          Кол-во часов по задаче
        </div>
        <div class="body_clients__date">
          Дата создания
        </div>
      </div>
      <div class="body_clients__line"></div>
      <div class="body_clients__client" v-for="task in filters.data" @click="router.push('/timestamp?project_id=' + projectId  + '&name_project=' + nameProject + '&task_id=' + task.id + '&task_name=' + task.name)">
        <div class="body_clients__projects" >
          <div class="body_clients__name">
            {{ task.name }}
          </div>
          <div class="body_clients__description">
            {{ task.description }}
          </div>
          <div class="body_clients__count_task">
            3
          </div>
          <div class="body_clients__date">
            {{  dayjs(task.created_at).format('MMM DD, YYYY')  }}
          </div>
        </div>
        <div class="body_clients__line"></div>
      </div>
    </div>
    <Pagination
        v-if="filters.last_page > 1 "
        :total-items="filters.total"
        :item-per-page="filters.per_page"
        :current-page="filters.current_page"
        :max-links-displayed="3"
        @update:page="page.current = $event"
    />
  </div>
</template>


<style lang="scss" scoped>
.projects_block_button {
  display: flex;
  margin-top: 20px;
  button {
    background: #646cff;
  }
  button:hover {
    background: #646caa;
  }
}
.body_clients {
  color: #fff;
  &__line {
    border-bottom: 1px solid #a5a5a5;
    margin-bottom: 5px;
    width: 800px;
  }
  &__projects {
    cursor: pointer;
    display: flex;
    width: 800px;
    height: 100px;
    color: #fff;
    font-family: Mulish;
    font-size: 14px;
    font-weight: 400;
    line-height: 10px;
    letter-spacing: 0.20000000298023224px;
    text-align: left;
  }
  &__projects:hover {
    background: #2a2a2a;
  }
  &__header {
    display: flex;
    width: 800px;
    color: #fff;
    font-family: Mulish;
    font-size: 14px;
    font-weight: 400;
    line-height: 10px;
    letter-spacing: 0.20000000298023224px;
    text-align: left;
    margin-bottom: 2px;
  }
  &__name {
    display: flex;
    align-items: center;
    width: 20%;
  }
  &__description {
    display: flex;
    align-items: center;
    width:40%;
  }
  &__count_task {
    display: flex;
    align-items: center;
    width:20%;
  }
  &__date {
    display: flex;
    align-items: center;
    width:20%;
  }
}
.task_length {
  margin-top: 20px;
  margin-bottom: 20px;
  color: #fff;
  font-family: Mulish;
  font-size: 14px;
  font-weight: 900;
  line-height: 20px;
  letter-spacing: 0.20000000298023224px;
  text-align: left;
}
.search {
  display: flex;
  &__block {
    background-color: #1a1a1a;
    position: relative;
    border: 1px solid #646cff;
    border-radius: 5px;
    width: 400px;
    height: 30px;
  }
  &__input {
    left:30px;
    height: 27px;
    width: 360px;
    position: absolute;
    color: #fff;
    background-color: #1a1a1a;
    border: none;
    outline:none;
  }
  svg {
    fill: #fff;
    position: absolute;
    left: 5px;
    height: 28px;
    cursor: pointer;
  }
}
.clients {
  margin: 120px;
  width: 1100px;
}
.title {
  margin-bottom: 20px;
  color: #ffffff;
  font-family: Mulish;
  font-size: 20px;
  font-weight: 900;
  line-height: 20px;
  letter-spacing: 0.20000000298023224px;
  text-align: left;

}


</style>