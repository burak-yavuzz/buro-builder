<template>
  <div class="p-4" v-if="node">
    <div class="d-flex align-items-center mb-4 pb-2 border-bottom">
      <i :class="schema.icon" class="fs-4 me-2 text-primary"></i>
      <h6 class="m-0 fw-bold">{{ schema.name }} Ayarları</h6>
    </div>

    <ul class="nav nav-pills nav-fill bg-light p-1 rounded-3 mb-4 fs-7" role="tablist">
      <li class="nav-item"><button class="nav-link py-1 active" data-bs-toggle="tab" data-bs-target="#tab-content" type="button">İçerik</button></li>
      <li class="nav-item"><button class="nav-link py-1" data-bs-toggle="tab" data-bs-target="#tab-style" type="button">Stil</button></li>
    </ul>

    <div class="tab-content">
      <div class="tab-pane fade show active" id="tab-content">
        <div v-for="(field, key) in contentFields" :key="key" class="mb-3">
          
          <template v-if="field.type !== 'repeater'">
            <label class="form-label text-muted text-uppercase fw-bold" style="font-size:0.7rem;">{{ field.label }}</label>
            <input v-if="field.type === 'text'" type="text" class="form-control form-control-sm bg-light border-0" v-model="node.props[key]" />
            <textarea v-if="field.type === 'textarea'" class="form-control form-control-sm bg-light border-0" v-model="node.props[key]" rows="3"></textarea>
            <select v-if="field.type === 'select'" class="form-select form-select-sm bg-light border-0" v-model="node.props[key]">
              <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt || 'Varsayılan' }}</option>
            </select>
            
            <div v-if="field.type === 'iconpicker'" class="d-flex align-items-center bg-light p-2 rounded border">
              <i :class="node.props[key]" class="fs-4 me-3 text-primary text-center" style="width: 40px;"></i>
              <button class="btn btn-sm btn-outline-primary w-100 fw-bold" @click="openIconModal(key)">
                <i class="fa-solid fa-magnifying-glass me-1"></i> İkon Seç
              </button>
            </div>
          </template>

          <div v-if="field.type === 'repeater'" class="repeater-container bg-light p-2 rounded">
            <label class="form-label text-muted text-uppercase fw-bold mb-3" style="font-size:0.7rem;">{{ field.label }}</label>
            <div v-for="(item, index) in node.props[key]" :key="index" class="border rounded p-3 mb-3 bg-white position-relative shadow-sm">
              <button class="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 py-0 px-1" @click="node.props[key].splice(index, 1)"><i class="fa-solid fa-trash"></i></button>
              <h6 class="fs-7 fw-bold border-bottom pb-2 mb-3 text-primary">Slayt {{ index + 1 }}</h6>
              <div v-for="(subField, subKey) in field.subFields" :key="subKey" class="mb-2">
                <label class="form-label text-muted mb-1" style="font-size:0.65rem;">{{ subField.label }}</label>
                <input v-if="subField.type === 'text'" type="text" class="form-control form-control-sm bg-light border-0" v-model="item[subKey]" />
                <textarea v-if="subField.type === 'textarea'" class="form-control form-control-sm bg-light border-0" v-model="item[subKey]" rows="2"></textarea>
                <div v-if="subField.type === 'color'" class="d-flex align-items-center">
                  <input type="color" class="form-control form-control-color form-control-sm border-0 p-0 me-2" v-model="item[subKey]" style="width: 25px; height: 25px; cursor: pointer;" />
                  <input type="text" class="form-control form-control-sm bg-light border-0 text-muted px-1" v-model="item[subKey]" style="font-size: 0.7rem;" />
                </div>
              </div>
            </div>
            <button class="btn btn-sm btn-primary w-100 fw-bold" @click="addNewItem(key, field.subFields)">
              <i class="fa-solid fa-plus me-1"></i> Yeni Ekle
            </button>
          </div>

        </div>
      </div>

      <div class="tab-pane fade" id="tab-style">
        <div v-for="(field, key) in styleFields" :key="key" class="mb-3">
          <label class="form-label text-muted text-uppercase fw-bold" style="font-size:0.7rem;">{{ field.label }}</label>
          <select v-if="field.type === 'select'" class="form-select form-select-sm bg-light border-0" v-model="node.props[key]">
            <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt || 'Varsayılan' }}</option>
          </select>
          <input v-if="field.type === 'text'" type="text" class="form-control form-control-sm bg-light border-0" v-model="node.props[key]" />
          <div v-if="field.type === 'color'" class="d-flex align-items-center">
            <input type="color" class="form-control form-control-color form-control-sm border-0 p-1 me-2" v-model="node.props[key]" style="width: 40px; height: 30px; cursor: pointer;" />
            <input type="text" class="form-control form-control-sm bg-light border-0 text-muted" v-model="node.props[key]" style="font-size: 0.75rem;" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center text-muted mt-5 pt-5">
    <i class="fa-solid fa-sliders fs-1 d-block mb-3"></i>
    <p>Düzenlemek için canvas üzerinden bir bileşen seçin.</p>
  </div>

  <div v-if="isIconModalOpen" class="icon-modal-overlay" @click.self="isIconModalOpen = false">
    <div class="icon-modal-content bg-white p-4 rounded-3 shadow-lg">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h6 class="m-0 fw-bold"><i class="fa-solid fa-icons text-primary me-2"></i>İkon Kütüphanesi</h6>
        <button class="btn-close" @click="isIconModalOpen = false"></button>
      </div>
      <input type="text" class="form-control mb-3" placeholder="İkon ara (ör: star, user)..." v-model="iconSearch">
      <div class="d-flex flex-wrap gap-2 overflow-y-auto" style="max-height: 350px;">
        <button 
          v-for="icon in filteredIcons" :key="icon" 
          class="btn btn-light border d-flex align-items-center justify-content-center icon-btn" 
          @click="selectIcon(icon)" :title="icon"
        >
          <i :class="icon" class="fs-4 text-dark"></i>
        </button>
        <div v-if="filteredIcons.length === 0" class="text-muted w-100 text-center py-4">İkon bulunamadı.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useBuilderStore } from '../store/builderStore';
import { componentSchemas } from '../config/schemas';

const store = useBuilderStore();
const node = computed(() => store.selectedNode);
const schema = computed(() => node.value ? componentSchemas[node.value.type] : null);

// HAZIR İKON LİSTESİ (Elle girmene gerek yok)
const isIconModalOpen = ref(false);
const activeIconKey = ref(null);
const iconSearch = ref('');
const iconList = [
  'fa-solid fa-star', 'fa-solid fa-heart', 'fa-solid fa-user', 'fa-solid fa-envelope', 'fa-solid fa-check',
  'fa-solid fa-xmark', 'fa-solid fa-magnifying-glass', 'fa-solid fa-house', 'fa-solid fa-gear', 'fa-solid fa-bell',
  'fa-solid fa-phone', 'fa-solid fa-location-dot', 'fa-solid fa-camera', 'fa-solid fa-fire', 'fa-solid fa-rocket',
  'fa-solid fa-shield-halved', 'fa-solid fa-laptop-code', 'fa-solid fa-gem', 'fa-solid fa-box', 'fa-solid fa-globe',
  'fa-solid fa-truck', 'fa-solid fa-wallet', 'fa-solid fa-cart-shopping', 'fa-solid fa-credit-card', 'fa-solid fa-gift',
  'fa-solid fa-music', 'fa-solid fa-video', 'fa-solid fa-image', 'fa-solid fa-file', 'fa-solid fa-folder',
  'fa-solid fa-calendar', 'fa-solid fa-clock', 'fa-solid fa-paper-plane', 'fa-solid fa-comment', 'fa-solid fa-thumbs-up',
  'fa-solid fa-link', 'fa-solid fa-pen', 'fa-solid fa-trash', 'fa-solid fa-plus', 'fa-solid fa-arrow-right',
  'fa-solid fa-circle-info', 'fa-solid fa-circle-check', 'fa-solid fa-lock', 'fa-solid fa-eye', 'fa-solid fa-users',
  'fa-brands fa-facebook', 'fa-brands fa-twitter', 'fa-brands fa-instagram', 'fa-brands fa-linkedin', 'fa-brands fa-youtube',
  'fa-brands fa-github', 'fa-brands fa-whatsapp', 'fa-brands fa-apple', 'fa-brands fa-windows', 'fa-brands fa-android'
];

const filteredIcons = computed(() => {
  if (!iconSearch.value) return iconList;
  return iconList.filter(i => i.toLowerCase().includes(iconSearch.value.toLowerCase()));
});

const openIconModal = (key) => { activeIconKey.value = key; iconSearch.value = ''; isIconModalOpen.value = true; };
const selectIcon = (iconClass) => { if (activeIconKey.value && node.value) { node.value.props[activeIconKey.value] = iconClass; } isIconModalOpen.value = false; };

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

<style scoped>
.fs-7 { font-size: 0.85rem; }
.nav-pills .nav-link.active { background-color: #fff; color: #000; box-shadow: 0 2px 4px rgba(0,0,0,0.05); font-weight: bold; }
.nav-pills .nav-link { color: #6c757d; border-radius: 4px; }
.icon-modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.6); z-index: 9999; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(3px); }
.icon-modal-content { width: 500px; max-width: 90vw; }
.icon-btn { width: 50px; height: 50px; transition: 0.2s; }
.icon-btn:hover { background-color: #0d6efd !important; border-color: #0d6efd !important; }
.icon-btn:hover i { color: #fff !important; }
</style>