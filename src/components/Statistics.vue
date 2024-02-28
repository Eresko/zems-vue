<script setup>
import { ref,watchEffect,onMounted,reactive,computed } from 'vue'
import { debouncedWatch } from '@vueuse/core'
import axios from 'axios'
const statistics = ref([]);
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css';
const notyf = new Notyf()
const filters = ref({
  current_page: 1,
  per_page: 10,
  total: 0,
  last_page: 0,
})


const page = reactive({current: 1,old:1})
const getStatistics = async () => {
  await axios.get('https://api-grow-test.zedform.ru/api/dispatch?page=' + page.current  ).then( response  => {
    console.log(response);
    statistics.value = response.data.result.data
    filters.value.current_page = response.data.result.currentPage
    filters.value.per_page = response.data.result.perPage
    filters.value.total = response.data.result.total
    filters.value.last_page = response.data.result.lastPage
    notyf.success('update list dispatch')
  }).catch( res => {
    notyf.error('error')
  })

}
watchEffect(() => {
  if (page.current !== page.old) {
    page.old = page.current;
    getStatistics();
  }
})
onMounted( async () => {
  await getStatistics();
})
</script>


<template>
  <div class="statistic">
    <div class="title">Рассылки</div>
    <div class="body_statistic">
      <div class="body_statistic__header">
        <div class="body_statistic__check_box">
          <input type="checkbox" class="body_clients__checkbox">
        </div>
        <div class="body_statistic__name">
          Название
        </div>
        <div class="body_statistic__status">
          Статус
        </div>
        <div class="body_statistic__push">
          Отправлено
        </div>
        <div class="body_statistic__delivered">
          Доставлено
        </div>
      </div>
      <div class="body_statistic__line"></div>
      <div class="body_statistic__client">
        <div class="body_statistic__clients" v-for="statistic in statistics">
          <div class="body_statistic__check_box">
            <input type="checkbox" class="body_clients__checkbox">
          </div>
          <div class="body_statistic__name">
            {{ statistic.name }}
          </div>
          <div class="body_statistic__status">
            <span>Работает</span>
          </div>
          <div class="body_statistic__push">
            <div>
              {{  Math.round(statistic.countFalse/(statistic.countOk + statistic.countFalse)*100)  }}%
              <span>
              {{  statistic.countFalse + statistic.countOk  }}
              </span>
            </div>
          </div>
          <div class="body_statistic__delivered">
            <span>{{  statistic.countOk}}</span>
          </div>
        </div>
        <div class="body_statistic__line"></div>
      </div>
    </div>

  </div>



</template>


<style lang="scss" scoped>
.body_statistic {


  &__line {
    border-bottom: 1px solid #a5a5a5;
    margin-bottom: 5px;
  }
  &__clients {
    display: flex;
    width: 800px;
    color: #252733;
    font-family: Mulish;
    font-size: 14px;
    font-weight: 400;
    line-height: 10px;
    letter-spacing: 0.20000000298023224px;
    text-align: left;
  }
  &__header {
    display: flex;
    width: 800px;
    color: #252733;
    font-family: Mulish;
    font-size: 14px;
    font-weight: 400;
    line-height: 10px;
    letter-spacing: 0.20000000298023224px;
    text-align: left;
  }
  &__checkbox {
    width: 20px;
    height: 20px;
    background: #ffffff;
    fill: white;
  }
  &__check_box {
    background: white;
    width: 10%;
  }
  &__name {
    display: flex;
    align-items: center;
    width: 20%;
  }
  &__status {
    display: flex;
    align-items: center;
    width:20%;
    span {
      background: #D2F3D2;
      border-radius: 5px;
      padding: 4px;
    }
  }
  &__push {
    display: flex;
    align-items: center;
    width:20%;
    div {
      background: #D2F3D2;
      border-radius: 5px;
      padding-left: 10px;
      padding-right: 10px;
      padding-bottom: 4px;
      padding-top: 4px;
    }
    span {
      margin-left: 10px;
    }
  }
  &__delivered {
    display: flex;
    align-items: center;
    width:20%;
    span {
      background: #D2F3D2;
      border-radius: 5px;
      padding-left: 10px;
      padding-right: 10px;
      padding-bottom: 4px;
      padding-top: 4px;
    }
  }

  &__check_box {

  }
}
.clients_length {
  margin-top: 5px;
  margin-bottom: 20px;
  color: #1a1a1a;
  font-family: Mulish;
  font-size: 14px;
  font-weight: 900;
  line-height: 20px;
  letter-spacing: 0.20000000298023224px;
  text-align: left;
}

.statistic {
  margin: 120px;
  width: 1100px;
}
.title {
  margin-bottom: 20px;
  color: #1a1a1a;
  font-family: Mulish;
  font-size: 14px;
  font-weight: 900;
  line-height: 20px;
  letter-spacing: 0.20000000298023224px;
  text-align: left;

}


</style>