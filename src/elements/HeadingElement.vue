<template>
  <component 
    :is="props.tag" 
    :class="[props.color, props.align, props.margin, props.padding, props.customClass]"
  >
    {{ props.text }}
  </component>
</template>

<script setup>
const { props } = defineProps(['props']);
</script>