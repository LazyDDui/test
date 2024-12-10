<script setup lang="ts">

</script>

<template>
  <div class="Shcontainer">
    <div class="flex">
      <el-card style="min-width: 480px">
        <template #header>
          <div class="card-header">
            <h2>我的api</h2>
          </div>
        </template>
        <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
      </el-card>
      <el-card style="min-width: 480px">
        <template #header>
          <div class="card-header">
            <h2>调用次数</h2>
          </div>
        </template>
        <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
      </el-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.Shcontainer {
  padding: 20px;
  .flex {
    display: flex;
    justify-content: space-around;
  }
}
</style>