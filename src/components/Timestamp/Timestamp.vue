<script setup>
import { ref,watchEffect,onMounted,reactive,computed } from 'vue'
import { debouncedWatch } from '@vueuse/core'
const clients = ref([]);
import 'notyf/notyf.min.css';
import {getTaskCurrent, params, task,createTimestamp} from "./Timestamp"
import { useRouter, useRoute } from 'vue-router'
import Field from "../Base/Input/FieldAndTitle.vue";
const router = useRouter()
const route = useRoute()

onMounted( async () => {
  if (route.query.name_project) {
    params.projectName =route.query.name_project
  }
  if (route.query.project_id) {
    params.projectId = route.query.project_id
  }
  if (route.query.task_id) {
    params.taskId = route.query.task_id
    await getTaskCurrent(params.taskId)
  }
  if (route.query.task_name) {
    params.taskName = route.query.task_name
  }
})
const watch = ref(1)
watchEffect(() => {
  if (watch.value) {
    if (parseInt(watch.value) > 24) {
      watch.value =24
    }
  }
})
</script>


<template>
  <div class="timestamp">
    <div class="title">Задача: "{{ params.taskName }}" прокта :{{ params.projectName }}</div>
    <div class="description">
      <Field size="super-big" title="Описание задачи" class="field_input">
        <textarea name="textarea" rows="10" cols="50" :value="typeof task.description != 'undefined' ? task.description : ''" readonly>
        </textarea>
      </Field>
    </div>
    <div>
      <Field size="small" title="Затраченное время" class="field_input">
        <input size="33" type="number" v-model="watch">
      </Field>
    </div>
    <div class="block_button">
      <button class="block_button__save"  @click="createTimestamp(watch)" >Сохранить</button>
      <button class="block_button__back" @click="router.push('/task?id=' + params.projectId  + '&name=' + params.projectName)">Назад</button>
    </div>
  </div>
</template>


<style lang="scss" scoped>
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


.timestamp {
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