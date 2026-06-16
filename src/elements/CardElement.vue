<template>
  <div class="card h-100 overflow-hidden" :class="[props.bgColor, props.shadow, props.margin, props.customClass]">
    <img :src="props.image" class="card-img-top" alt="Card Image" style="height: 200px; object-fit: cover;">
    <div class="card-body d-flex flex-column" :class="props.padding">
      <h5 class="card-title fw-bold">{{ props.title }}</h5>
      <p class="card-text flex-grow-1 text-muted">{{ props.content }}</p>
      <a :href="props.btnLink" class="btn btn-outline-primary mt-3 w-100">{{ props.btnText }}</a>
    </div>
  </div>
</template>
<script setup> const { props } = defineProps(['props']); </script>