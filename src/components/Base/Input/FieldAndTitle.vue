<script setup lang="ts">
import { computed, PropType, defineProps } from 'vue'
type size =  'small' | 'average' | 'big' | 'super-big'
const props = defineProps({
  size: {
    type: String as PropType<size>,
    default: "small",
  },
  title: {
    type: String,
    default: "",
  },
})

</script>
<template>
  <div  class="field_block" >
    <span class="field_block__title">{{ props.title }}</span>
    <div class="field_block__input " :class="size">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>

</script>


<style lang="scss">
.field_block {
  justify-content: left;
  display: flex;
  flex-direction: column;
  color: white;
  margin-top: 20px;
  &__input {
    display: flex;

    input {
      border: 1px solid #646cff;
      border-radius: 5px;
    }
    textarea {
      border: 1px solid #646cff;
      border-radius: 5px;
      resize: none;
    }
  }
  .small {
    input {
      width: 150px;
      height: 28px;
      font-size: 20px;
    }
    textarea {
      font-size: 20px;
    }
  }
  .average {
    input {
      width: 250px;
      height: 28px;
      font-size: 20px;
    }
    textarea {
      font-size: 20px;
      width: 250px;
    }
  }
  .big {
    input {
      width: 350px;
      height: 28px;
      font-size: 20px;
    }
    textarea {
      font-size: 20px;
      width: 350px;
    }
  }
  .super-big {
    input {
      width: 450px;
      height: 28px;
      font-size: 20px;
    }
    textarea {
      font-size: 20px;
      width: 450px;
    }
  }
  &__title {
    text-align: left;
    font-weight: 600;
    fontweight: 600;
    font-family: 'degular', 'Montserrat', sans-serif;
    font-size: 20px;

  }

}


</style>