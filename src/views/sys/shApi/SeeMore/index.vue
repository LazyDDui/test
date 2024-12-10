<script setup lang="ts">
type SeeMoreProps = {
  c: string;
};

const props = defineProps<SeeMoreProps>();
</script>

<template>
  <div class="innerBox">
    <div>
      {{ c }}
    </div>
    <el-button size="small" type="text">查看</el-button>
  </div>
</template>

<style scoped lang="scss">
.innerBox {
  white-space: nowrap;
}
</style>
