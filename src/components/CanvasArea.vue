<template>
  <div class="canvas-area d-flex flex-column position-relative" @click.self="store.selectNode(null)">
    
    <draggable 
      v-model="store.pageData" 
      group="canvas" 
      item-key="id"
      class="flex-grow-1 w-100 canvas-root-dropzone"
      ghost-class="ghost-drop"
      animation="200"
    >
      <template #item="{ element }">
        <CanvasNode :node="element" />
      </template>
    </draggable>

    <div v-if="store.pageData.length === 0" class="empty-state text-center text-muted pointer-events-none position-absolute top-50 start-50 translate-middle">
      <i class="bi bi-plus-square-dotted fs-1 d-block mb-3 text-primary opacity-50"></i>
      <h5>Yeni Bölüm Ekle</h5>
      <p class="fs-6">Sol menüden buraya bir Satır (Row) sürükleyin.</p>
    </div>

  </div>
</template>

<script setup>
import draggable from 'vuedraggable';
import { useBuilderStore } from '../store/builderStore';
import CanvasNode from './CanvasNode.vue';
const store = useBuilderStore();
</script>

<style scoped>
.canvas-root-dropzone { 
  min-height: calc(100vh - 100px); /* Bırakma alanını tam ekran yapar */
  padding-bottom: 100px; /* En alta eleman eklerken yer açar */
}
.ghost-drop { opacity: 0.5; background: rgba(13,110,253,0.1); border: 2px dashed #0d6efd; border-radius: 8px; }
.empty-state { width: 100%; pointer-events: none; }
</style>