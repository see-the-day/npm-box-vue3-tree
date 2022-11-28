<template>
  <div id="PieThree" class="w-full h-full" />
</template>
<script lang="ts" setup>
import { onMounted, withDefaults } from 'vue'
import * as THREE from 'three'
import { FanShapeOptions, PieData, EntryOption } from '../../types/PieThree'
const props = withDefaults(defineProps<{
  data: PieData,
  isHelper?: boolean,
  mashOptions?: FanShapeOptions
}>(), {
  isHelper: false,
  data: () => []
})
// 创建场景对象
const scene = new THREE.Scene()
console.log(scene)
onMounted(() => {
  createMash()
  createHelper()
  createPoint()
  createRender()
})
/**
 * 绘制扇形shape
 */

function addFanShape (options: FanShapeOptions) {
  const shape = new THREE.Shape()
  shape.arc(0, 0, options.radius, options.startAngle, options.endAngle, false)
  const points = shape.getPoints()
  points.push(new THREE.Vector2(0, 0))
  const shape2 = new THREE.Shape(points)
  // 拉伸造型 depth 拉伸长度
  const geometry = new THREE.ExtrudeGeometry(shape2, { depth: options.depth, bevelEnabled: false })
  geometry.rotateY(Math.PI / 18)
  const material = new THREE.MeshLambertMaterial({
    color: options.color,
    transparent: options.transparent,
    opacity: options.opacity
  })
  const mesh = new THREE.Mesh(geometry, material)
  return mesh
}
const getOptions = (entryOptions: EntryOption) => {
  const options = {
    transparent: true,
    opacity: 0.8,
    radius: 50,
    depth: 10,
    ...entryOptions,
    ...props.mashOptions
  }
  return options
}
const createMash = () => {
  const reduceValue = props.data.reduce((prev, { value }) => {
    return prev + value
  }, 0)
  // const defaultOptions = { color: '#CC5252', startAngle: 0, endAngle: Math.PI }
  let prevValue = 0
  props.data.forEach(({ value, color }) => {
    const endAngle = prevValue + Math.PI * 2 * value / reduceValue
    const mesh = addFanShape(getOptions({ color, startAngle: prevValue, endAngle }))
    scene.add(mesh) // 网格模型添加到场景中
    prevValue = endAngle
  })
}

// 创建坐标轴
const createHelper = () => {
  if (!props.isHelper) return
  const axisHelper = new THREE.AxesHelper(250)
  scene.add(axisHelper)
}

// 创建光源
const createPoint = () => {
  const point = new THREE.PointLight(0xffffff)
  point.position.set(400, 200, 300) // 点光源位置
  scene.add(point) // 点光源添加到场景中
  // 环境光
  const ambient = new THREE.AmbientLight(0x444444)
  scene.add(ambient)
}

// 创建渲染器
const createRender = () => {
  const width = document.getElementById('PieThree')?.offsetWidth || 0
  const height = document.getElementById('PieThree')?.offsetHeight || 0
  const k = width / height // 窗口宽高比
  const s = 65 // 三维场景显示范围控制系数，系数越大，显示的范围越大
  // 创建相机对象
  const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
  camera.position.set(200, 300, 200) // 设置相机位置
  camera.up.set(0, 0, 1)
  camera.lookAt(scene.position) // 设置相机方向(指向的场景对象)

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height)// 设置渲染区域尺寸
  renderer.setClearColor(0xb9d3ff, 0) // 设置背景颜色
  document.getElementById('PieThree')?.appendChild(renderer.domElement) // body元素中插入canvas对象
  // 渲染函数
  renderer.render(scene, camera)// 执行渲染操作
}
</script>
