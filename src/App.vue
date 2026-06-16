<template>
  <div class="vw-100 vh-100 d-flex flex-column overflow-hidden bg-light" :class="{ 'preview-mode': isPreviewMode }">
    <header class="builder-header d-flex justify-content-between align-items-center px-4 bg-white border-bottom" style="height: 60px; z-index: 1000;">
      <h5 class="m-0 fw-bold"><img src="/logo.svg" alt="Logo" style="width: 20px; height: 20px;" class="me-2" /><a href="/" class="text-decoration-none text-dark">Buro<span class="text-primary">Builder</span></a></h5>
      <div>
        <button class="btn btn-outline-secondary btn-sm rounded-pill px-3 me-2 fw-bold" @click="isPreviewMode = !isPreviewMode">
          <i class="fa-solid" :class="isPreviewMode ? 'fa-eye-slash' : 'fa-eye'"></i> 
          {{ isPreviewMode ? 'Editöre Dön' : 'Sitede Görüntüle' }}
        </button>
        <button class="btn btn-dark btn-sm rounded-pill px-4 fw-bold" @click="exportData">
          <i class="fa-solid fa-code me-2"></i> JSON Kaydet
        </button>
      </div>
    </header>

    <main class="d-flex flex-grow-1 overflow-hidden position-relative">
      <aside v-show="!isPreviewMode" class="d-flex flex-column bg-white shadow-sm border-end" style="width: 340px; z-index: 100; transition: 0.3s;">
        <div class="p-3 border-bottom d-flex justify-content-between align-items-center bg-light">
          <h6 class="m-0 fw-bold text-dark">
            <i class="fa-solid me-2" :class="store.selectedNode ? 'fa-sliders' : 'fa-grip'"></i>
            {{ store.selectedNode ? 'Bileşeni Düzenle' : 'Bileşenler' }}
          </h6>
          <button v-if="store.selectedNode" class="btn btn-sm btn-primary rounded-circle d-flex align-items-center justify-content-center" style="width:30px; height:30px; padding:0;" @click="store.selectNode(null)" title="Geri Dön">
            <i class="fa-solid fa-arrow-left"></i>
          </button>
        </div>

        <div class="flex-grow-1 overflow-y-auto">
          <Sidebar v-if="!store.selectedNode" />
          <div v-else class="h-100 d-flex flex-column">
            <ul class="nav nav-tabs px-3 pt-3 bg-light border-bottom-0" role="tablist">
              <li class="nav-item"><button class="nav-link active fw-bold text-dark border-bottom-0" data-bs-toggle="tab" data-bs-target="#tab-editor" style="font-size:0.85rem;">Ayarlar</button></li>
              <li class="nav-item"><button class="nav-link fw-bold text-dark border-bottom-0" data-bs-toggle="tab" data-bs-target="#tab-navigator" style="font-size:0.85rem;">Katmanlar</button></li>
            </ul>
            <div class="tab-content flex-grow-1 overflow-y-auto">
              <div class="tab-pane fade show active h-100" id="tab-editor"><PropertyEditor /></div>
              <div class="tab-pane fade h-100 p-3" id="tab-navigator"><NavigatorTree :nodes="store.pageData" /></div>
            </div>
          </div>
        </div>
      </aside>

      <section class="flex-grow-1 overflow-y-auto d-flex justify-content-center p-0 m-0" @click.self="store.selectNode(null)" style="background-color: #f1f3f5;">
        <div class="w-100 bg-white shadow-sm" style="min-height: 100vh;" @click.self="store.selectNode(null)">
          <CanvasArea />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Sidebar from './components/Sidebar.vue';
import CanvasArea from './components/CanvasArea.vue';
import PropertyEditor from './components/PropertyEditor.vue';
import NavigatorTree from './components/NavigatorTree.vue';
import { useBuilderStore } from './store/builderStore';

const store = useBuilderStore();
const isPreviewMode = ref(false);

const exportData = () => { 
  console.log(JSON.stringify(store.pageData, null, 2)); 
  alert("JSON Console'a yazdırıldı."); 
};
</script>

<style>
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-thumb { background: #ced4da; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #adb5bd; }
.preview-mode .node-wrapper { border-color: transparent !important; cursor: default !important; }
.preview-mode .node-wrapper:hover { border-color: transparent !important; }
.preview-mode .selected-node { background-color: transparent !important; }
.preview-mode .delete-btn { display: none !important; }
.preview-mode .nested-dropzone { border: none !important; background-color: transparent !important; min-height: 10px !important; padding: 0 !important; }
</style>