<script setup lang="ts">
import {ref, onMounted, toRaw, reactive, onBeforeUnmount} from "vue";
import * as pdfjsLib from "pdfjs-dist";
import draggable from "vuedraggable";
import {fabric} from "fabric";
import File1 from "@iconify-icons/ri/file-chart-2-fill";
import File2 from "@iconify-icons/ri/file-code-fill";
import File3 from "@iconify-icons/ri/file-copy-2-fill";
import {message} from "@/utils/message";
import {Check, Delete, Back} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";

// @ts-ignore
const workerSrc = import("pdfjs-dist/build/pdf.worker.entry");
const previewPage = ref<number[]>([]);
const preCanvasRefs = ref<HTMLCanvasElement[]>([]);
const pdfInstance = ref<any>(null);
const gaiCanvasRefs = ref<HTMLCanvasElement[]>([]);
const gaiFabric = ref([]);
const gai = reactive({
  width: 0,
  height: 0
});
const loadPdf = ref(true);

const currentPage = ref(0);

const signBoxEle = ref<HTMLDivElement>();

const pdfFilePath = "../../../../public/pdf/test.pdf";

const loadPdfToCanvas = async () => {
  try {
    //@ts-ignore
    pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
    const loadingTask = pdfjsLib.getDocument({url: pdfFilePath});
    pdfInstance.value = await loadingTask.promise;

    const totalPages = pdfInstance.value.numPages;
    previewPage.value = Array.from({length: totalPages}, (_, i) => i + 1);

    pages.value = Array.from({length: totalPages}, (_, i) => i + 1);
    for (const pageIndex of previewPage.value) {
      await renderPageToCanvas(pageIndex);
    }

    for (const pageIndex of pages.value) {
      await renderPageToCanvas(pageIndex, true);
    }
    loadPdf.value = false;
    signBoxEle.value.addEventListener("scroll", signScroll);
  } catch (error) {
    console.log(error);
    message("pdf文件加载失败", {
      type: "error"
    });
  }
};

const renderPageToCanvas = async (pageIndex: number, isSign?: boolean) => {
  if (!pdfInstance.value) return;
  const page = await toRaw(pdfInstance.value).getPage(pageIndex);
  if (isSign) {
    const viewport = page.getViewport({scale: 1});
    const canvas = document.querySelector(
      `canvas[data-index="sign_${pageIndex - 1}"]`
    ) as HTMLCanvasElement;
    if (!canvas) {
      console.error(`未找到 index 为 ${pageIndex - 1} 的 Canvas 元素`);
      return;
    }
    const gaiCanvas: HTMLCanvasElement = document.querySelector(
      `canvas[data-index="gai_${pageIndex - 1}"]`
    );
    gaiCanvas.width = viewport.width;
    gaiCanvas.height = viewport.height;

    gai.width = viewport.width;
    gai.height = viewport.height;

    gaiFabric.value.push(new fabric.Canvas(gaiCanvas));

    const context = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: context!,
      viewport: viewport
    };
    await page.render(renderContext).promise;
  } else {
    const viewport = page.getViewport({scale: 0.3});
    const canvas = document.querySelector(
      `canvas[data-index="${pageIndex - 1}"]`
    ) as HTMLCanvasElement;
    if (!canvas) {
      console.error(`未找到 index 为 ${pageIndex - 1} 的 Canvas 元素`);
      return;
    }
    const context = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const renderContext = {
      canvasContext: context!,
      viewport: viewport
    };
    await page.render(renderContext).promise;
  }
};

const signScroll = () => {
  currentPage.value = Math.floor(signBoxEle.value.scrollTop / gai.height);
};

onMounted(async () => {
  await loadPdfToCanvas();
});

onBeforeUnmount(() => {
  signBoxEle.value.removeEventListener("scroll", signScroll);
});

const pages = ref<number[]>([]);
const canvasRefs = ref<HTMLCanvasElement[]>([]);

const toPos = (index: number) => {
  signBoxEle.value.scrollTo(0, gai.height * index + index * 20 + 20);
  currentPage.value = index;
};

const sealPicList = ref([
  {
    name: "first",
    url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage109.360doc.com%2FDownloadImg%2F2024%2F06%2F1623%2F285048888_3_20240616114539450.jpeg&refer=http%3A%2F%2Fimage109.360doc.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1736932276&t=753dbbbf9c7045d1c37c6bfe2c5adf69"
  },
  {
    name: "second",
    url: "https://img0.baidu.com/it/u=4007681372,1691096817&fm=253&fmt=auto&app=138&f=JPEG?w=443&h=433"
  },
  {
    name: "third",
    url: "https://5b0988e595225.cdn.sohucs.com/images/20180613/fe6c881fa6bf42c892e1ece76f515df5.jpeg"
  },
  {
    name: "fourth",
    url: "https://img2.baidu.com/it/u=2705354531,2724935215&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
  }
]);

const sealKinds = ref([
  {
    label: "单页签章",
    icon: File1,
    type: 0,
    select: true
  },
  {
    label: "多页签章",
    icon: File2,
    type: 0,
    select: false
  },
  {
    label: "骑缝签章",
    icon: File3,
    type: 1,
    select: false
  }
]);

const sealChange = (index: number) => {
  sealKinds.value.forEach((item, iIndex) => {
    item.select = index === iIndex;
  });
};

const end = (e: any) => {
  const {newIndex} = e;
  const targetId = e.originalEvent.target.parentElement.parentElement.id;
  const targetIndex = Number(targetId.split("_")[1]);
  if (!targetIndex && targetIndex != 0) {
    return;
  }
  if (sealKinds.value.find(item => item.select).label === "多页签章") {
    for (let i = 0; i < pages.value.length; i++) {
      const gaiCanvas = gaiFabric.value[i];

      const sealImageUrl = sealPicList.value[newIndex].url;
      fabric.Image.fromURL(sealImageUrl, (img: any) => {
        img.set({
          left: e.originalEvent.layerX,
          top: e.originalEvent.layerY,
          scaleX: 0.1,
          scaleY: 0.1,
          selectable: false,
          index: e.newDraggableIndex,
          borderColor: "transparent",
          cornerColor: "transparent"
        });
        const buttonWidth = img.width! * img.scaleX!;
        const buttonHeight = 20; // 按钮高度
        const buttonX = img.left!;
        const buttonY = img.top! + img.height! * img.scaleY! + 5;
        const buttonBackground = new fabric.Rect({
          left: buttonX + buttonWidth - 22 - 20,
          top: img.top,
          width: 40,
          height: buttonHeight,
          fill: "rgba(166, 166, 166,0.5)",
          rx: 5,
          ry: 5,
          selectable: false
        });
        const buttonText = new fabric.Text("删除", {
          left: buttonX + buttonWidth - 22,
          top: img.top + buttonHeight / 2,
          fontSize: 12,
          originX: "center",
          originY: "center",
          fill: "#FFFFFF",
          selectable: false
        });
        const group = new fabric.Group([img, buttonBackground, buttonText], {
          selectable: true,
          borderColor: "transparent",
          cornerColor: "transparent",
          subTargetCheck: true
        });

        group.stateProperties = toRaw(sealPicList.value)[newIndex];

        gaiCanvas.add(group);
        limitSpace(gaiCanvas);
        gaiCanvas.on("mouse:down", event => {
          const target = event.target;
          const subTargets = event.subTargets; // 检测到的子对象

          if (target && target.type === "group" && subTargets.length > 0) {
            const clickedObject = subTargets[0];
            if (
              clickedObject.type === "rect" ||
              clickedObject.type === "text"
            ) {
              gaiCanvas.remove(target);
            }
          }
        });
      });
    }
  } else if (sealKinds.value.find(item => item.select).label === "单页签章") {
    const gaiCanvas = gaiFabric.value[targetIndex];

    const sealImageUrl = sealPicList.value[newIndex].url;
    fabric.Image.fromURL(sealImageUrl, (img: any) => {
      img.set({
        left: e.originalEvent.layerX,
        top: e.originalEvent.layerY,
        scaleX: 0.1,
        scaleY: 0.1,
        selectable: false,
        index: e.newDraggableIndex,
        borderColor: "transparent", // 隐藏默认边框
        cornerColor: "transparent" // 隐藏默认控制点
      });

      // 创建删除按钮
      const buttonWidth = img.width! * img.scaleX!; // 按钮宽度与图片一致
      const buttonHeight = 20; // 按钮高度
      const buttonX = img.left!;
      const buttonY = img.top! + img.height! * img.scaleY! + 5; // 图片正下方

      // 按钮的背景矩形
      const buttonBackground = new fabric.Rect({
        left: buttonX + buttonWidth - 22 - 20,
        top: img.top,
        width: 40,
        height: buttonHeight,
        fill: "rgba(166, 166, 166,0.5)", // 红色背景
        rx: 5, // 圆角
        ry: 5, // 圆角
        selectable: false // 不可单独选中
      });

      // 按钮的文字
      const buttonText = new fabric.Text("删除", {
        left: buttonX + buttonWidth - 22,
        top: img.top + buttonHeight / 2,
        fontSize: 12,
        originX: "center",
        originY: "center",
        fill: "#FFFFFF", // 白色文字
        selectable: false // 不可单独选中
      });

      // 将图片和按钮组合成一个组
      const group = new fabric.Group([img, buttonBackground, buttonText], {
        selectable: true, // 组合可选中
        borderColor: "transparent", // 隐藏默认边框
        cornerColor: "transparent", // 隐藏默认控制点
        subTargetCheck: true
      });

      group.stateProperties = toRaw(sealPicList.value)[newIndex];

      // 添加组到 Canvas
      gaiCanvas.add(group);
      limitSpace(gaiCanvas);
      // 监听鼠标点击事件
      gaiCanvas.on("mouse:down", event => {
        const target = event.target;
        const subTargets = event.subTargets; // 检测到的子对象

        if (target && target.type === "group" && subTargets.length > 0) {
          const clickedObject = subTargets[0];
          console.log("点击了 Group 内的对象：", clickedObject);

          if (clickedObject.type === "rect" || clickedObject.type === "text") {
            console.log("点击了删除按钮");
            gaiCanvas.remove(target); // 删除整个 Group
          }
        }
      });
    });
  } else {
    createPagingStamps(
      sealPicList.value[newIndex].url,
      pages.value.length
    ).then(() => {
      for (let i = 0; i < pages.value.length; i++) {
        const gaiCanvas = gaiFabric.value[i];

        fabric.Image.fromURL(stamps.value[i], (img: any) => {
          img.set({
            left: gai.width - img.width! / 2,
            top: e.originalEvent.layerY,
            scaleX: 0.25,
            scaleY: 0.25,
            selectable: false,
            index: e.newDraggableIndex,
            borderColor: "transparent",
            cornerColor: "transparent"
          });

          const group = new fabric.Group([img], {
            selectable: true,
            borderColor: "transparent",
            cornerColor: "transparent",
            subTargetCheck: true
          });

          group.stateProperties = toRaw(sealPicList.value)[newIndex];

          gaiCanvas.on("object:moving", options => {
            const obj = options.target;
            obj.set("left", gai.width - img.width! / 2);
            const halfHeight = (obj.height! / 2) * 0.25;

            if (obj.top! < halfHeight) {
              obj.set("top", halfHeight);
            }

            const maxTop = gaiCanvas.height - obj.height!;
            if (obj.top! > maxTop) {
              obj.set("top", maxTop);
            }
          });
          gaiCanvas.add(group);
        });
      }
    });
  }
};

const signData = ref([]);
const stamps = ref([]);

const limitSpace = (gCanvas: any) => {
  gCanvas.on("object:moving", (e: any) => {
    const obj = e.target;
    if (
      obj.currentHeight > obj.canvas.height ||
      obj.currentWidth > obj.canvas.width
    ) {
      return;
    }
    obj.setCoords();
    if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
      obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
      obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left);
    }
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

const createPagingStamps = (imageUrl: string, pageCount: number) => {
  const MAX_STAMP_COUNT = 20;
  return new Promise(resolve => {
    fabric.Image.fromURL(
      imageUrl,
      img => {
        const imgWidth = img.width!;
        const imgHeight = img.height!;
        const totalSlices = Math.min(pageCount, MAX_STAMP_COUNT);
        const stampWidth = imgWidth / totalSlices;
        const overlap = stampWidth * 0.1;
        const halfWidth = stampWidth / 2;
        stamps.value = [];
        for (let currentPage = 0; currentPage < pageCount; currentPage++) {
          const sliceIndex = currentPage % totalSlices;
          const isLastFivePages = currentPage >= pageCount - 5;
          const canvas = new fabric.Canvas(null, {
            width: isLastFivePages ? halfWidth : stampWidth,
            height: imgHeight
          });
          const clippedImage = fabric.util.object.clone(img);

          if (isLastFivePages) {
            clippedImage.set({
              left: -sliceIndex * (stampWidth - overlap) - halfWidth,
              clipTo: function (ctx) {
                ctx.rect(halfWidth, 0, halfWidth, imgHeight);
              }
            });
          } else {
            clippedImage.set({
              left: -sliceIndex * (stampWidth - overlap)
            });
          }

          canvas.add(clippedImage);
          canvas.renderAll();
          const dataUrl = canvas.toDataURL({format: "png"});
          stamps.value.push(dataUrl);
          canvas.dispose();
        }
        resolve();
      },
      {crossOrigin: "anonymous"}
    );
  });
};

const signSeal = () => {
  let signArr = [];
  // console.log(gaiFabric.value);
  for (const i in toRaw(gaiFabric.value)) {
    for (const j in toRaw(gaiFabric.value)[i].getObjects()) {
      const info = toRaw(gaiFabric.value)[i].getObjects()[j];
      // console.log(i, gaiFabric.value[i].getObjects()[j]);
      signArr.push({
        width: info.width,
        height: info.height,
        left: info.left,
        top: info.top,
        pageNum: Number(i) + 1,
        info: info.stateProperties,
        canvasWidth: gai.width,
        canvasHeight: gai.height
      });
    }
  }
  signData.value = signArr;
  console.log(signData.value);
};

const clearSignature = () => {
  gaiFabric.value.forEach(item => {
    item.remove(item.clear());
  });
};
const router = useRouter();

const gpBack = () => {
  router.push(`/SignManage`);
};
</script>

<template>
  <div class="sealContainer">
    <div class="header">
      <el-button
        round
        size="small"
        plain
        :icon="Back"
        type="info"
        class="back"
        @click="gpBack"
      >返回
      </el-button>
      <el-row>
        <el-button
          round
          :icon="Delete"
          size="small"
          plain
          type="danger"
          @click="clearSignature"
        >删除所有章
        </el-button>
        <el-button
          round
          :icon="Check"
          size="small"
          plain
          type="warning"
          @click="signSeal"
        >签章
        </el-button>
      </el-row>
    </div>
    <div class="sh-container">
      <div class="left">
        <div class="preview">缩略图预览</div>
        <div
          v-for="(_page, index) in previewPage"
          :key="index"
          class="preCanvas"
          :style="{
            background:
              currentPage === index ? `#a9aeb9` : `rgba(169, 174, 185, 0.3)`
          }"
          @click="toPos(index)"
        >
          <div>
            <h3>第{{ index + 1 }}页</h3>
            <canvas ref="preCanvasRefs" :data-index="index"/>
          </div>
        </div>
      </div>
      <div ref="signBoxEle" v-loading="loadPdf" class="signBox">
        <div
          v-for="(_page, index) in pages"
          :id="`cSign_${index}`"
          :key="index"
          class="canvas"
          :style="{ opacity: loadPdf ? 0 : 1 }"
        >
          <h3 style="padding: 3px; border-bottom-right-radius: 10px">
            第{{ index + 1 }}页
          </h3>
          <canvas
            ref="canvasRefs"
            class="pdfCanvas"
            :data-index="`sign_` + index"
          />
          <canvas
            ref="gaiCanvasRefs"
            class="gaiCanvas"
            :data-index="`gai_` + index"
          />
        </div>
      </div>
      <div class="right">
        <div class="preview">选择签署方式</div>
        <div class="sealKind">
          <div
            v-for="(item, index) in sealKinds"
            :key="item.label"
            :style="{
              backgroundColor: item.select ? `#e6e6e6` : `#f2f2f2`,
              display: `flex`,
              flexDirection: `column`,
              alignItems: `center`,
              padding: `8px`,
              borderRadius: `4px`
            }"
            class="sealKindItem"
            @click="sealChange(index)"
          >
            <IconifyIconOffline
              :icon="item.icon"
              :style="{
                color: item.select ? `#4080ff` : `#999999`,
                fontSize: `30px`
              }"
            />
            <div style="margin-top: 4px; font-size: 14px; font-weight: 500">
              {{ item.label }}
            </div>
          </div>
        </div>
        <div class="preview">选择电子印章</div>
        <div>
          <draggable
            :list="sealPicList"
            animation="300"
            style="display: flex; width: 300px; flex-wrap: wrap"
            :sort="false"
            @end="
              e => {
                end(e);
              }
            "
          >
            <template #item="{ element }">
              <div
                class="item"
                :style="{
                  marginBottom: '10px',
                  marginLeft: '10px',
                  width: `30%`
                }"
              >
                <img
                  alt="demo"
                  :src="element.url"
                  width="100%;"
                  height="100%"
                  class="sealImg"
                  :style="{
                    border: `dashed 1px #e8eef2`
                  }"
                />
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sealContainer {
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
  background-color: #e0e0eb;

  .header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    background-color: #3e4b5b;
    font-size: 20px;
    color: #fff;
    padding: 0 40px;
    align-items: center;

    .back {
    }
  }

  .sh-container {
    display: flex;
    justify-content: space-between;

    .preview {
      margin-bottom: 10px;
      margin-top: 10px;
      font-weight: 600;
      font-size: 20px;
    }

    .left {
      width: 350px;
      background-color: #ffffff;
      height: calc(100vh - 50px);
      border: 1px dotted #3e4b5b;
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      align-items: center;

      .preCanvas {
        padding: 10px;
        margin-bottom: 10px;
        background: rgba(169, 174, 185, 0.3);
        display: flex;
        flex-direction: column;

        &:hover {
          background: #a9aeb9;
        }

        h3 {
          text-align: center;
          font-weight: 500;
          font-size: 14px;
        }
      }
    }

    .signBox {
      flex: 1;
      height: calc(100vh - 50px);
      overflow-y: scroll;
      display: flex;
      align-items: center;
      flex-direction: column;

      .canvas {
        background-color: #e0e0eb;
        position: relative;
        margin-top: 20px;

        .pdfCanvas {
          position: absolute;
        }

        .gaiCanvas {
          position: absolute;
          border: 1px #a6a6a6 dashed;
          top: 0;
          left: 0;
          mix-blend-mode: multiply !important;
        }

        h3 {
          position: absolute;
          z-index: 10;
          background-color: rgb(71, 71, 108, 0.6);
          color: #fff;
        }
      }
    }

    .right {
      width: 350px;
      background-color: #ffffff;
      height: calc(100vh - 50px);
      border: 1px dotted #3e4b5b;
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      align-items: center;

      .sealKind {
        width: 100%;
        display: flex;
        justify-content: space-around;

        .sealKindItem {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
