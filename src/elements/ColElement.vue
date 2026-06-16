<template>
  <div class="col-inner h-100 w-100" :class="[props.margin, props.padding, props.customClass]">
    <slot></slot>
  </div>
</template>

<script setup>
const { props } = defineProps(['props']);
</script>