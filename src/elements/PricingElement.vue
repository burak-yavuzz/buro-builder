<template>
  <div class="card text-center position-relative h-100" :class="[props.margin, props.padding, props.shadow, props.customClass]" :style="{ backgroundColor: props.bgColor !== 'transparent' ? props.bgColor : '#fff', borderRadius: props.borderRadius || '8px' }">
    <div v-if="props.isPopular === 'Göster'" class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-primary px-3 py-2" style="font-size: 0.8rem;">
      En Çok Tercih Edilen
    </div>
    
    <div class="card-body p-4">
      <h5 class="fw-bold text-uppercase text-muted mb-3">{{ props.planName }}</h5>
      <h1 class="display-5 fw-bold mb-0 text-dark">{{ props.price }}</h1>
      <span class="text-muted">{{ props.period }}</span>
      
      <ul class="list-unstyled mt-4 mb-4 text-start">
        <li v-for="(feature, index) in featuresList" :key="index" class="mb-2">
          <i class="fa-solid fa-check-circle text-success me-2"></i> {{ feature }}
        </li>
      </ul>
      
      <a :href="props.btnLink" class="btn btn-outline-primary btn-lg w-100 fw-bold rounded-pill">{{ props.btnText }}</a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const { props } = defineProps(['props']);

// Textarea'dan gelen satırları listeye çevirir
const featuresList = computed(() => {
  return props.features ? props.features.split('\n').filter(f => f.trim() !== '') : [];
});
</script>