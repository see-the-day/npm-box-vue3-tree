import getPdfjsDist from './getPdfjsDist'
import { h } from 'vue'
export default {
  name: 'Pdf',
  props: {
    url: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'canvas'
    },
    scaleNum: {
      type: Number,
      default: 1
    }
  },
  emits: ['pdf-down'],
  data () {
    return {
      pdfViewer: null,
      pdfLinkService: null,
      loadingTask: null
    }
  },
  watch: {
    url () {
      // 如果存在pdfViewer则取消渲染
      if (this.pdfViewer) {
        this.pdfViewer._cancelRendering()
      }
      this.renderPdf()
    },
    scaleNum () {
      if (this.pdfViewer) {
        this.pdfViewer._cancelRendering()
      }
      this.renderPdf()
    }
  },
  mounted () {
    this.pdfLibInit().then(() => {
      this.renderPdf()
    })
  },

  methods: {
    onPagesInit ({ source }) {
      this.$emit('pageTotal', source._pages.length)
      source.currentScaleValue = this.scaleNum
    },
    async pdfLibInit () {
      let { pdfjsLib } = window
      let { pdfjsViewer } = window
      if (!pdfjsLib || !pdfjsViewer) {
        try {
          await getPdfjsDist('./')
          this.CMAP_URL = './pdf/cmaps/'
          // eslint-disable-next-line prefer-destructuring
          pdfjsLib = window.pdfjsLib
          pdfjsLib.GlobalWorkerOptions.workerSrc = './pdf/build/pdf.worker.js'
          // eslint-disable-next-line prefer-destructuring
          pdfjsViewer = window.pdfjsViewer
        } catch (error) {
          // console.log(error)
          // pdfjs文件获取失败
          return
        }
      }

      const { container } = this.$refs
      const eventBus = new pdfjsViewer.EventBus()

      // (Optionally) enable hyperlinks within PDF files.
      const pdfLinkService = new pdfjsViewer.PDFLinkService({
        eventBus: eventBus
      })
      this.pdfLinkService = pdfLinkService
      const pdfViewer = new pdfjsViewer.PDFViewer({
        container: container,
        eventBus: eventBus,
        linkService: pdfLinkService,
        renderer: this.type,
        textLayerMode: 0,
        downloadManager: new pdfjsViewer.DownloadManager({}),
        enableWebGL: true
      })
      this.pdfViewer = pdfViewer
      pdfLinkService.setViewer(pdfViewer)

      eventBus.on('pagesinit', this.onPagesInit)
    },
    renderPdf () {
      if (!this.url) { return }
      // Loading document.
      if (this.pdfViewer === null || this.pdfLinkService === null) {
        return
      }
      if (this.loadingTask !== null) {
        this.loadingTask.destroy()
        this.loadingTask = null
      }
      this.loadingTask = window.pdfjsLib.getDocument({
        cMapUrl: this.CMAP_URL,
        cMapPacked: true,
        url: this.url
      })
      return this.loadingTask.promise.then((pdfDocument) => {
        if (pdfDocument.loadingTask.destroyed || !this.url) { return }
        this.pdfViewer.setDocument(pdfDocument)
        this.pdfLinkService.setDocument(pdfDocument, null)
        this.loadingTask = null
      }).finally(() => {
        this.$emit('pdf-down')
      })
    }
  },
  render () {
    return h('div',
      {
        class: 'pdf-view'
      },
      h('div',
        {
          id: 'viewerContainer',
          ref: 'container'
        },
        h('div',
          {
            ref: 'container'
          },
          []
        )
      ))
  }
}
