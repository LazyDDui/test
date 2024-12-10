<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useMainStore} from "@/store/useMainStore";

type ShContainer = {
  width?: number;
  isMob?: boolean;
}
const {screen, deviceInfo} = storeToRefs(useMainStore())
defineProps<ShContainer>()

</script>

<template>
  <div class="sh-container" :style="{width:isMob?`${deviceInfo.width - (width?width:20)}px`:`${screen.width - (width?width:200)}px`}">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.sh-container {
  margin: 0 auto;
}
</style>
