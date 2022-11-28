<template>
  <div class="flex">
    <vueOrg :data="data" :globalStyles="globalStyles" align="top" @on-expand-toggle="expand">
      <template #default="node">
        <div>
          {{ node.label }}
        </div>
      </template>
    </vueOrg>
    <div class="w-200 ml-20">
      <div v-for="li of list" :key="li.key" class="flex items-center mb-10">
        {{ li.name }} <NInput v-model:value="globalStyles[li.key]" class="flex-1 ml-12" type="text" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import data from './mock'
import { NInput } from 'naive-ui'
import { reactive } from 'vue'
import { vueOrg } from '../../components/index'
import type { Data } from '../../components/types'
import 'vue3-org/lib/style.css'
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
