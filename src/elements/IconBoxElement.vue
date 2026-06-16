<template>
  <div class="p-4 rounded-4 bg-white border" :class="[props.align, props.margin, props.shadow, props.customClass]">
    <div class="d-inline-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-circle mb-3" style="width: 60px; height: 60px;">
      <i :class="['bi', props.icon, 'fs-3']"></i>
    </div>
    <h5 class="fw-bold">{{ props.title }}</h5>
    <p class="text-muted mb-0">{{ props.content }}</p>
  </div>
</template>
<script setup> const { props } = defineProps(['props']); </script>