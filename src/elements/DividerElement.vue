<template>
  <hr :class="[props.color, props.margin, props.customClass]" :style="{ borderWidth: props.thickness, opacity: 1 }" />
</template>
<script setup> const { props } = defineProps(['props']); </script>