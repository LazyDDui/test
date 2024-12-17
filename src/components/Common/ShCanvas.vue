<script setup lang="ts">
import { fabric } from "fabric";
import draggable from "vuedraggable";
import * as PDFJS from "pdfjs-dist";
import { uniqBy } from "lodash";
import { computed, nextTick, onMounted, ref, toRaw, watch } from "vue";

// @ts-ignore
const workerSrc = import("pdfjs-dist/build/pdf.worker.entry");
// @ts-ignore
PDFJS.GlobalWorkerOptions.workerSrc = workerSrc;
let pdfUrl = ref<string>("");
let pdfDoc = ref<any>(null);
let numPages = ref<number>(1);
let scale = ref<number>(1.4);
let pageRendering = ref<Boolean>(false);
let pageNumPending = ref<any>(null);
let sealUrl = ref<string>("");
let signUrl = ref<string>("");
let canvas = ref<any>(null);
let ctx = ref<any>(null);
let canvasEle = ref<any>(null);
let whDatas = ref<any>(null);
let width = ref<number>(0);
let height = ref<number>(0);

type ShCanvasProps = {
  url: string;
  info: {
    position: boolean;
    all: boolean;
  };
  pageNum: number;
};

const props = defineProps<ShCanvasProps>();
const emit = defineEmits(["change"]);

onMounted(() => {
  let canvaEle: any = document.querySelector("#ele-canvas" + props.pageNum);
  canvasEle.value = new fabric.Canvas(canvaEle);

  pdfUrl.value = props.url;
  showpdf(pdfUrl.value);
});

//渲染pdf，到时还会盖章信息，在渲染时，同时显示出来，不应该在切换页码时才显示印章信息
const showpdf = (pdfUrl: any) => {
  canvas.value = document.getElementById("the-canvas" + props.pageNum);
  let caches = JSON.parse(localStorage.getItem("signs") as any); //获取缓存字符串后转换为对象
  ctx.value = canvas.value.getContext("2d");
  PDFJS.getDocument({
    url: pdfUrl,
    rangeChunkSize: 65536,
    disableAutoFetch: false
  }).promise.then(pdfDoc_ => {
    pdfDoc.value = pdfDoc_;
    numPages.value = pdfDoc.value.numPages;
    emit("change", {
      numPages: numPages.value
    });
    renderPage(props.pageNum).then(() => {
      renderPdf({
        width: canvas.value.width,
        height: canvas.value.height
      });
    });

    nextTick(() => {
      if (caches != null) {
        let datas = caches[props.pageNum];
        if (datas != null && datas != undefined) {
          for (let index in datas) {
            addSeal(
              datas[index].sealUrl.img,
              datas[index].left,
              datas[index].top,
              datas[index].index
            );
          }
        }
      }
    });
  });
};

// 添加公章
const addSeal = async (sealUrl: any, left: any, top: any, index: any) => {
  await fabric.Image.fromURL(sealUrl, (oImg: any) => {
    oImg.set({
      left: left,
      top: top,
      // angle: 10,
      scaleX: 0.8,
      scaleY: 0.8,
      index: index
    });
    oImg.scale(0.2); //图片缩小一
    canvasEle.value.add(oImg);
  });
};

/**
 *  盖章部分开始
 */
// 设置绘图区域宽高
const renderPdf = (data: any) => {
  whDatas.value = data;
};

const renderPage = (num: any) => {
  pageRendering.value = true;
  // 使用 toRaw的原因： https://www.jianshu.com/p/1432ccd5089a
  return toRaw(pdfDoc.value)
    .getPage(num)
    .then((page: any) => {
      let viewport = page.getViewport({ scale: scale.value }); //设置视口大小

      width.value = viewport.width > width.value ? viewport.width : width.value;
      height.value =
        viewport.height > height.value ? viewport.height : height.value;

      // pdf 区域 (取最大的页面的尺寸 pdf页面大小不同会导致拖拽区域偏差)
      canvas.value.width = width.value;
      canvas.value.height = height.value;

      // Render PDF page into canvas context
      let renderContext = {
        canvasContext: ctx.value,
        viewport: viewport
      };
      let renderTask = page.render(renderContext);
      // Wait for rendering to finish
      renderTask.promise.then(() => {
        pageRendering.value = false;
        if (pageNumPending.value !== null) {
          // New page rendering is pending
          renderPage(pageNumPending.value);
          pageNumPending.value = null;
        }
      });
    });
};
</script>

<template>
  <div>
    <canvas :id="`the-canvas${pageNum}`" />
    <!-- 盖章部分 -->
    <canvas :id="`ele-canvas${pageNum}`" />
  </div>
</template>

<style scoped lang="scss">
#the-canvas {
  margin-top: 14px;
}

#ele-canvas {
  border: 1px dashed #42090c;
  overflow: hidden;
  mix-blend-mode: multiply !important;
}
</style>
