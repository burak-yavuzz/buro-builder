<template>
  <div class="w-100" :class="[props.margin, props.padding, props.shadow, props.customClass]">
    <div class="d-flex justify-content-between mb-1">
      <span class="fw-bold small">{{ props.title }}</span>
      <span class="fw-bold small text-muted">{{ props.percentage }}%</span>
    </div>
    <div class="progress" style="height: 10px; border-radius: 10px; overflow: hidden;">
      <div 
        class="progress-bar" 
        :class="props.barColor" 
        role="progressbar" 
        :style="{ width: props.percentage + '%' }" 
        :aria-valuenow="props.percentage" 
        aria-valuemin="0" 
        aria-valuemax="100"
      ></div>
    </div>
  </div>
</template>

<script setup>
const { props } = defineProps(['props']);
</script>