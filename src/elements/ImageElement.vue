<template>
  <div 
    class="image-wrapper position-relative"
    :class="[props.margin, props.padding, props.customClass]"
    @dblclick="openEditor"
  >
    <img 
      :src="internalSrc" 
      :alt="internalAlt" 
      class="img-fluid" 
      :style="{ borderRadius: props.radius || '8px', width: '100%', objectFit: 'cover' }"
    />

    <div v-if="isEditing" class="editor-overlay p-3 bg-white border shadow rounded position-absolute top-0 start-0 w-100" style="z-index: 10;">
      <div class="mb-2">
        <label class="small fw-bold">Görsel URL:</label>
        <input v-model="internalSrc" type="text" class="form-control form-control-sm" placeholder="https://..." />
      </div>
      <div class="mb-2">
        <label class="small fw-bold">Alt Metin:</label>
        <input v-model="internalAlt" type="text" class="form-control form-control-sm" placeholder="Açıklama..." />
      </div>
      <button class="btn btn-sm btn-primary w-100" @click="isEditing = false">Kaydet</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const { props } = defineProps(['props']);

// İçerideki reaktif değerler
const isEditing = ref(false);
const internalSrc = ref(props.src || 'https://placehold.co/800x400');
const internalAlt = ref(props.alt || 'Görsel');

// Çift tıklama ile düzenlemeyi aç
const openEditor = () => {
  isEditing.value = true;
};

// Değişiklikleri izle ve props'a aktar (Senkronizasyon)
watch(internalSrc, (val) => { props.src = val; });
watch(internalAlt, (val) => { props.alt = val; });
</script>

<style scoped>
.image-wrapper { cursor: pointer; min-height: 50px; }
.image-wrapper:hover { outline: 2px dashed #0d6efd; }
.editor-overlay { max-width: 300px; }
</style>