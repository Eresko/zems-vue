<template>
  <div
      class="input-container"
  >
    <div class="text">
      <slot></slot>
    </div>
    <input :value="text" readonly />
  </div>
</template>

<script setup>

</script>


<style lang="scss" scoped>
.text {
  color: white;
}


</style>