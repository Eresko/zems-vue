<script setup>
import Text from '/src/components/Base/Text/TextBig.vue'
import Field from '../Base/Input/FieldAndTitle.vue'
import {
  option,
  registrationRequest,
  loginRequest,
  isRegActive
} from "./Input"


</script>


<template>
  <div class="login">
    <div class="login__block" v-if="!isRegActive">
      <Text>TASK</Text>
      <Text>TRACKER</Text>
      <Field size="average" title="Email" class="field_input">
        <input type="text" v-model="option.login">
      </Field>
      <Field size="average" title="Пароль">
        <input type="password" v-model="option.password">
      </Field>
      <div class="block_button">
        <button @click="loginRequest">Войти</button>
        <button @click="isRegActive = !isRegActive">Зарегестрироваться</button>
      </div>
    </div>
    <div class="login__block" v-else>
      <Text>TASK</Text>
      <Text>TRACKER</Text>
      <Field size="average" title="Имя" class="field_input">
        <input type="text" v-model="option.name">
      </Field>
      <Field size="average" title="Email" class="field_input">
        <input type="text" v-model="option.login">
      </Field>
      <Field size="average" title="Пароль">
        <input type="text" v-model="option.password">
      </Field>
      <div class="block_button">
        <button @click="registrationRequest">Ok</button>
        <button @click="isRegActive = !isRegActive">Вернуться</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.block_button {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  button {
    background: #646cff;
  }
  button:hover {
    background: #646caa;
  }
}
.field_input {
  margin-top: 30px;
}
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 50vw;
  &__block {
    width: 400px;
    text-align: left;
  }
}


</style>