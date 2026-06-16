<template>
  <div class="h-100 d-flex flex-column bg-white">
    <div class="p-3 border-bottom bg-light">
      <h6 class="text-uppercase text-muted fs-xs fw-bold m-0" style="letter-spacing: 1px;">Bileşen Kütüphanesi</h6>
    </div>
    
    <div class="flex-grow-1 overflow-y-auto">
      <div class="accordion accordion-flush" id="sidebarAccordion">
        
        <div class="accordion-item" v-for="(components, category, index) in groupedComponents" :key="category">
          <h2 class="accordion-header">
            <button class="accordion-button bg-transparent fw-bold" :class="{ 'collapsed': index !== 0 }" type="button" data-bs-toggle="collapse" :data-bs-target="'#cat-' + index">
              {{ category }}
            </button>
          </h2>
          <div :id="'cat-' + index" class="accordion-collapse collapse" :class="{ 'show': index === 0 }" data-bs-parent="#sidebarAccordion">
            <div class="accordion-body p-2 bg-light">
              
              <draggable 
                class="row g-2 m-0"
                :list="components"
                :group="{ name: 'canvas', pull: 'clone', put: false }"
                :clone="cloneElement"
                item-key="type"
              >
                <template #item="{ element }">
                  <div class="col-6">
                    <div class="drag-item p-3 border rounded bg-white text-center hover-shadow cursor-grab h-100 d-flex flex-column align-items-center justify-content-center">
                      <i :class="[element.icon, 'fs-4 mb-2 text-primary']"></i> 
                      <span style="font-size: 0.75rem; font-weight: 500;">{{ element.name }}</span>
                    </div>
                  </div>
                </template>
              </draggable>

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import draggable from 'vuedraggable';
import { componentSchemas } from '../config/schemas';
import { useBuilderStore } from '../store/builderStore';

const store = useBuilderStore();

const groupedComponents = computed(() => {
  const groups = {};
  Object.keys(componentSchemas).forEach(key => {
    const schema = componentSchemas[key];
    if (!groups[schema.category]) groups[schema.category] = [];
    groups[schema.category].push({ type: key, ...schema });
  });
  return groups;
});

const cloneElement = (item) => store.createNode(item.type);
</script>

<style scoped>
.fs-xs { font-size: 0.75rem; }
.cursor-grab { cursor: grab; }
.cursor-grab:active { cursor: grabbing; border-color: #0d6efd !important; }
.hover-shadow { transition: all 0.2s; border: 1px solid #dee2e6; }
.hover-shadow:hover { border-color: #0d6efd; box-shadow: 0 4px 6px rgba(13,110,253,0.1); transform: translateY(-2px); color: #0d6efd; }
.accordion-button:not(.collapsed) { color: #0d6efd; box-shadow: none; background-color: rgba(13, 110, 253, 0.05) !important; }
.accordion-button:focus { box-shadow: none; }
</style>