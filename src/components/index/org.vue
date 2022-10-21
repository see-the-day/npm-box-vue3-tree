<template>
  <orgRender />
</template>
<script lang="ts" setup>
import { shallowRef, watch, withDefaults, h, VNode, useSlots } from 'vue'
import { Data, GlobalStyles } from '../types/OrgData'
interface OrgProps {
  data: Data,
  globalStyles: GlobalStyles,
  align?: 'top' | 'center' | 'vertical'
}
const props = withDefaults(defineProps<OrgProps>(), { align: 'center' })

const slots: any = useSlots()
const getChildren = (data: Data) => {
  const children: VNode[] = []
  const current = h('div',
    { class: 'tree-children' },
    slots.default ? slots.default(data) : data.label
  )
  const length = data?.children?.length || 0;
  (data?.children || []).forEach((od, index) => {
    children.push(
      h('div', {
        class: `tree-parent tree-content ${index === length - 1 ? 'tree-parent-last' : !index ? 'tree-parent-first' : ''}`
      }, getChildren(od)))
  })

  const status = h('div',
    { class: 'tree-toggle', onClick: () => hideChildren(data) },
    slots.expand ? slots.expand(data) : data.unExpand ? '+' : '-'
  )
  const next = h('div', { class: 'left-border' }, data.unExpand ? [status] : [status, ...children])

  return children.length ? [current, next] : [current]
}
const orgRender = shallowRef({})
const treeRender = (data: Data) => {
  orgRender.value = {
    render: () => {
      return h('div', { class: `org-default org-${props.align}` }, getChildren(data))
    }
  }
}

watch(() => props.data, treeRender, { immediate: true })

const emit = defineEmits(['on-expand-toggle'])
const hideChildren = async (data: Data) => {
  data.unExpand = !data.unExpand
  emit('on-expand-toggle', data.unExpand, data)
  treeRender(props.data)
}

const globalStyles = shallowRef({
  $left: '60px',
  $childrenBottom: '70px',
  $childrenBoxWidth: '80px',
  $childrenBoxHeight: '40px',
  $childrenBorder: '1px solid #000',
  $childrenRadius: '4px',
  $line: '1px solid #000'
})
watch(() => props.globalStyles, () => {
  globalStyles.value = { ...globalStyles.value, ...props.globalStyles }
}, { deep: true, immediate: true })

</script>

<style lang="scss">
.org-default {
  display: flex;
  align-items: center;
  .tree-parent {
    display: flex;
    align-items: center;
  }
  .tree-children {
    border-radius: v-bind('globalStyles.$childrenRadius');
    border: v-bind('globalStyles.$childrenBorder');
    width: v-bind('globalStyles.$childrenBoxWidth');
    height: v-bind('globalStyles.$childrenBoxHeight');
  }
  .left-border {
    margin-left: v-bind('globalStyles.$left');
    padding-left: v-bind('globalStyles.$left');
    position: relative;
    display: flex;
    flex-direction: column;
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: calc(v-bind('globalStyles.$left') * -1);
      width: v-bind('globalStyles.$left');
      border-top: v-bind('globalStyles.$line');
    }
    .tree-toggle {
      width: 20px;
      height: 20px;
      background: #fff;
      border: 1px solid #000;
      cursor: pointer;
      z-index: 1;
      border-radius: 50%;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: calc(50% - 10px);
      left: -10px;
    }
    .tree-content {
      margin-bottom: v-bind('globalStyles.$childrenBottom');
      position: relative;
      &:before {
        content: '';
        position: absolute;
        left: calc(v-bind('globalStyles.$left') * -1);
        border-top: v-bind('globalStyles.$line');
        width: v-bind('globalStyles.$left');
      }
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: calc(v-bind('globalStyles.$left') * -1);
        height: calc(v-bind('globalStyles.$childrenBottom') + 100%);
        border-left: v-bind('globalStyles.$line');
      }
    }
    .tree-parent-first:after {
      top: 50%;
      height: calc(v-bind('globalStyles.$childrenBottom') + 50%);
    }
    .tree-parent-last {
      margin-bottom: 0;
      &:after {
        height: 50%;
        top: 0;
      }
    }
  }
}
.org-top {
  align-items: flex-start;
  .tree-parent {
    align-items: flex-start;
  }
  .left-border {
    &:before {
      top: calc(v-bind('globalStyles.$childrenBoxHeight') / 2)
    }
    .tree-toggle {
      top: calc(v-bind('globalStyles.$childrenBoxHeight') / 2 - 10px)
    }
    .tree-content:before {
      top: calc(v-bind('globalStyles.$childrenBoxHeight') / 2)
    }
    .tree-parent-first:after {
      height: calc(v-bind('globalStyles.$childrenBottom') + 100%);
      top: calc(v-bind('globalStyles.$childrenBoxHeight') / 2)
    }
  }
}
.org-vertical {
  flex-direction: column;
  .tree-parent {
    flex-direction: column;
  }

  .left-border {
    flex-direction: initial;
    margin-top: v-bind('globalStyles.$childrenBottom');
    padding-top: v-bind('globalStyles.$childrenBottom');
    margin-left: 0;
    padding-left: 0;
    &:before {
      left: 50%;
      top: calc(v-bind('globalStyles.$childrenBottom') * -1);
      height: v-bind('globalStyles.$childrenBottom');
      border-top: 0;
      border-left: v-bind('globalStyles.$line');
    }
    .tree-toggle {
      left: calc(50% - 10px);
      top: -10px;
    }
    .tree-content {
      margin-right: v-bind('globalStyles.$left');
      &:before {
        width: 0;
        top: calc(v-bind('globalStyles.$childrenBottom') * -1);
        left: 50%;
        border-left: v-bind('globalStyles.$line');
        height: v-bind('globalStyles.$childrenBottom');
      }
      &:after {
        left: 0;
        top: calc(v-bind('globalStyles.$childrenBottom') * -1);
        width: calc(v-bind('globalStyles.$left') + 100%);
        border-top: v-bind('globalStyles.$line');
        border-left: 0;
      }
    }
    .tree-parent-first:after {
      top: calc(v-bind('globalStyles.$childrenBottom') * -1);
      left: 50%;
      width: calc(v-bind('globalStyles.$left') + 50%);
    }
    .tree-parent-last {
      margin-right: 0;
      &:after {
        width: 50%;
        left: 0;
        top: calc(v-bind('globalStyles.$childrenBottom') * -1);
      }
    }
  }
}
</style>
