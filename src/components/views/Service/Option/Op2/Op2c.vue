<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMainStore } from "@/store/useMainStore";
import { ArrowRight } from "@element-plus/icons-vue";
import { ref } from "vue";
import DPlayer from "dplayer";
import BackBtd from "@/components/Common/BackBtd.vue";
import { fp } from "@/utils";

type Op2cProps = {
  type: "国信公链电子印章小程序" | "国信公链电子印章签章客户端";
};

let dp: DPlayer;

const { isMobile } = storeToRefs(useMainStore());

const show = ref(false);

const list1 = [
  {
    label: "企业单位使用小程序申领电子印章",
    src: "https://oos-hbwh.ctyunapi.cn/m-d/static/%E4%BC%81%E4%B8%9A%E5%8D%95%E4%BD%8D%E4%BD%BF%E7%94%A8%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%94%B3%E9%A2%86%E7%94%B5%E5%AD%90%E5%8D%B0%E7%AB%A0.mp4?Signature=LVW6pkJ/Vd0MIFYFpw4foiFNSC4%3D&AWSAccessKeyId=builtIn%7C1592404319406913339&Expires=2572331992&t=1716188725054"
  },
  {
    label: "事业单位使用小程序申领电子印章",
    src: "https://oos-hbwh.ctyunapi.cn/m-d/static/%E4%BA%8B%E4%B8%9A%E5%8D%95%E4%BD%8D%E4%BD%BF%E7%94%A8%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%94%B3%E9%A2%86%E7%94%B5%E5%AD%90%E5%8D%B0%E7%AB%A0.mp4?Signature=2SQsCugON1s/VkvliRdMBTqEHvI%3D&AWSAccessKeyId=builtIn%7C1592404319406913339&Expires=2572399450&t=1716188725054"
  },
  {
    label: "个人使用小程序申领个人私章",
    src: "https://oos-hbwh.ctyunapi.cn/m-d/static/%E4%BD%BF%E7%94%A8%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%94%B3%E9%A2%86%E4%B8%AA%E4%BA%BA%E7%94%B5%E5%AD%90%E7%A7%81%E7%AB%A0.mp4?Signature=aKpVuIreVEebW4lWUq6IepfhNgk%3D&AWSAccessKeyId=builtIn%7C1592404319406913339&Expires=2572332135&t=1716190389892"
  },
  {
    label: "使用小程序完成合同签署",
    src: "https://oos-hbwh.ctyunapi.cn/m-d/static/%E4%BD%BF%E7%94%A8%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%AE%8C%E6%88%90%E5%90%88%E5%90%8C%E7%AD%BE%E7%BD%B2.mp4?Signature=8buGcmbPc79xO71tKcsqZNr4b3g%3D&AWSAccessKeyId=builtIn%7C1592404319406913339&Expires=2572332099&t=1716188725054"
  },
  {
    label: "使用小程序验证文档",
    src: "https://oos-hbwh.ctyunapi.cn/m-d/static/%E4%BD%BF%E7%94%A8%E5%B0%8F%E7%A8%8B%E5%BA%8F%E9%AA%8C%E8%AF%81%E6%96%87%E6%A1%A3.mp4?Signature=uGqdh66HCmT0s98DPDhanZ0NqJM%3D&AWSAccessKeyId=builtIn%7C1592404319406913339&Expires=2572332068&t=1716188725054"
  }
];

const list2 = [
  {
    label: "签章客户端软件安装步骤",
    src: "https://oos-hbwh.ctyunapi.cn/m-d/static/make/1.%E7%AD%BE%E7%AB%A0%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%BD%AF%E4%BB%B6%E5%AE%89%E8%A3%85%E6%AD%A5%E9%AA%A4.mp4?Signature=d%2BFrYZosbT3akyBZD1CGBE6uWuI%3D&AWSAccessKeyId=builtIn%7C1592404319406913339&Expires=1803178323&t=1717641783354"
  },
  {
    label: "签章客户端如何签署文档",
    src: "https://oos-hbwh.ctyunapi.cn/m-d/static/make/2.%E7%AD%BE%E7%AB%A0%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%A6%82%E4%BD%95%E7%AD%BE%E7%BD%B2%E6%96%87%E6%A1%A3.mp4?Signature=zbGrv4UtnDGRpbvFjxcgiOdX4u4%3D&AWSAccessKeyId=builtIn%7C1592404319406913339&Expires=1803178351&t=1717641783354"
  },
  {
    label: "签章客户端如何验证文档",
    src: "https://oos-hbwh.ctyunapi.cn/m-d/static/make/3.%E7%AD%BE%E7%AB%A0%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%A6%82%E4%BD%95%E9%AA%8C%E8%AF%81%E6%96%87%E6%A1%A3.mp4?Signature=O/0cgHRgSAIJq9pGpPFeqCgOB/Q%3D&AWSAccessKeyId=builtIn%7C1592404319406913339&Expires=1803178395&t=1717641783354"
  },
  {
    label: "签章客户端续期步骤",
    src: "https://oos-hbwh.ctyunapi.cn/m-d/static/make/4.%E7%AD%BE%E7%AB%A0%E5%AE%A2%E6%88%B7%E7%AB%AF%E7%BB%AD%E6%9C%9F%E6%AD%A5%E9%AA%A4.mp4?Signature=jdwCnE62QU4trOm%2BW1YlqcAmTAQ%3D&AWSAccessKeyId=builtIn%7C1592404319406913339&Expires=1803178413&t=1717641783354"
  }
];

const props = defineProps<Op2cProps>();

const getList = () => {
  if (props.type == "国信公链电子印章小程序") {
    return list1;
  }
  return list2;
};

const model = ref({
  label: "",
  src: ""
});

const seeVideo = (item: any) => {
  if (dp) {
    dp.destroy();
  }
  model.value = item;
  show.value = true;
  setTimeout(() => {
    dp = new DPlayer({
      container: document.getElementById(
        props.type == `国信公链电子印章小程序` ? "dp" : "dp2"
      ),
      video: {
        url: item.src
      }
    });
  });
};
</script>

<template>
  <div
    :class="{
      op2c: !isMobile,
      op2cM: isMobile
    }"
  >
    <div
      v-for="(item, index) in getList()"
      :key="index"
      class="item"
      @click="seeVideo(item)"
    >
      <div class="sub">
        <img alt="desc" :src="fp('service/icovideo.png')" />
        <div>{{ item.label }}</div>
      </div>
      <el-icon>
        <ArrowRight />
      </el-icon>
    </div>
    <el-dialog v-model="show" align-center fullscreen>
      <template #title>
        <div>
          <back-btd @click="() => (show = false)" />
          <h1 style="text-align: center">{{ model.label }}</h1>
        </div>
      </template>
      <template #default>
        <div class="dialog-content">
          <div v-if="type === `国信公链电子印章小程序`" id="dp" />
          <div v-else id="dp2" />
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.op2c {
  .dialog-content {
    display: flex;
    justify-content: center;
    align-items: center;

    #dp,
    #dp2 {
      width: 70vw;
      //height: 70vw;
    }
  }

  .item {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eeeeee;
    padding: 15px 5px;
    cursor: pointer;
    font-weight: 500;

    &:hover {
      color: #1d76f9;
    }

    .sub {
      display: flex;
      align-items: center;

      img {
        margin-right: 18px;
      }
    }
  }
}

.op2cM {
  .dialog-content {
    display: flex;
    justify-content: center;
    align-items: center;

    #dp,
    #dp2 {
      width: 70vw;
      //height: 70vw;
    }
  }

  .item {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eeeeee;
    padding: 10px 2.5px;
    cursor: pointer;
    font-weight: 500;

    &:hover {
      color: #1d76f9;
    }

    .sub {
      display: flex;
      align-items: center;

      img {
        margin-right: 18px;
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
