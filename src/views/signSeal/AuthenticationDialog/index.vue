<script setup lang="ts">

type table = {
  cols: TableColumnList;
  tableData: any[];
  total: number;
};

const props = defineProps<table>();
</script>

<template>
  <div>
    {{ tableData }}
    <pure-table :data="table.tableData" :col="table.cols"></pure-table>
  </div>
</template>

<style scoped lang="scss">

</style>
