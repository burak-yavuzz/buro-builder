<template>
  <div class="row-container w-100" :class="[props.align, props.justify, props.margin, props.padding, props.customClass]">
    <slot></slot>
  </div>
</template>

<script setup>
const { props } = defineProps(['props']);
</script>