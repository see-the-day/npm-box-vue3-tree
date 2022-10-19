<template>
  <div class="flex">
    <vueTree :data="data" :globalStyles="globalStyles" align="vertical" @on-expand-toggle="expand">
      <template #default="node">
        <div>
          {{ node.label }}
        </div>
      </template>
      <!-- <template #expand>
        <div class=" w-50 h-50 border-1 bg-white">
          11
        </div>
      </template> -->
    </vueTree>
    <div class="w-200 ml-20">
      <div v-for="li of list" :key="li.key" class="flex items-center mb-10">
        {{ li.name }} <NInput v-model:value="globalStyles[li.key]" class="flex-1 ml-12" type="text" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
// import org from '@/components/index/org.vue'
import data from './mock'
import { NInput } from 'naive-ui'
import { reactive } from 'vue'
import { Data } from '@/types/OrgData'
const expand = (expand: boolean, data: Data) => {
  console.log(expand, data)
}

const list: {name: string, key: string}[] = [
  { name: '距右侧距离', key: '$left' },
  { name: '距下方距离', key: '$childrenBottom' },
  { name: '盒子宽度', key: '$childrenBoxWidth' },
  { name: '盒子高度', key: '$childrenBoxHeight' },
  { name: '盒子边框', key: '$childrenBorder' },
  { name: '盒子圆角', key: '$childrenRadius' },
  { name: '连接线', key: '$line' }
]

const globalStyles = reactive({
  $left: '50px',
  $childrenBottom: '40px',
  $childrenBoxWidth: '80px',
  $childrenBoxHeight: '40px',
  $childrenBorder: '1px solid #000',
  $childrenRadius: '4px',
  $line: '1px solid #000'
})
</script>
