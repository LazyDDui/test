<script setup lang="ts">
import {ref, onMounted, toRaw} from 'vue';
import * as pdfjsLib from 'pdfjs-dist';
import draggable from "vuedraggable";
import {v4 as uuidv4} from "uuid";
import {fp} from "@/utils";

pdfjsLib.GlobalWorkerOptions.workerSrc = fp("pdf/pdf.worker.js");

type StampEntry = {
  info: {
    name: string;
    url: string
  };
  left: number;
  top: number;
  uid: string;
  page: number;
}

type MPdfProps = {
  pdfUrl: string;
}

const props = defineProps<MPdfProps>()

const pdfCanvas = ref<HTMLCanvasElement | null>(null);
const currentPage = ref(1);
const totalPages = ref(0);
let pdfDocument: pdfjsLib.PDFDocumentProxy | null = null;
const stampList = ref<StampEntry[]>([])

const loadPdf = async (url: string) => {
  try {
    const loadingTask = pdfjsLib.getDocument(url);
    pdfDocument = await loadingTask.promise;
    totalPages.value = pdfDocument.numPages;
    renderPage(currentPage.value);
  } catch (error) {
    console.error('Error loading PDF:', error);
  }
};

const renderPage = async (num: number) => {
  if (!pdfDocument || !pdfCanvas.value) return;

  try {
    const page = await pdfDocument.getPage(num);
    const viewport = page.getViewport({scale: 1}); // scale 设置为 1，方便计算实际比例
    const canvasContext = pdfCanvas.value.getContext('2d');

    if (!canvasContext) return;

    // 根据设备宽度动态计算缩放比例
    const scale = window.innerWidth / viewport.width;
    pdfCanvas.value.width = window.innerWidth; // 画布宽度设置为设备宽度
    pdfCanvas.value.height = viewport.height * scale; // 根据比例计算画布高度

    const renderContext = {
      canvasContext,
      viewport: page.getViewport({scale}) // 使用计算后的缩放比例
    };

    // 渲染 PDF 页面
    await page.render(renderContext).promise;
  } catch (error) {
    console.error('Error rendering page:', error);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    renderPage(currentPage.value);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    renderPage(currentPage.value);
  }
};

onMounted(() => {
  if (pdfCanvas.value) {
    // 替换为你的PDF文件URL
    loadPdf(props.pdfUrl);
  }
});

const sealPicList = ref([
  {
    name: "first",
    url: "https://img95.699pic.com/xsj/05/bq/xf.jpg%21/fh/300"
  },
  {
    name: "second",
    url: "https://img2.baidu.com/it/u=2705354531,2724935215&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
  }
]);

const end = (e: {
  originalEvent: TouchEvent;
  newIndex: number;
}) => {
  console.log(e)
  const pageX = parseInt(e.originalEvent.changedTouches[0].pageX as unknown as string)
  const pageY = parseInt(e.originalEvent.changedTouches[0].pageY as unknown as string)
  const uid = uuidv4()
  if (stampType.value[0].active) {
    stampList.value.push({
      info: toRaw(sealPicList.value)[e.newIndex],
      left: pageX,
      top: pageY,
      uid: uid,
      page: currentPage.value
    })
  } else if (stampType.value[1].active) {
    for (let i = 1; i <= totalPages.value; i++) {
      stampList.value.push({
        info: toRaw(sealPicList.value)[e.newIndex],
        left: pageX,
        top: pageY,
        uid: uid,
        page: i
      })
    }
  } else {

  }

}


const drag = (e: {
  originalEvent: TouchEvent;
  newIndex: number;
}, uid: string) => {
  const pageX = parseInt(e.originalEvent.changedTouches[0].pageX as unknown as string)
  const pageY = parseInt(e.originalEvent.changedTouches[0].pageY as unknown as string)
  stampList.value.forEach((item) => {
    if (item.page === currentPage.value && item.uid == uid) {
      item.left = pageX
      item.top = pageY
    }
  })
}

const removeStamp = (uid: string) => {
  const index = stampList.value.findIndex((item) => {
    return item.page === currentPage.value && item.uid == uid
  })
  stampList.value.splice(index, 1)
}

const stampType = ref([
  {
    label: "单页签章",
    active: true,
  },
  {
    label: "多页签章",
    active: false,
  },
  {
    label: "骑缝章签章",
    active: false,
  }
])

const changeType = (index: number) => {
  stampType.value.forEach((item, i) => {
    item.active = i === index;
  })
}


</script>
<template>
  <div class="pdf-viewer">
    <div class="shGai">
      <el-button type="text" class="leftBtn" size="small" @touchstart="prevPage" :disabled="currentPage === 1">
        ◀
      </el-button>
      <el-button type="text" class="rightBtn" size="small" @touchstart="nextPage"
                 :disabled="currentPage === totalPages">▶
      </el-button>
      <div class="pageDetail">{{ currentPage }}/{{ totalPages }}</div>
      <canvas ref="pdfCanvas"></canvas>
      <draggable
        :item-key="item.uid"
        :style="{left:`calc(${item.left}px - 7.5vw)`,top:`calc(${item.top}px - 7.5vw)`,position: 'absolute',display:'inline-block'}"
        :sort="false"
        @end="drag($event,item.uid)"
        :list="[item]"
        :animation="300"
        :key="item.uid"
        v-for="(item) in stampList"
      >
        <template #item>
          <div v-if="item.page == currentPage" style="position: relative;display: inline-block">
            <div @touchstart="removeStamp(item.uid)"
                 style="z-index: 30;font-size: 3vw;color:red;position: absolute;top: 0;right:0;" size="small"
                 type="text">❌
            </div>
            <img style="width:15vw;height:15vw;mix-blend-mode: multiply !important;" :alt="item.uid"
                 :src="item.info.url"/>
          </div>
        </template>
      </draggable>
      <!--      <div :key="item.uid" v-for="(item) in stampList"-->
      <!--           :style="{left:`calc(${item.left}px - 15vw)`,top:`calc(${item.top}px - 7.5vw)`,position: 'absolute',display:'inline-block'}">-->
      <!--        <img draggable="true"  v-if="item.page == currentPage" style="width:15vw;height:15vw;" :alt="item.uid" :src="item.info.url"/>-->
      <!--      </div>-->
    </div>

    <div class="pageBtn">
      <el-button @touchstart="changeType(index)" v-for="(item,index) in stampType" :type="item.active?'success':'info'"
                 :key="index" size="small">{{ item.label }}
      </el-button>
    </div>
    <div class="stampList">
      <div class="title">我的印章</div>
      <draggable
        :sort="false"
        :list="sealPicList"
        :animation="300"
        style="display: flex; width: 100vw; flex-wrap: wrap;height: 15vh;overflow-y: scroll"
        @end="end"
      >
        <template #item="{ element }">
          <div
            class="item"
            :style="{
                  marginBottom: '2vw',
                  marginLeft: '2vw',
                  width: `15vw`,
                  height:`15vw`
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
</template>

<style scoped lang="scss">
.pdf-viewer {
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  .leftBtn {
    position: absolute;
    top: 40vh;
    left: 0.5vw;
    font-size: 4vw;
  }

  .rightBtn {
    position: absolute;
    top: 40vh;
    right: 0.5vw;
    font-size: 4vw;
  }

  .shGai {
    position: relative;
    overflow: hidden;

    .pageDetail {
      position: absolute;
      right: 4vw;
      top: 4vh;
      color: #fff;
      background-color: rgba(62, 75, 91, .5);
      padding: 0.1vw 2vw;
      font-size: 5vw;
      border-radius: 1vw;
    }

    .stampList {
      position: absolute;

    }
  }

  .pageBtn {
    position: absolute;
    top: 72vh;
  }

  .stampList {
    background-color: #ffffff;
    width: 100vw;
    height: 20vh;
    position: fixed;
    bottom: 0;
    left: 0;
    //transform: translateY(-50%);
    z-index: 100;
    color: black;

    .title {
      display: flex;
      width: 100%;
      justify-content: center;
      font-size: 2.5vh;
      font-weight: 500;
    }
  }
}

button {
  margin: 5px;
}

canvas {
  border: 1px solid #ccc;
  box-sizing: border-box;
}
</style>
