import pdf from '../pdf/build/pdf.js?url'
import pdfViewer from '../pdf/web/pdf_viewer.js?url'
import pdfViewerCss from '../pdf/web/pdf_viewer.css?url'
const getJavsScript = (src: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.onload = resolve
    script.onerror = reject

    script.src = src
    document.body.append(script)
  })
}
const getCss = (href: string) => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')

    link.onload = resolve
    link.onerror = reject

    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.href = href
    document.body.append(link)
  })
}
const getPdfjsDist = () => {
  return getJavsScript(pdf)
    .then(() => {
      return Promise.all([
        getJavsScript(pdfViewer),
        getCss(pdfViewerCss)
      ])
    })
}
export default getPdfjsDist
