<script setup lang="ts">
import {addDialog} from "@/components/ReDialog/index";

type SeeMoreProps = {
  c: string;
};

const props = defineProps<SeeMoreProps>();

const btn = () => {
  addDialog({
    title:'查看',
    contentRenderer({ options, index }) {
        return 'wwww'
    },
  })
}
</script>

<template>
  <div class="innerBox">
    <div>
      {{ c }}
    </div>
    <el-button  size="small" type="text" @click="btn">查看</el-button>
  </div>
</template>

<style scoped lang="scss">
.innerBox {
  white-space: nowrap;
}
</style>
