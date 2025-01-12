<script setup lang="ts">
import {ref, watch} from "vue";

type LoadingProps = {
  loading: boolean;
  text?: string;
}
defineOptions({
  name: "Loading"
})
const props = defineProps<LoadingProps>()
const load = ref(props.loading)

watch(()=>props.loading,(value)=>{
  load.value = value
})

import {fp} from "@/utils";
</script>

<template>
  <el-dialog v-model="load" width="300" align-center>
    <div style="text-align: center;display: flex;flex-direction: column;align-items: center">
      <img alt="loading" :src="fp('verify/loading.96e04459.gif')"/>
      <div v-if="text">{{ text }}</div>
    </div>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>
