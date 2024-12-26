<script setup lang="ts">
import { useSeal } from "@/store/useSeal";
import { useRouter } from "vue-router";

type BtnProps = {
  dwClick: () => void;
  // detailClick: () => void;
  delClick: () => void;
  canDownload: boolean;
  data: any;
};
const { setFileId, setSealInfo,setDocName } = useSeal();
const router = useRouter();

const props = defineProps<BtnProps>();

const reSign = () => {
  setFileId(props.data.srcFileId);
  setSealInfo({
    appno: props.data.id
  });
  setDocName(props.data.docName)
  setTimeout(() => {
    router.push("/pdf");
  });
};

console.log(props.data);
</script>

<template>
  <el-row>
    <el-button
      v-if="data.status == '2'"
      size="small"
      type="primary"
      plain
      @click="reSign"
    >
      重新签署
    </el-button>
    <el-button
      v-else
      :disabled="!canDownload"
      size="small"
      type="text"
      @click="dwClick"
      >下载</el-button
    >
    <!--    <el-button size="small" type="success" @click="detailClick">详情</el-button>-->
    <el-button plain round size="small" type="danger" @click="delClick"
      >删除</el-button
    >
  </el-row>
</template>

<style scoped lang="scss"></style>
