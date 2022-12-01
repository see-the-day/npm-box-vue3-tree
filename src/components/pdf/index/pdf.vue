<template>
  <div class="pdf-view">
    <div id="viewerContainer" ref="container">
      <div ref="container" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import getPdfjsDist from './getPdfjsDist'
import pdfViewerJs from '../pdf/build/pdf.worker.js?url'
import { withDefaults, watch, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  url: string,
  type?: string,
  scaleNum?: number
}>(), {
  type: 'canvas',
  scaleNum: 1
})
const pdfViewerValue = ref<null|{setDocument:(pdfDocument: any) => {}, _cancelRendering: () => {}}>(null)
watch(props, () => {
  if (pdfViewerValue.value) {
    pdfViewerValue.value._cancelRendering()
    renderPdf()
  }
})
onMounted(() => {
  pdfLibInit().then(() => {
    renderPdf()
  })
})

const emit = defineEmits(['pageTotal', 'pdf-down'])
const onPagesInit = ({ source }: {source: {_pages: [], currentScaleValue: number}}) => {
  emit('pageTotal', source._pages.length)
  source.currentScaleValue = props.scaleNum
}

const container = ref(null)
const pdfLibInit = async () => {
  let { pdfjsLib } = window
  let { pdfjsViewer } = window
  if (!pdfjsLib || !pdfjsViewer) {
    try {
      await getPdfjsDist()
      // eslint-disable-next-line prefer-destructuring
      pdfjsLib = window.pdfjsLib
      pdfjsLib.GlobalWorkerOptions.workerSrc = pdfViewerJs
      // eslint-disable-next-line prefer-destructuring
      pdfjsViewer = window.pdfjsViewer
    } catch (error) {
      // console.log(error)
      // pdfjs文件获取失败
      return
    }
  }

  const eventBus = new pdfjsViewer.EventBus()

  // (Optionally) enable hyperlinks within PDF files.
  const pdfLinkService = new pdfjsViewer.PDFLinkService({
    eventBus: eventBus
  })
  pdfLink.value = pdfLinkService
  const pdfViewer = new pdfjsViewer.PDFViewer({
    container: container.value,
    eventBus: eventBus,
    linkService: pdfLinkService,
    renderer: props.type,
    textLayerMode: 0,
    downloadManager: new pdfjsViewer.DownloadManager({}),
    enableWebGL: true
  })
  pdfViewerValue.value = pdfViewer
  pdfLinkService.setViewer(pdfViewer)

  eventBus.on('pagesinit', onPagesInit)
}
const pdfLink = ref<null|{setDocument:(pdfDocument: any, b: null) => {}}>(null)
const loadingTask = ref<null|{destroy:() => {}, promise: Promise<any>}>(null)
const renderPdf = () => {
  if (!props.url) { return }
  // Loading document.
  if (pdfViewerValue.value === null || pdfLink.value === null) {
    return
  }
  if (loadingTask.value !== null) {
    loadingTask.value.destroy()
    loadingTask.value = null
  }
  loadingTask.value = window.pdfjsLib.getDocument({
    cMapUrl: '../pdf/cmaps/',
    cMapPacked: true,
    url: props.url
  })
  if (loadingTask.value !== null) {
    return loadingTask.value.promise.then((pdfDocument:any) => {
      if (pdfDocument.loadingTask.destroyed || !props.url) { return }
      pdfViewerValue.value?.setDocument(pdfDocument)
      pdfLink.value?.setDocument(pdfDocument, null)
      loadingTask.value = null
    }).finally(() => {
      emit('pdf-down')
    })
  }
}

</script>
