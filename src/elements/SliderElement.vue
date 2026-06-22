<template>
  <template v-if="props.slides && props.slides.length">
    <div :id="sliderId" class="carousel slide" :class="[props.margin, props.padding, props.customClass, props.fade]" :data-bs-ride="props.autoplay === 'true' ? 'carousel' : 'false'">

      <div class="carousel-indicators" v-if="props.dots === 'true'" style="z-index: 10;">
        <button
          v-for="(slide, index) in props.slides"
          :key="index"
          type="button"
          :data-bs-target="'#' + sliderId"
          :data-bs-slide-to="index"
          :class="{ active: index === 0 }"
          :aria-current="index === 0 ? 'true' : null"
          :aria-label="'Slayt ' + (index + 1)"></button>
      </div>

      <div class="carousel-inner" :style="{ height: props.height || '600px', borderRadius: props.borderRadius || '0px' }">
        <div v-for="(slide, index) in props.slides" :key="index" class="carousel-item h-100 w-100" :class="{ active: index === 0 }">

          <div class="position-absolute w-100 h-100" :style="{ backgroundColor: slide.overlayColor || '#000000', opacity: slide.overlay || '0.5', zIndex: 1 }"></div>
          <img :src="slide.bgImage" alt="" loading="lazy" class="position-absolute w-100 h-100" style="object-fit: cover; z-index: 0;">

          <div class="carousel-caption d-flex w-100 h-100 position-absolute p-0"
               :class="[`align-items-${slide.verticalAlign || 'center'}`, `justify-content-${slide.horizontalAlign || 'center'}`]"
               style="z-index: 2; top: 0; left: 0; pointer-events: none;">

            <div class="dropzone-area"
                 :class="[props.contentPadding || 'p-4', `text-${slide.textAlign || 'center'}`]"
                 :data-dropzone="true"
                 :data-slide-index="index"
                 :style="{
                   pointerEvents: 'auto',
                   width: '100%',
                   maxWidth: slide.contentMaxWidth || '640px',
                   minHeight: (props.minContentHeight && props.minContentHeight !== 'auto') ? props.minContentHeight : '150px',
                   display: 'flex',
                   flexDirection: 'column',
                   alignItems: 'inherit',
                   justifyContent: 'inherit',
                   gap: props.contentGap || '1rem',
                   color: slide.textColor || '#ffffff'
                 }">
                 
                 <div v-if="slide.title || slide.description || slide.buttonText" style="display: flex; flex-direction: column; gap: inherit; align-items: inherit;">
                    <h2 v-if="slide.title" class="m-0 fw-bold">{{ slide.title }}</h2>
                    <p v-if="slide.description" class="m-0">{{ slide.description }}</p>
                    <div v-if="slide.buttonText" class="mt-2">
                      <a :href="slide.buttonLink || '#'" class="btn btn-primary px-4 py-2">
                        {{ slide.buttonText }}
                      </a>
                    </div>
                 </div>

                 <slot :name="'slide-' + index"></slot>

            </div>
          </div>
        </div>
      </div>

      <template v-if="props.arrows === 'true'">
        <button class="carousel-control-prev" type="button" :data-bs-target="'#' + sliderId" data-bs-slide="prev" style="z-index: 10; pointer-events: auto;">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Önceki</span>
        </button>
        <button class="carousel-control-next" type="button" :data-bs-target="'#' + sliderId" data-bs-slide="next" style="z-index: 10; pointer-events: auto;">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Sonraki</span>
        </button>
      </template>
    </div>
  </template>

  <div v-else class="d-flex align-items-center justify-content-center text-muted p-5" style="min-height: 200px; border: 1px dashed rgba(0,0,0,0.2); border-radius: 8px;">
    Lütfen en az bir slayt ekleyin.
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import * as bootstrap from 'bootstrap';

const { props } = defineProps({
  props: {
    type: Object,
    default: () => ({})
  }
});

const sliderId = ref('carousel_' + Math.random().toString(36).substr(2, 9));
let carouselInstance = null;

function destroyCarousel() {
  if (carouselInstance) {
    carouselInstance.dispose();
    carouselInstance = null;
  }
}

function initCarousel() {
  const el = document.getElementById(sliderId.value);
  if (!el) return;

  const existing = bootstrap.Carousel.getInstance(el);
  if (existing) existing.dispose();

  carouselInstance = new bootstrap.Carousel(el, {
    interval: props.autoplay === 'true' ? (parseInt(props.interval, 10) || 5000) : false,
    ride: props.autoplay === 'true' ? 'carousel' : false,
    touch: true
  });
}

onMounted(async () => {
  await nextTick();
  initCarousel();
});

onBeforeUnmount(() => {
  destroyCarousel();
});

watch(
  () => [props.autoplay, props.interval, props.slides],
  async () => {
    await nextTick();
    initCarousel();
  },
  { deep: true }
);
</script>