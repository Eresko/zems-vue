<script setup>
import { ref,watchEffect,onMounted,reactive,computed } from 'vue'
import { debouncedWatch } from '@vueuse/core'
const clients = ref([]);
import 'notyf/notyf.min.css';
import {getProject,page,filters,searchText} from "./AnalyticsProject"
import dayjs from 'dayjs'
import Pagination from "../Base/Pagination/Pagination.vue";
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
watchEffect(() => {
  if (page.current !== page.old) {
    page.old = page.current;
    getProject();
  }
})
onMounted( async () => {
  page.current =1
  page.old=1;
  await getProject();
})

</script>


<template>
  <div class="clients">
    <div class="title">Аналитика по проектам</div>
    <div class="projects_length">
      <span>Проектов:</span>
      <span>{{ filters.data.length }}</span>
    </div>
    <div class="body_clients">
      <div class="body_clients__header">
        <div class="body_clients__name">
          Название
        </div>
        <div class="body_clients__description">
          Затрачено часов
        </div>
        <div class="body_clients__count_task">
        </div>
      </div>
      <div class="body_clients__line"></div>
      <div class="body_clients__client"  v-for="(project,key) in filters.data" >
        <div class="body_clients__projects" >
          <div class="body_clients__name">
            {{ project.name }}
          </div>
          <div class="body_clients__description">
            {{ project.watch_sum }}
          </div>
          <div class="body_clients__date">
            <apexchart
                id="apex-chart-19"
                ref="game"
                :height="filters.charts[key].chart.height"
                :type="filters.charts[key].chart.type"
                :series="filters.charts[key].series"
                :options="filters.charts[key]"
            ></apexchart>
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
.chart_columns {
  background: #2a292b;
  margin-left: -1.5rem;
  margin-right: -1.5rem;
  margin-bottom: -1.5rem !important;
  padding-bottom: 10px;
  padding-top: 10px;
  padding-right: 30px;
  padding-left: 30px;
  border-radius: 0px 0px 18px 18px;
}
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
    height: 200px;
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
    width:40%;
  }
}
.projects_length {
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