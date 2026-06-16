<template>
  <div class="accordion" :id="groupId" :class="[props.margin, props.padding, props.shadow, props.customClass]">
    <div class="accordion-item" v-for="(item, index) in props.items" :key="index" :style="{ backgroundColor: props.bgColor !== 'transparent' ? props.bgColor : '#fff' }">
      <h2 class="accordion-header" :id="'heading-' + groupId + '-' + index">
        <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse-' + groupId + '-' + index" aria-expanded="false">
          {{ item.title }}
        </button>
      </h2>
      <div :id="'collapse-' + groupId + '-' + index" class="accordion-collapse collapse" :data-bs-parent="'#' + groupId">
        <div class="accordion-body text-muted">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const { props } = defineProps(['props']);

// Sayfaya 2 tane akordeon eklenirse çakışmamaları için benzersiz ID oluşturur
const groupId = computed(() => 'accordion_' + Math.random().toString(36).substr(2, 9));
</script>