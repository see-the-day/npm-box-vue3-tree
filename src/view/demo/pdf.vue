<template>
  <div class=" w-120 h-full">
    <pdf :url="pdfUrl" :type="'canvas'" @pageTotal="() => {}" />
  </div>
</template>
<script lang="ts" setup>
import pdf from '@/components/pdf/pdf'

const pdfUrl = new URL('./电商大数据分析案例.pdf', import.meta.url).href

</script>
