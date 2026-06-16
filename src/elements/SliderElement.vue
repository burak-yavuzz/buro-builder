<template>
  <div :id="sliderId" class="carousel slide" :class="[props.margin, props.shadow, props.customClass]" data-bs-ride="carousel">
    
    <div class="carousel-inner" :style="{ height: props.height, borderRadius: '8px', overflow: 'hidden' }">
      
      <div 
        v-for="(slide, index) in props.slides" 
        :key="index" 
        class="carousel-item h-100" 
        :class="{ active: index === 0 }"
      >
        <div class="position-absolute top-0 start-0 w-100 h-100" :style="{ backgroundColor: `rgba(0,0,0,${props.overlay})`, zIndex: 1 }"></div>
        <img :src="slide.img" class="d-block w-100 h-100" style="object-fit: cover;">
        
        <div class="carousel-caption d-flex flex-column justify-content-center h-100" style="z-index: 2;">
          
          <h1 class="display-4 fw-bold animate__animated animate__fadeInDown">
            <span :style="{ color: slide.titleColor }" class="me-2">{{ slide.title }}</span>
            <span :style="{ color: slide.highlightColor }">{{ slide.highlight }}</span>
          </h1>
          
          <p class="lead animate__animated animate__fadeInUp animate__delay-1s" :style="{ color: slide.descColor }">
            {{ slide.desc }}
          </p>
          
          <div class="mt-4 animate__animated animate__zoomIn animate__delay-2s" v-if="slide.btnText">
            <a :href="slide.btnLink" class="btn btn-primary btn-lg rounded-pill px-5" @click.prevent="">{{ slide.btnText }}</a>
          </div>

        </div>
      </div>

    </div>

    <button class="carousel-control-prev" type="button" :data-bs-target="'#' + sliderId" data-bs-slide="prev" style="z-index: 3;">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    </button>
    <button class="carousel-control-next" type="button" :data-bs-target="'#' + sliderId" data-bs-slide="next" style="z-index: 3;">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as bootstrap from 'bootstrap'; // Bootstrap JS API'sini doğrudan içeri aktarıyoruz

const { props } = defineProps(['props']);

// HATA ÇÖZÜMÜ 1: Kimliği bir kez oluştur ve sabit tut (computed yerine ref)
const sliderId = ref('carousel_' + Math.random().toString(36).substr(2, 9));

// HATA ÇÖZÜMÜ 2: Bileşen ekrana çizildiğinde Bootstrap motorunu manuel tetikle
onMounted(() => {
  const carouselElement = document.getElementById(sliderId.value);
  if (carouselElement) {
    // Sürükle bırak sonrası slider'ı zorla başlatıyoruz
    new bootstrap.Carousel(carouselElement, {
      interval: 5000, // 5 saniyede bir otomatik döner
      ride: 'carousel'
    });
  }
});
</script>