<template>
  <div class="ratio ratio-16x9 rounded overflow-hidden" :class="[props.margin, props.shadow, props.customClass]">
    <iframe :src="'https://www.youtube.com/embed/' + props.videoId" title="YouTube video" allowfullscreen></iframe>
  </div>
</template>
<script setup> const { props } = defineProps(['props']); </script>