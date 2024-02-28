<script setup>
import { computed,defineEmits,onMounted,reactive,watchEffect } from 'vue'
import { debouncedWatch } from '@vueuse/core'
import axios from 'axios'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css';
const notyf = new Notyf()
const client = reactive(
    {
      name : "",
      phone: "",
      email:"",
      birthday:"",
    }
)
const emit = defineEmits(['close'])
const createClient = async () => {
  let object = {
    name :client.name,
    phone: client.phone,

    birthday: client.birthday,
  }
  if (client.email.length > 0) {
    object.email = client.email
  }
  axios.post(
      "https://api-grow-test.zedform.ru/api/clients",object
  ).then((response) => {
        notyf.success('Successfully created')
        emit("close")
      }
  ).catch( res => {
    notyf.error(res.response.data.message)

  });
}
const block = computed(() => {
  return client.phone.replace(/[\(\)\-\s]/g, "").length < 10
})
const change = () => {
  if (!value) return;
  let val = value;
  if (val[0] === '8') {
    val = val.replace('8', '+7');
  }
  if (val.replace(/[^0-9]+/g, '') === '789') {
    val = '79';
  }

}

const changeDate = () => {
  if (!client.birthday) return;
  let val = client.birthday;
  let number = val.split('.');
  let numberDay = parseInt(number[0])
  let numberMonth = parseInt(number[1])
  let numberYear = parseInt(number[2])
  if ((numberYear > 0) && (numberMonth > 12)){
    numberMonth = 12;
  }
  if ((numberMonth> 0) && (numberMonth < 13)) {
    console.log(numberMonth)
    if (([1,3,5,7,8,10,12].indexOf(numberMonth)) && (numberDay > 31)) {
      numberDay = 31;
    }
    if (([4,6,9,11].indexOf(numberMonth)) && (numberDay > 30)) {
      numberDay = 30;
    }
    if (([2].indexOf(numberMonth)) && (numberYear% 4 == 0) && (numberDay > 29)) {
      numberDay = 29;
    }
    if (([2].indexOf(numberMonth)) && (numberYear% 4 != 0) && (numberDay > 28)) {
      numberDay = 28;
    }
    if (numberDay ==0) {
      numberDay =1
    }
  }
  let day = numberDay <10 ? '0' + numberDay : numberDay
  let month =  numberMonth < 10 ? '0' + numberMonth : numberMonth;
  client.birthday = day + '.' +  month + '.' +  number[2]
}
watchEffect(() => {
})
const   bindPhoneMask = (inputElement, regexMask = null, placeholder = null) =>{
  if (!regexMask) regexMask = '^\\+7 \\([3489]\\d\\d\\) \\d\\d\\d \\d\\d \\d\\d$';
  if (!placeholder) placeholder = '+7 (___) ___ __ __';

  Inputmask({
    regex: regexMask,
    placeholder: placeholder,
    postValidation: buffer => {
      let nums = buffer.join('').replace(/[^0-9]+/g, '');
      let hasSevenNumbersInARow = (/(\d)\1{6}/g).test(nums);
      return !hasSevenNumbersInARow;
    }
  }).mask(inputElement);
}

const   bindPhoneMaskDate = (inputElement, regexMask = null, placeholder = null) =>{
  if (!regexMask) regexMask = '\\d\\d\\.\\d\\d\\.\\d\\d\\d\\d$';
  if (!placeholder) placeholder = '__.__.____';

  Inputmask({
    regex: regexMask,
    placeholder: placeholder,
    postValidation: buffer => {
      let nums = buffer.join('').replace(/[^0-9]+/g, '');
      let hasSevenNumbersInARow = (/(\d)\1{6}/g).test(nums);
      return !hasSevenNumbersInARow;
    }
  }).mask(inputElement);
}

onMounted( async () => {
  let selector = document.getElementsByClassName('phone-input');
  let selectorDate = document.getElementsByClassName('date-input');
  bindPhoneMask(selector);
  bindPhoneMaskDate(selectorDate);
})
</script>


<template>
  <div class="dispatch">
    <div class="title">Создать клиента</div>
    <div class="dispatch__name">
      <div class="dispatch__header">
        <span>Имя</span>
        <span> {{client.name.length}}/11</span>
      </div>
      <input type="text" v-model="client.name">
    </div>
    <div class="dispatch__name">
      <div class="dispatch__header">
        <span>Телефон</span>
        <span> {{client.phone.length}}/18</span>
      </div>
      <input type="tel" v-model="client.phone"  class="phone-input" placeholder="+7(___)___-__-__">
    </div>
    <div class="dispatch__name">
      <div class="dispatch__header">
        <span>email</span>
        <span> {{client.email.length}}/150</span>
      </div>
      <input type="text" v-model="client.email">
    </div>
    <div class="dispatch__name">
      <div class="dispatch__header">
        <span>дата рождения</span>
        <span> {{client.birthday.length}}/150</span>
      </div>
      <input type="text" v-model="client.birthday" format="DD.MM.YYYY" @change="changeDate" class="date-input">
    </div>
    <div class="block_button">
      <button class="block_button__save" @click="createClient" :disabled="block">Сохранить</button>
      <button class="block_button__back" @click="emit('close')">Назад</button>
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
    width: 350px;
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
      width: 350px;
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