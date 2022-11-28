<template>
  <div class="w-200 h-244 bg-hoverBgGray">
    <PieThreeJs :data="[
      { value: 100, color: '#FF6666' },
      { value: 200, color: '#FFD888' },
    ]"
    />
  </div>
</template>
<script lang="ts" setup>
import PieThreeJs from '../../components/threejs/pie/index.vue'
</script>
