<script setup lang="ts">
import { fabric } from "fabric";
import draggable from "vuedraggable";
import * as PDFJS from "pdfjs-dist";
import { uniq, uniqBy } from "lodash";
import { computed, nextTick, onMounted, ref, toRaw, watch } from "vue";
// @ts-ignore
const workerSrc = import("pdfjs-dist/build/pdf.worker.entry");
// @ts-ignore
PDFJS.GlobalWorkerOptions.workerSrc = workerSrc;
// PDFJS.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.worker.js';
let pdfUrl = ref<string>("");
let pdfDoc = ref<any>(null);
let numPages = ref<number>(1);
let pageNum = ref<number>(1);
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

const signData = ref();

const props = defineProps<{
  pdfFlow: any;
  imgList: any;
  info: {
    position: boolean;
    all: boolean;
  };
}>();

const emit = defineEmits(["change"]);

const mainImagelist = computed(() => {
  return props.imgList;
});

const selectImg = ref([]);

onMounted(() => {
  let canvaEle: any = document.querySelector("#ele-canvas");
  canvasEle.value = new fabric.Canvas(canvaEle);

  pdfUrl.value = props.pdfFlow;
  console.log(pdfUrl.value);
  showpdf(pdfUrl.value);

  // loadAllPages(pdfUrl.value); // 加载所有页面
  // setPdfArea()
});
const stamps = ref<string[]>([]);
// 使用 fabric.js 生成骑缝章
// 使用 fabric.js 生成竖向骑缝章
const createPagingStamps = (imageUrl: string, pageCount: number) => {
  fabric.Image.fromURL(imageUrl, img => {
    const imgWidth = img.width!;
    const imgHeight = img.height!;
    const stampWidth = imgWidth / pageCount; // 每页宽度相等
    const overlap = stampWidth * 0.1; // 每页的章部分重叠（10%）

    stamps.value = []; // 清空旧结果

    for (let i = 0; i < pageCount; i++) {
      // 创建裁剪的 Canvas
      const canvas = new fabric.Canvas(null, {
        width: stampWidth,
        height: imgHeight
      });

      // 克隆图片对象
      const clippedImage = fabric.util.object.clone(img);

      // 设置裁剪区域
      clippedImage.set({
        left: -i * (stampWidth - overlap) // 左移图片，实现裁剪和重叠
      });

      // 添加图片到 Canvas
      canvas.add(clippedImage);
      canvas.setDimensions({ width: imgHeight / 8, height: imgHeight });

      // 渲染裁剪结果
      canvas.renderAll();

      // 导出为 Base64 图片
      const dataUrl = canvas.toDataURL({ format: "png" });
      stamps.value.push(dataUrl);

      // 销毁 canvas 释放内存
      canvas.dispose();
    }
  });
};

watch(
  () => whDatas.value,
  () => {
    if (whDatas.value) {
      renderFabric();
      canvasEvents();
      let eleCanvas: any = document.querySelector("#ele-canvas");
      // eleCanvas.style = 'border:1px solid #5ea6ef'
    }
  },
  { deep: true }
);

watch(
  () => pageNum.value,
  () => {
    commonSign(pageNum.value);
    queueRenderPage(pageNum.value);
  },
  { deep: true }
);

watch(
  () => props.pdfFlow,
  () => {
    pdfUrl.value = props.pdfFlow;
    showpdf(pdfUrl.value);
  },
  { deep: true }
);

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

// 生成绘图区域
const renderFabric = () => {
  let canvaEle: any = document.querySelector("#ele-canvas");
  // let pCenter: any = document.querySelector('.pCenter')
  let pCenter: any = document.querySelector("#the-canvas");

  canvaEle.width = pCenter.clientWidth;
  canvaEle.height = whDatas.value.height;

  canvasEle.value = new fabric.Canvas(canvaEle);
  let container: any = document.querySelector(".canvas-container");
  container.style.position = "absolute";
  container.style.top = "50px";
  // container.style.left = "30%";
};

const queueRenderPage = (num: any) => {
  if (pageRendering.value) {
    pageNumPending.value = num;
  } else {
    renderPage(num);
  }
};

const prevPage = () => {
  confirmSignature();
  if (pageNum.value <= 1) {
    return;
  }
  pageNum.value = pageNum.value - 1;
};

const nextPage = () => {
  confirmSignature();
  if (pageNum.value >= numPages.value) {
    return;
  }
  pageNum.value = pageNum.value + 1;
};

const cutover = () => {
  confirmSignature();
};

//渲染pdf，到时还会盖章信息，在渲染时，同时显示出来，不应该在切换页码时才显示印章信息
const showpdf = (pdfUrl: any) => {
  canvas.value = document.getElementById("the-canvas");
  let caches = JSON.parse(localStorage.getItem("signs") as any); //获取缓存字符串后转换为对象
  ctx.value = canvas.value.getContext("2d");
  PDFJS.getDocument({
    url: pdfUrl,
    // url: "../../../public/pdf/test.pdf",
    rangeChunkSize: 65536,
    disableAutoFetch: false
    // cMapUrl: "/static/cmaps/"
  }).promise.then(pdfDoc_ => {
    pdfDoc.value = pdfDoc_;
    numPages.value = pdfDoc.value.numPages;
    console.log(mainImagelist.value);

    createPagingStamps(mainImagelist.value[0].img, pdfDoc.value.numPages);
    emit("change", {
      numPages: numPages.value
    });
    renderPage(pageNum.value).then(() => {
      renderPdf({
        width: canvas.value.width,
        height: canvas.value.height
      });
    });
    commonSign(pageNum.value, true);
    nextTick(() => {
      if (caches != null) {
        let datas = caches[pageNum.value];
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

/**
 *  盖章部分开始
 */
// 设置绘图区域宽高
const renderPdf = (data: any) => {
  whDatas.value = data;
};

// 相关事件操作
const canvasEvents = () => {
  // 拖拽边界 不能将图片拖拽到绘图区域外
  canvasEle.value.on("object:moving", function (e: any) {
    var obj = e.target;
    // if object is too big ignore
    if (
      obj.currentHeight > obj.canvas.height ||
      obj.currentWidth > obj.canvas.width
    ) {
      return;
    }
    obj.setCoords();
    // top-left  corner
    if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
      obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
      obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left);
    }
    // bot-right corner
    if (
      obj.getBoundingRect().top + obj.getBoundingRect().height >
        obj.canvas.height ||
      obj.getBoundingRect().left + obj.getBoundingRect().width >
        obj.canvas.width
    ) {
      obj.top = Math.min(
        obj.top,
        obj.canvas.height -
          obj.getBoundingRect().height +
          obj.top -
          obj.getBoundingRect().top
      );
      obj.left = Math.min(
        obj.left,
        obj.canvas.width -
          obj.getBoundingRect().width +
          obj.left -
          obj.getBoundingRect().left
      );
    }
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
    console.log(oImg)
    canvasEle.value.add(oImg);
  });
};

// 删除签章
const removeSignature = () => {
  canvasEle.value.remove(canvasEle.value.getActiveObject());
};

//翻页展示盖章信息
const commonSign = (pageNum: any, isFirst = false) => {
  if (isFirst == false) canvasEle.value.remove(canvasEle.value.clear()); //清空页面所有签章
  let caches = JSON.parse(localStorage.getItem("signs") as any); //获取缓存字符串后转换为对象
  if (caches != null) {
    let datas = caches[pageNum];
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
};

//去重判断
const iteratee = (item: any) => {
  return item.width + "|" + item.height + "|" + item.top + "|" + item.left;
};

//确认签章位置并保存到缓存
const confirmSignature = () => {

  let data = canvasEle.value.getObjects(); //获取当前页面内的所有签章信息
  let caches: any = JSON.parse(localStorage.getItem("signs") as any); //获取缓存字符串后转换为对象
  data = uniqBy(data, iteratee);
  let signDatas: any = {}; //存储当前页的所有签章信息
  let i = 0;
  // let sealUrl = '';

  for (let val of data) {
    // 超出pdf区域的坐标信息不缓存
    if (val.left > width.value || val.top > height.value) {
      break;
    }
    signDatas[i] = {
      width: val.width,
      height: val.height,
      top: val.top,
      left: val.left,
      angle: val.angle,
      translateX: val.translateX,
      translateY: val.translateY,
      scaleX: val.scaleX,
      scaleY: val.scaleY,
      pageNum: pageNum.value,
      sealUrl: mainImagelist.value[val.index],
      all: props.info.all,
      position: props.info.position,
      index: val.index
    };
    i++;
  }
  if (caches == null) {
    caches = {};
    caches[pageNum.value] = signDatas;
  } else {
    caches[pageNum.value] = signDatas;
  }
  localStorage.setItem("signs", JSON.stringify(caches)); //对象转字符串后存储到缓存
  console.log(caches);
  if (props.info.all) {
    addSeal(
      stamps.value[0],
      200,
      300,
      i
    );
    // for (let i = 0; i < numPages.value; i++) {
    //   console.log(stamps.value);
    //
    // }
  }

  let objList = [];
  let arr: any[] = [];
  //@ts-ignore
  objList = Object.values(JSON.parse(localStorage.getItem("signs")));
  for (let i = 0; i < objList.length; i++) {
    for (let j = 0; j < Object.values(objList[i]).length; j++) {
      arr.push(Object.values(objList[i])[j]);
    }
  }
  signData.value = arr;
  return signData.value;
};

//清空数据
const clearSignature = () => {
  canvasEle.value.remove(canvasEle.value.clear()); //清空页面所有签章
  localStorage.removeItem("signs"); //清除缓存
};

const end = (e: any) => {
  addSeal(
    mainImagelist.value[e.newDraggableIndex].img,
    e.originalEvent.layerX,
    e.originalEvent.layerY,
    e.newDraggableIndex
  );
};

defineExpose({ confirmSignature, clearSignature });
</script>

<template>
  <div id="elesign" class="elesign">
    <div style="display: flex">
      <div class="pCenter">
        <div class="page">
          <el-button class="btn-outline-dark" @click="prevPage"
            >上一页
          </el-button>
          <el-button class="btn-outline-dark" @click="nextPage"
            >下一页
          </el-button>
          <el-button class="btn-outline-dark"
            >{{ pageNum }}/{{ numPages }}页
          </el-button>
          <el-input-number
            v-model="pageNum"
            style="margin: 0 5px; border-radius: 5px"
            class="btn-outline-dark"
            :min="1"
            :max="numPages"
            label="输入页码"
          />
          <el-button class="btn-outline-dark" @click="cutover">跳转</el-button>
        </div>
        <canvas id="the-canvas" />
        <!-- 盖章部分 -->
        <canvas id="ele-canvas" />
      </div>
      <div
        style="
          margin-left: 20px;
          flex: 1;
          padding: 60px;
          background-color: #fff;
          position: relative;
          transform: translateY(-10px);
        "
      >
        <div class="left-title">我的印章</div>
        <div style="max-height: 700px; overflow: auto" class="img_list">
          <!--					 <img class="imgstyle" width="100%;" v-for="item in mainImagelist" :src="item.img" />-->
          <draggable
            :list="mainImagelist"
            animation="300"
            :sort="false"
            style="
              display: flex;
              flex-wrap: wrap;
              border-top: 1px dotted #42090c;
              border-bottom: 1px dotted #42090c;
              padding-top: 20px;
              padding-bottom: 20px;
            "
            @end="end"
          >
            <template #item="{ element }">
              <div
                class="item"
                :style="{
                  marginBottom: '10px',
                  marginLeft: '10px'
                }"
              >
                <img
                  :src="element.img"
                  width="100%;"
                  height="100%"
                  class="imgstyle"
                  :style="{
                    border: selectImg.find(i => i.id == element.id)
                      ? `dashed 1px red`
                      : `dashed 1px #e8eef2`
                  }"
                  @click="
                    () => {
                      if (selectImg.find(i => i.id == element.id)) {
                        const index = selectImg.findIndex(
                          i => i.id == element.id
                        );
                        selectImg.splice(index, 1);
                      } else {
                        selectImg.push(element);
                      }
                    }
                  "
                />
              </div>
            </template>
          </draggable>
        </div>
        <div class="ele-control" style="margin-bottom: 2%">
          <el-button type="danger" @click="removeSignature">
            删除签章
          </el-button>
          <el-button type="danger" @click="clearSignature">
            清除所有签章
          </el-button>
        </div>
      </div>
    </div>
  </div>
  <div v-for="(stamp, index) in stamps" :key="index" style="margin: 10px">
    <img
      :src="stamp"
      :alt="'骑缝章第' + (index + 1) + '页'"
      style="border: 1px solid #ddd"
    />
  </div>
</template>
<style lang="scss" scoped>
.pCenter {
  //overflow-x: hidden;
  padding-left: 40px;
}

#the-canvas {
  margin-top: 14px;
}

html:fullscreen {
  background: white;
}

.elesign {
  display: flex;
  flex: 1;
  flex-direction: column;
  position: relative;
  /* padding-left: 180px; */
  margin: auto;
  /* width:600px; */
}

.page {
  text-align: center;
  margin: 0 auto;
  height: 36px;
}

#ele-canvas {
  border: 1px dashed #42090c;
  overflow: hidden;
  mix-blend-mode: multiply !important;
}

.ele-control {
  text-align: center;
  margin-top: 3%;
}

#page-input {
  width: 7%;
}

@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.loadingclass {
  position: absolute;
  top: 30%;
  left: 49%;
  z-index: 99;
}

.left {
  position: absolute;
  top: 42px;
  left: -5px;
  padding: 5px 5px;
  /*border: 1px solid #eee;*/
  /*border-radius: 4px;*/
}

.left-title {
  text-align: center;
  height: 36px;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px;
}

li {
  list-style-type: none;
  padding: 10px;
}

.imgstyle {
  vertical-align: middle;
  width: 130px;
  background-repeat: no-repeat;
  margin-bottom: 10px;
  mix-blend-mode: multiply;
}

.right {
  position: absolute;
  top: 7px;
  right: -177px;
  margin-top: 34px;
  padding-top: 10px;
  padding-bottom: 20px;
  width: 152px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.right-item {
  margin-bottom: 15px;
  margin-left: 10px;
}

.right-item-title {
  color: #777;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  font-weight: 400;
  text-align: left !important;
}

.detail-item-desc {
  color: #333;
  line-height: 20px;
  width: 100%;
  font-size: 12px;
  display: inline-block;
  text-align: left;
}

.btn-outline-dark {
  color: #000 !important;
  background-color: transparent;
  background-image: none;
  border: 1px solid #3e4b5b;
}

.btn-outline-dark:hover {
  color: #fff !important;
  background-color: #3e4b5b;
  border-color: #3e4b5b;
}

.img_list::-webkit-scrollbar {
  width: 3px !important; /*高宽分别对应横竖滚动条的尺寸*/
  height: 8px !important;
}

.img_list::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(23, 161, 230, 1);
  /*滚动条里面小方块*/
  //border-radius: 8px;
  background: #3e4b5b;
  background-color: skyblue;
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}

.img_list::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}

#ele-canvas {
  //opacity: 0.5;
}
</style>
