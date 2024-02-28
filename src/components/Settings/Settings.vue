<script setup>
import { computed,defineEmits,onMounted,reactive,watchEffect } from 'vue'
import Field from '/src/components/Base/Input/FieldAndTitle.vue'
import 'notyf/notyf.min.css';
import {option, changePassword} from "./Settings"
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const disabled = computed(() => {
  return !(option.confirmation.length > 5 && option.confirmation == option.password)
})
const route = useRoute()
onMounted( async () => {
})
</script>
<template>
  <div class="project">
    <div class="title" >Настройки</div>
    <div class="project__name">
      <Field size="super-big" title="Пароль" class="field_input" >
        <input type="text" v-model="option.password">
      </Field>
    </div>
    <div class="project__name">
      <Field size="super-big" title="Подтверждение пароля" class="field_input" >
        <input type="text" v-model="option.confirmation">
      </Field>
    </div>
    <div class="block_button">
      <button class="block_button__save"  @click="changePassword()" :disabled="disabled">Изменнить</button>
      <button class="block_button__back" @click="router.push('/')">Назад</button>
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

.block_button {
  margin-top: 30px;
  width: 450px;
  display: flex;
  justify-content: space-between;
  button {
    background: #646cff;
  }
  button:hover {
    background: #646caa;
  }
  button:disabled {
    background: #a5a5a5;
  }
}

.project {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 120px;
  width: 1100px;
  .field_input {
    justify-content: left;
    display: flex;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    color: #1a1a1a;
    width: 350px;
  }
  &__name {
    display: flex;
    flex-direction: column;
    justify-content: left;
    margin-bottom: 40px;
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
  color: #ffffff;
  font-family: Mulish;
  font-size: 20px;
  font-weight: 900;
  line-height: 20px;
  letter-spacing: 0.20000000298023224px;
  text-align: left;

}


</style>