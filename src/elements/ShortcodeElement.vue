<template>
  <div :class="[props.margin, props.padding, props.customClass]">
    <div class="p-4 border border-2 border-primary border-dashed rounded bg-light text-center" style="border-style: dashed !important;">
      <i class="fa-solid fa-cogs fs-2 text-primary d-block mb-2"></i>
      <h6 class="fw-bold text-dark m-0">{{ props.description }}</h6>
      <small class="text-muted font-monospace bg-white px-2 py-1 rounded border mt-2 d-inline-block">{{ props.code }}</small>
      <p class="text-muted mt-2 mb-0" style="font-size: 0.75rem;">Bu alan sitede görüntülendiğinde sistem tarafından otomatik doldurulacaktır.</p>
    </div>
  </div>
</template>

<script setup>
const { props } = defineProps(['props']);
</script>