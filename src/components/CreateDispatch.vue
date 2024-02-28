<script setup>
import { ref,defineEmits,onMounted,reactive } from 'vue'
import { debouncedWatch } from '@vueuse/core'
import axios from 'axios'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css';
const notyf = new Notyf()
const times =ref([
    "00:00","00:30","01:00","01:30","02:00","02:30","03:00",
    "03:30","04:00","04:30","05:00","05:30","06:00","06:30",
    "07:00","07:30","08:00","08:30","09:00","09:30","10:00",
    "10:30","11:00","11:30","12:00","12:30","12:30","13:00",
    "13:30","14:00","14:30","15:00","15:30","16:00","16:30",
    "17:00","17:30","18:00","18:00","18:00","18:00","18:00",
    "18:00","18:30","19:00","19:30","20:00","20:30","21:00",
    "21:30","22:00","22:30","23:00","23:30"
]);
const rebounds = reactive([
  {text : "за 7 дней до дня рождения",val:7},
  {text : "за 6 дней до дня рождения",val:6},
  {text : "за 5 дней до дня рождения",val:5},
  {text : "за 4 дня до дня рождения",val:4},
  {text : "за 3 дня до дня рождения",val:3},
  {text : "за 2 дня до дня рождения",val:2},
  {text : "за 1 дня до дня рождения",val:1},
  {text : "в день рождения",val:0},
]);
const dispatch = reactive(
    {
      name : "",
      daily: 1,
      text:"",
      before:0,
      after:0,
      time:"00:00"
    }
)
const emit = defineEmits(['close'])
const createDispatch = async () => {
  let object = {
    name :dispatch.name,
    daily: dispatch.daily == 1 ? true: false,
    text: dispatch.text,
    before: dispatch.before,
    after: dispatch.after,
    time: dispatch.time
  }
  axios.post(
      "https://api-grow-test.zedform.ru/api/dispatch",object
  ).then((response) => {
    notyf.success('Successfully created')
    emit("close")
      }
  ).catch( res => {
    notyf.error(res.response.data.message)

  });
}
const countClient = ref(0);
const getCountClients = async () =>{
  await axios.get('https://api-grow-test.zedform.ru/api/clients/count').then( response  => {
    console.log(response);
    countClient.value = response.data.result;
  }).catch( res => {
    notyf.error(res)
  })
}
onMounted( async () => {
  await getCountClients();
})
</script>


<template>
  <div class="dispatch">
    <div class="title">Создать рассылку</div>
    <div class="dispatch__name">
      <div class="dispatch__header">
        <span>Название рассылки</span>
        <span> {{dispatch.name.length}}/150</span>
      </div>
      <input type="text" v-model="dispatch.name">
    </div>
    <div class="dispatch__text">
      <div>
        <span>Текст рассылки</span>
      </div>
      <textarea name="textarea" rows="10" cols="50" v-model="dispatch.text">Write something here</textarea>
    </div>
    <div class="options">
      <span class="title">Получат рассылку</span>
      <span class="options__value">{{ countClient }} из {{countClient}}</span>
    </div>
    <div class="params">
      <span>Запустите рассылку</span>
      <div class="params__select">
        <span>Регулярно</span>
        <div class="params__body">
          <select class="params__type" v-model="dispatch.daily">
            <option value="1">Ежедневно</option>
            <option value="0">Разово</option>
          </select>
          <span>в</span>
          <select class="params__time" v-model="dispatch.time">
            <option v-for="time in times"> {{time}}</option>
          </select>
          <select class="params__rebound" v-model="dispatch.before">
            <option :value="rebound.val" v-for="rebound in rebounds">{{rebound.text}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="block_button">
      <button class="block_button__save" @click="createDispatch">Сохранить</button>
      <button class="block_button__back">Назад</button>
    </div>
  </div>



</template>


<style lang="scss" scoped>
.options {
  &__value {
    font-size: 25px;
  }
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  color: #1a1a1a;
  justify-content: flex-start;
  span {
    text-align: left;
  }
}
.params {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: #1a1a1a;
  margin-bottom: 20px;
  &__rebound {
    background: white;
    color: #1a1a1a;
    border: 1px solid #1a1a1a;
    border-radius: 5px;
  }
  &__time {
    background: white;
    color: #1a1a1a;
    border: 1px solid #1a1a1a;
    border-radius: 5px;
  }
  span {
    font-family: Mulish;
    font-size: 14px;
    font-weight: 500;
    line-height: 10px;
    letter-spacing: 0.20000000298023224px;
    text-align: left;
    text-align: left;
    margin-bottom: 10px;
  }
  &__type {
    background: white;
    color: #1a1a1a;
    border: 1px solid #1a1a1a;
    border-radius: 5px;
  }
  &__select {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  &__body {
    align-items: baseline;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    select {
      margin-left: 10px;
    }
    span {
      margin-left: 10px;
    }
  }
}
.block_button {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  &__save {
    background: #339AF0;
    color: white;
    font-family: Inter;
    font-size: 14px;
    font-weight: 600;
    line-height: 17px;
    letter-spacing: 0px;
    text-align: center;
    height: 30px;
    width: 200px;
    border: 1px solid #339AF0;
    border-radius: 5px;

  }
  &__back {
    margin-left: 20px;
    background: #fff;
    color: #4E4F57;
    font-family: Inter;
    font-size: 14px;
    font-weight: 600;
    line-height: 17px;
    letter-spacing: 0px;
    text-align: center;
    height: 30px;
    width: 131px;
    border: 1px solid #4E4F57;
    border-radius: 5px;

  }
}

.dispatch {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 120px;
  width: 1100px;
  &__header {
    display: flex;
    justify-content: space-between;
    color: #1a1a1a;
  }
  &__name {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-bottom: 40px;
    input {
      background: white;
      border: 1px solid #a5a5a5;
      border-radius: 5px;
      height: 25px;
      color: #1a1a1a;
    }
  }
  &__text {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 156px;
    textarea {
      background: white;
      border: 1px solid #a5a5a5;
      border-radius: 5px;
      color: #1a1a1a;
      resize: none;
    }
  }
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