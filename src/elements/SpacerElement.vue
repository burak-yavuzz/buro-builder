<template>
  <div 
    class="w-100" 
    :class="[props.margin, props.padding, props.customClass]"
    :style="{ height: props.height }"
  ></div>
</template>

<script setup>
const { props } = defineProps(['props']);
</script>