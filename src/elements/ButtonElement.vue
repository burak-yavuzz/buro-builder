<template>
  <div :class="[props.align, props.margin, props.padding, props.customClass]">
    <a 
      :href="props.link" 
      :target="props.target"
      class="btn" 
      :class="[props.variant, props.size, props.width]"
      @click="handleEditClick" 
    >
      {{ props.text }}
    </a>
  </div>
</template>

<script setup>
const { props } = defineProps(['props']);

// Editördeyken linke tıklandığında sayfanın değişmesini engelleriz, ancak hedef _blank ise çalışmasına izin veririz.
const handleEditClick = (e) => {
  // Eğer bu bileşen Page Builder içindeyse event'i durdurabilirsin.
  // Gerçek projede (Canlıda) bu kontrol kaldırılır.
  e.preventDefault(); 
};
</script>