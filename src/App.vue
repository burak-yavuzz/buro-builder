<template>
  <div class="vw-100 vh-100 d-flex flex-column overflow-hidden bg-light" :class="{ 'preview-mode': isPreviewMode }">
    
    <header class="builder-header d-flex justify-content-between align-items-center px-3 px-md-4 bg-white border-bottom flex-shrink-0" style="height: 60px; z-index: 1050; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);">
      <div class="d-flex align-items-center">
        <button v-if="!isPreviewMode" class="btn btn-light d-lg-none me-3 border shadow-sm" @click="isSidebarOpen = true">
          <i class="fa-solid fa-bars fs-5 text-dark"></i>
        </button>
        
        <h5 class="m-0 fw-bold d-flex align-items-center">
          <img src="/logo.svg" alt="Logo" style="width: 20px; height: 20px;" class="me-2" />
          <a href="/" class="text-decoration-none text-dark d-none d-sm-inline">Buro<span class="text-primary">Builder</span></a>
        </h5>
      </div>

      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-outline-secondary btn-sm rounded-pill px-3 fw-bold d-flex align-items-center" @click="isPreviewMode = !isPreviewMode">
          <i class="fa-solid me-2" :class="isPreviewMode ? 'fa-eye-slash' : 'fa-eye'"></i> 
          <span class="d-none d-md-inline">{{ isPreviewMode ? 'Editöre Dön' : 'Sitede Görüntüle' }}</span>
        </button>
        <button class="btn btn-dark btn-sm rounded-pill px-3 px-md-4 fw-bold d-flex align-items-center" @click="exportData">
          <i class="fa-solid fa-code me-md-2"></i> 
          <span class="d-none d-md-inline"><i class="fa fa-save me-2"></i>Kaydet</span>
        </button>
      </div>
    </header>

    <main class="workspace flex-grow-1 d-flex position-relative overflow-hidden">
      
      <div v-if="isSidebarOpen && !isPreviewMode" class="sidebar-overlay d-lg-none" @click="isSidebarOpen = false"></div>

      <aside 
        v-show="!isPreviewMode" 
        class="builder-sidebar d-flex flex-column bg-white shadow-sm border-end flex-shrink-0" 
        :class="{ 'sidebar-mobile-open': isSidebarOpen }"
      >
        <div class="p-3 border-bottom d-flex justify-content-between align-items-center bg-light flex-shrink-0">
          <h6 class="m-0 fw-bold text-dark">
            <i class="fa-solid me-2" :class="store.selectedNode ? 'fa-sliders' : 'fa-grip'"></i>
            {{ store.selectedNode ? 'Bileşeni Düzenle' : 'Bileşenler' }}
          </h6>
          
          <div class="d-flex gap-2">
            <button v-if="store.selectedNode" class="btn btn-sm btn-primary rounded-circle d-flex align-items-center justify-content-center" style="width:30px; height:30px; padding:0;" @click="store.selectNode(null)" title="Geri Dön">
              <i class="fa-solid fa-arrow-left"></i>
            </button>
            <button class="btn btn-sm btn-light border rounded-circle d-lg-none d-flex align-items-center justify-content-center" style="width:30px; height:30px; padding:0;" @click="isSidebarOpen = false">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        <div class="sidebar-content-wrapper flex-grow-1 overflow-hidden d-flex flex-column">
          
          <Sidebar v-if="!store.selectedNode" class="h-100 overflow-y-auto" />
          
          <div v-else class="h-100 d-flex flex-column overflow-hidden">
            <ul class="nav nav-tabs px-3 pt-3 bg-light border-bottom-0 flex-shrink-0" role="tablist">
              <li class="nav-item"><button class="nav-link active fw-bold text-dark border-bottom-0" data-bs-toggle="tab" data-bs-target="#tab-editor" style="font-size:0.85rem;">Ayarlar</button></li>
              <li class="nav-item"><button class="nav-link fw-bold text-dark border-bottom-0" data-bs-toggle="tab" data-bs-target="#tab-navigator" style="font-size:0.85rem;">Katmanlar</button></li>
            </ul>
            <div class="tab-content flex-grow-1 overflow-hidden d-flex flex-column">
              <div class="tab-pane fade show active h-100 overflow-y-auto" id="tab-editor"><PropertyEditor /></div>
              <div class="tab-pane fade h-100 p-3 overflow-y-auto" id="tab-navigator"><NavigatorTree :nodes="store.pageData" /></div>
            </div>
          </div>

        </div>
      </aside>

      <section class="canvas-wrapper flex-grow-1 overflow-y-auto d-flex justify-content-center m-0" @click.self="store.selectNode(null)">
        <div class="canvas-area bg-white" @click.self="store.selectNode(null)">
          <CanvasArea />
        </div>
      </section>

    </main>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import Sidebar from './components/Sidebar.vue';
import CanvasArea from './components/CanvasArea.vue';
import PropertyEditor from './components/PropertyEditor.vue';
import NavigatorTree from './components/NavigatorTree.vue';
import { useBuilderStore } from './store/builderStore';

const store = useBuilderStore();
const isPreviewMode = ref(false);
const isSidebarOpen = ref(false);

watch(() => store.selectedNode, (newNode) => {
  if (newNode && window.innerWidth < 992) {
    isSidebarOpen.value = true;
  }
});

const exportData = () => { 
  console.log(JSON.stringify(store.pageData, null, 2)); 
  alert("JSON Console'a yazdırıldı."); 
};
</script>