<template>
    <div>
        <input ref="pdf-upload-input" class="pdf-upload-input" type="file" accept=".pdf" @change="handleClick">
        <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
            将pdf文件拖拽到框内，或者
            <el-button :loading="loading" style="margin-left:15px;" type="primary" @click="handleUpload">
                点击上传
            </el-button>
        </div>
    </div>
</template>

<script>
// import '../../../vendor/pdfjs/pdf.js'
// let pdfjsLib = window['pdfjs-dist/build/pdf'];
// pdfjsLib.GlobalWorkerOptions.workerSrc = '../vendor/pdfjs/pdf.worker.js';
// pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.10.111/build/pdf.worker.js';

export default {
    props: {
        beforeUpload: Function, // eslint-disable-line
        onSuccess: Function// eslint-disable-line
    },
    data() {
        return {
            loading: false,
            excelData: {
                header: null,
                results: null
            }
        }
    },
    methods: {
        handleDrop(e) {
            e.stopPropagation()
            e.preventDefault()
            if (this.loading) return
            const files = e.dataTransfer.files
            if (files.length !== 1) {
                this.$message.error('只支持一次处理 1 个PDF文件!')
                return
            }
            const rawFile = files[0] // only use files[0]
            this.upload(rawFile)
            e.stopPropagation()
            e.preventDefault()
        },
        handleDragover(e) {
            e.stopPropagation()
            e.preventDefault()
            e.dataTransfer.dropEffect = 'copy'
        },
        handleUpload() {
            this.$refs['pdf-upload-input'].click()
        },
        handleClick(e) {
            const files = e.target.files
            const rawFile = files[0] // only use files[0]
            if (!rawFile) return
            this.upload(rawFile)
            e.target.value = null
        },
        upload(rawFile) {
            this.$refs['pdf-upload-input'].value = null // fix can't select the same excel

            if (!this.beforeUpload) {
                this.readerData(rawFile)
                return
            }
            const before = this.beforeUpload(rawFile)
            if (before) {
                this.readerData(rawFile)
            }
        },
        readerData(rawFile) {
            this.loading = true
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = e => {
                    const data = e.target.result
                    // 将文件对象转化为 Uint8Array 
                    var typedarray = new Uint8Array(data);
                    // 返回 PDF 加载任务 PDFDocumentLoadingTask
                    try {
                        const loadingTask = pdfjsLib.getDocument(typedarray);
                        // 开始加载 PDF，这里封装了一个函数
                        this.loadPDFFile(loadingTask);
                        // this.loading = false
                        resolve()
                    } catch (error) {
                        this.$message.error('pdf.js初始化失败!')
                    }
                }
                reader.readAsArrayBuffer(rawFile)
            })
        },
        async loadPDFFile(loadingTask) {
            const pdf = await loadingTask.promise;
            console.log('pdf: ', pdf);
            const numPages = pdf.numPages;
            let _resultImages = [];
            for (let curPage = 1; curPage <= numPages; curPage++) {
                const page = await pdf.getPage(curPage);
                // console.log('page: ', page);
                const scale = 1.5;
                const viewport = page.getViewport({ scale });
                // Support HiDPI-screens.
                const outputScale = window.devicePixelRatio || 1;

                const canvas = new OffscreenCanvas(200, 200);
                const context = canvas.getContext("2d");

                const transform = outputScale !== 1
                    ? [outputScale, 0, 0, outputScale, 0, 0]
                    : null;

                const renderContext = {
                    canvasContext: context,
                    transform,
                    viewport,
                };
                const renderTask = page.render(renderContext);
                await renderTask.promise;

                const ops = await page.getOperatorList();

                // https://stackoverflow.com/a/39855420 Extract Images
                const imageNames = ops.fnArray.reduce((acc, curr, i) => {
                    if ([pdfjsLib.OPS.paintImageXObject, pdfjsLib.OPS.paintJpegXObject].includes(curr)) {
                        acc.push(ops.argsArray[i][0]);
                    }
                    return acc;
                }, []);
                // console.log('imageNames: ', ops, imageNames);
                for (const imageName of imageNames) {
                    await page.objs.get(imageName, (image) => {
                        // console.log('image: ', image);
                        (async function () {
                            // https://stackoverflow.com/questions/52959839/convert-imagebitmap-to-blob/52959897#52959897
                            const bmp = image.bitmap;
                            // create a canvas
                            // the difference of ImageData and ImageBitmap https://stackoverflow.com/a/60033582
                            // const canvas = document.createElement('canvas');
                            // resize it to the size of our ImageBitmap
                            // canvas.width = bmp.width;
                            // canvas.height = bmp.height;
                            // OffscreenCanvas
                            const resizeScale = 1 / 4;
                            const width = bmp.width * resizeScale;
                            const height = bmp.height * resizeScale;
                            const canvas = new OffscreenCanvas(width, height);
                            // get a bitmaprenderer context
                            // bitmaprenderer 和 
                            const ctx = canvas.getContext('bitmaprenderer');

                            ctx.transferFromImageBitmap(bmp);
                            // get it back as a Blob
                            const blob = await canvas.convertToBlob();

                            // const img = document.body.appendChild(new Image());
                            const img = new Image();
                            _resultImages.push(img);
                            img.width = width;
                            img.height = height;
                            img.src = URL.createObjectURL(blob);
                        })();
                    });
                }
            }
            this.loading = false
            this.onSuccess && this.onSuccess(_resultImages)
            // console.log('resultImages: ', _resultImages);
        }
    }
}
</script>

<style scoped>
.pdf-upload-input {
    display: none;
    z-index: -9999;
}

.drop {
    border: 2px dashed #aaa;
    width: 100%;
    height: 160px;
    line-height: 160px;
    margin: 0 auto;
    font-size: 24px;
    border-radius: 5px;
    text-align: center;
    color: #bbb;
    position: relative;
}
</style>