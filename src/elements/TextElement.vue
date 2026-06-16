<template>
  <div 
    :class="[
      props.lead, 
      props.color, 
      props.align, 
      props.margin, 
      props.padding, 
      props.shadow, 
      props.customClass
    ]"
    v-html="props.content"
  ></div>
</template>

<script setup>
const { props } = defineProps(['props']);
</script>