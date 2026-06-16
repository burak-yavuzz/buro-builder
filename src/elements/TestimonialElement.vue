<template>
  <div class="testimonial-box border p-4 position-relative" :class="[props.margin, props.padding, props.shadow, props.customClass]">
    <i class="bi bi-quote position-absolute text-light" style="font-size: 4rem; top: 10px; right: 20px; z-index: 0; opacity: 0.3;"></i>
    <p class="fst-italic text-muted position-relative" style="z-index: 1;">"{{ props.quote }}"</p>
    <div class="d-flex align-items-center mt-4 position-relative" style="z-index: 1;">
      <img :src="props.avatar" class="rounded-circle me-3" style="width: 50px; height: 50px; object-fit: cover; border: 2px solid #0d6efd;">
      <div>
        <h6 class="m-0 fw-bold">{{ props.name }}</h6>
        <small class="text-muted">{{ props.company }}</small>
      </div>
    </div>
  </div>
</template>

<script setup>
const { props } = defineProps(['props']);
</script>