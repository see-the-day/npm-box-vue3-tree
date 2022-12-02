<template>
  <div class=" w-960 h-560">
    <pdf :url="pdfUrl" :type="'canvas'" @pageTotal="() => {}" />
  </div>
</template>
<script lang="ts" setup>
import pdf from '@/components/pdf/pdf'

const pdfUrl = new URL('./电商大数据分析案例.pdf', import.meta.url).href

</script>
