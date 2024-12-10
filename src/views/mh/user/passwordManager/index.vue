<script setup lang="ts">


const form = ref<object>({
  name: ''
})
const tableData = ref<Array>([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
])
</script>

<template>
  <div class="Shcontainer">
    <el-form :model="form" inline label-width="auto" style="max-width: 300px">
      <el-form-item label="">
        <el-input v-model="form.name" placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table border :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="Date" width="180"/>
      <el-table-column prop="name" label="Name" width="180"/>
      <el-table-column prop="address" label="Address"/>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination background layout="prev, pager, next" :total="1000" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.Shcontainer {
  padding: 20px;
}
</style>