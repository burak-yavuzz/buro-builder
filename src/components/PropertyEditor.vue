<template>
  <div class="p-4" v-if="node">
    <div class="d-flex align-items-center mb-4 pb-3 border-bottom">
      <div class="bg-primary bg-opacity-10 text-primary rounded p-2 me-3 d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
        <i :class="schema.icon" class="fs-5"></i>
      </div>
      <div>
        <h6 class="m-0 fw-bold text-dark">{{ schema.name }} Ayarları</h6>
        <small class="text-muted" style="font-size: 0.75rem;">Bileşen özelliklerini düzenleyin</small>
      </div>
    </div>

    <ul class="nav nav-pills nav-fill bg-light p-1 rounded-3 mb-4 fs-7 border" role="tablist">
      <li class="nav-item">
        <button class="nav-link py-1 active fw-bold" data-bs-toggle="tab" data-bs-target="#tab-content" type="button">
          <i class="fa-solid fa-pen-to-square me-1"></i> İçerik
        </button>
      </li>
      <li class="nav-item">
        <button class="nav-link py-1 fw-bold" data-bs-toggle="tab" data-bs-target="#tab-style" type="button">
          <i class="fa-solid fa-palette me-1"></i> Stil
        </button>
      </li>
    </ul>

    <div class="tab-content">
      <div class="tab-pane fade show active" id="tab-content">
        <div v-for="(field, key) in contentFields" :key="key" class="mb-4">
          
          <template v-if="field.type !== 'repeater'">
            <label class="form-label text-muted text-uppercase fw-bold mb-2" style="font-size:0.7rem; letter-spacing: 0.5px;">{{ field.label }}</label>
            
            <input v-if="field.type === 'text'" type="text" class="form-control form-control-sm bg-light border" v-model="node.props[key]" />
            <textarea v-if="field.type === 'textarea'" class="form-control form-control-sm bg-light border" v-model="node.props[key]" rows="3"></textarea>
            <select v-if="field.type === 'select'" class="form-select form-select-sm bg-light border" v-model="node.props[key]">
              <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt || 'Varsayılan' }}</option>
            </select>
            
            <div v-if="field.type === 'iconpicker'" class="d-flex align-items-center bg-white p-2 rounded border shadow-sm transition-all">
              <div class="bg-light border rounded d-flex align-items-center justify-content-center me-2" style="width: 35px; height: 35px;">
                <i :class="node.props[key]" class="fs-5 text-primary"></i>
              </div>
              <button class="btn btn-sm btn-light border flex-grow-1 text-start d-flex justify-content-between align-items-center" @click="openIconModal(key)">
                <span class="text-truncate text-muted" style="max-width: 120px;">{{ node.props[key] || 'İkon Seç' }}</span>
                <i class="fa-solid fa-magnifying-glass text-primary"></i>
              </button>
            </div>
          </template>

          <div v-if="field.type === 'repeater'" class="repeater-container bg-light p-3 rounded-3 border">
            <label class="form-label text-dark text-uppercase fw-bold mb-3 d-block border-bottom pb-2" style="font-size:0.75rem;">
              <i class="fa-solid fa-layer-group me-1 text-primary"></i> {{ field.label }}
            </label>
            
            <div v-for="(item, index) in node.props[key]" :key="index" class="border rounded p-3 mb-3 bg-white position-relative shadow-sm hover-elevate transition-all">
              <button class="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 py-0 px-2 rounded-pill shadow-sm" @click="node.props[key].splice(index, 1)" title="Öğeyi Sil">
                <i class="fa-solid fa-trash fs-7"></i>
              </button>
              
              <h6 class="fs-7 fw-bold text-primary mb-3">Öğe {{ index + 1 }}</h6>
              
              <div v-for="(subField, subKey) in field.subFields" :key="subKey" class="mb-3">
                <label class="form-label text-muted mb-1 fw-semibold" style="font-size:0.65rem;">{{ subField.label }}</label>
                <input v-if="subField.type === 'text'" type="text" class="form-control form-control-sm bg-light border" v-model="item[subKey]" />
                <textarea v-if="subField.type === 'textarea'" class="form-control form-control-sm bg-light border" v-model="item[subKey]" rows="2"></textarea>
                
                <div v-if="subField.type === 'color'" class="d-flex align-items-center bg-light border rounded p-1">
                  <input type="color" class="form-control form-control-color border-0 p-0 m-0 bg-transparent shadow-none" v-model="item[subKey]" style="width: 30px; height: 30px; cursor: pointer;" />
                  <input type="text" class="form-control form-control-sm bg-transparent border-0 text-dark fw-semibold ms-2" v-model="item[subKey]" style="font-size: 0.75rem;" />
                </div>
              </div>
            </div>
            
            <button class="btn btn-sm btn-primary w-100 fw-bold shadow-sm" @click="addNewItem(key, field.subFields)">
              <i class="fa-solid fa-plus me-1"></i> Yeni Ekle
            </button>
          </div>

        </div>
      </div>

      <div class="tab-pane fade" id="tab-style">
        <div v-for="(field, key) in styleFields" :key="key" class="mb-4">
          <label class="form-label text-muted text-uppercase fw-bold mb-2" style="font-size:0.7rem; letter-spacing: 0.5px;">{{ field.label }}</label>
          <select v-if="field.type === 'select'" class="form-select form-select-sm bg-light border" v-model="node.props[key]">
            <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt || 'Varsayılan' }}</option>
          </select>
          <input v-if="field.type === 'text'" type="text" class="form-control form-control-sm bg-light border" v-model="node.props[key]" />
          
          <div v-if="field.type === 'color'" class="d-flex align-items-center bg-light border rounded p-1">
            <input type="color" class="form-control form-control-color border-0 p-0 m-0 bg-transparent shadow-none" v-model="node.props[key]" style="width: 35px; height: 35px; cursor: pointer;" />
            <input type="text" class="form-control form-control-sm bg-transparent border-0 text-dark fw-semibold ms-2" v-model="node.props[key]" style="font-size: 0.8rem;" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center text-muted mt-5 pt-5 px-4">
    <div class="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 80px; height: 80px;">
      <i class="fa-solid fa-wand-magic-sparkles fs-1 text-primary opacity-50"></i>
    </div>
    <h6 class="fw-bold text-dark">Bileşen Seçilmedi</h6>
    <p class="fs-7">Özelliklerini düzenlemek için canvas üzerinden bir elemana tıklayın.</p>
  </div>

  <Teleport to="body">
    <div v-if="isIconModalOpen" class="icon-modal-overlay" @click.self="isIconModalOpen = false">
      <div class="icon-modal-content bg-white p-0 rounded-4 shadow-lg overflow-hidden d-flex flex-column">
        
        <div class="bg-light p-4 border-bottom d-flex justify-content-between align-items-center">
          <h5 class="m-0 fw-bold text-dark d-flex align-items-center">
            <i class="fa-solid fa-shapes text-primary fs-4 me-2"></i> İkon Kütüphanesi
          </h5>
          <button class="btn btn-sm btn-white border rounded-circle shadow-sm d-flex align-items-center justify-content-center" style="width:32px; height:32px;" @click="isIconModalOpen = false">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div class="p-4 pb-2">
          <div class="position-relative">
            <i class="fa-solid fa-magnifying-glass position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
            <input type="text" class="form-control form-control-lg bg-light border ps-5 fs-6 shadow-none" placeholder="İkon ara (ör: user, chart)..." v-model="iconSearch">
          </div>
        </div>
        
        <div class="p-4 pt-2 flex-grow-1 overflow-y-auto custom-scrollbar" style="max-height: 450px;">
          <div v-if="isLoadingIcons" class="text-center py-5 text-muted">
            <div class="spinner-border text-primary mb-3" role="status"></div>
            <h6>İkonlar Yükleniyor...</h6>
            <small>Bu işlem sadece ilk açılışta yapılır.</small>
          </div>
          
          <div v-else class="d-flex flex-wrap gap-2">
            <button 
              v-for="icon in filteredIcons.slice(0, 150)" :key="icon" 
              class="btn btn-light border d-flex align-items-center justify-content-center icon-btn position-relative" 
              @click="selectIcon(icon)" :title="icon"
            >
              <i :class="icon" class="fs-4 text-secondary transition-all"></i>
            </button>
            <div v-if="filteredIcons.length === 0" class="text-muted w-100 text-center py-5">
              <i class="fa-solid fa-ghost fs-1 mb-3 text-light"></i>
              <p class="m-0 fw-bold">Aradığınız ikon bulunamadı.</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useBuilderStore } from '../store/builderStore';
import { componentSchemas } from '../config/schemas';

const store = useBuilderStore();
const node = computed(() => store.selectedNode);
const schema = computed(() => node.value ? componentSchemas[node.value.type] : null);

// MODAL VE İKON API DEĞİŞKENLERİ
const isIconModalOpen = ref(false);
const activeIconKey = ref(null);
const iconSearch = ref('');
const iconList = ref([]); // Liste kodda YOK, API'den dolacak!
const isLoadingIcons = ref(false);

// İKONLARI API'DEN ÇEKEN FONKSİYON (Sadece 1 Kere Çalışır)
const fetchIcons = async () => {
  if (iconList.value.length > 0) return; // Zaten yüklüyse tekrar çekme
  
  isLoadingIcons.value = true;
  try {
    const response = await fetch('https://unpkg.com/@fortawesome/fontawesome-free@6.4.0/metadata/icons.json');
    const data = await response.json();
    
    const arr = [];
    for (const [name, meta] of Object.entries(data)) {
      if (meta.styles.includes('solid')) arr.push(`fa-solid fa-${name}`);
      if (meta.styles.includes('brands')) arr.push(`fa-brands fa-${name}`);
    }
    iconList.value = arr;
  } catch (error) {
    console.error("İkonlar API'den çekilemedi", error);
  } finally {
    isLoadingIcons.value = false;
  }
};

const filteredIcons = computed(() => {
  if (!iconSearch.value) return iconList.value;
  return iconList.value.filter(i => i.toLowerCase().includes(iconSearch.value.toLowerCase()));
});

// Modalı açtığımızda yüklemeyi tetikliyoruz
const openIconModal = (key) => { 
  activeIconKey.value = key; 
  iconSearch.value = ''; 
  isIconModalOpen.value = true; 
  fetchIcons(); // API İsteğini başlat
};

const selectIcon = (iconClass) => { 
  if (activeIconKey.value && node.value) { 
    node.value.props[activeIconKey.value] = iconClass; 
  } 
  isIconModalOpen.value = false; 
};

// DİĞER FONKSİYONLAR
const addNewItem = (key, subFields) => {
  if (!node.value.props[key]) node.value.props[key] = [];
  const newItem = {};
  Object.keys(subFields).forEach(k => { newItem[k] = subFields[k].default || ''; });
  node.value.props[key].push(newItem);
};

const contentFields = computed(() => {
  if (!schema.value) return {};
  const fields = {};
  Object.keys(schema.value.props).forEach(key => { if (schema.value.props[key].group === 'content') fields[key] = schema.value.props[key]; });
  return fields;
});

const styleFields = computed(() => {
  if (!schema.value) return {};
  const fields = {};
  Object.keys(schema.value.props).forEach(key => { if (schema.value.props[key].group !== 'content') fields[key] = schema.value.props[key]; });
  return fields;
});
</script>