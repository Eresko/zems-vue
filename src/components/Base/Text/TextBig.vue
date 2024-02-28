<template>
  <div class="text">
      <div  v-if="isShow" :data-index="countShowValue.value">
        <slot></slot>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue'

import {
  countShowValue,
} from './Text'
const isShow = ref(false)
const show = () => {
  isShow.value = true;
}
const beforeEnter =  (el) => {
  el.style.opacity = 0
  el.style.height = 0
}

const enter = (el, done) =>{
  let delay = el.dataset.index * 150
}
const leave = (el, done) => {
  let delay = el.dataset.index * 150
}



onMounted( async () => {
  countShowValue.value +=1
  setTimeout(show,100 * countShowValue.value +100);
})

</script>


<style lang="scss" scoped>
.text {
  color: white;
  font-size: 100px;
}
</style>