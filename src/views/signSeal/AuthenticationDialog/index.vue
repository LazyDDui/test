<script setup lang="ts">
import {h, reactive, ref} from "vue";
import {tableData} from "@/views/table/base/data";
import Btn from "@/views/signSeal/AuthenticationDialog/btn/index.vue";
import {addDialog} from "@/components/ReDialog/index";
import SignManagePageList from "@/views/signSeal/SignManage/PageList/index.vue";
import PrincipalType from "@/views/signSeal/PrincipalType/index.vue"
import {personSign} from "@/api/test";


const personData = ref<object>()
const columns: TableColumnList = [
  {
    label: "名称",
    prop: "date"
  },
  {
    label: "类型",
    prop: "name"
  },
  {
    label: "操作",
    cellRenderer(data) {
      return h(Btn, {
        cgClick: () => {
          console.log(data);
        },
      });
    },
    align: "center"
  }
];
const currentChange = e => {
  console.log(e);
};
const addAuthentication = () => {
  addDialog({
    title: "主体类型",
    contentRenderer: () => h(PrincipalType, {
      change: (form) => {
        console.log(form)
        personData.value = form
      },
      tabClick: (tab) => {
        console.log(tab.props.name)
      }
    }),
    async beforeSure(done) {
      console.log('参数', personData)
      const res = await personSign(personData.value)
      if (res.code == '00') {
        ElMessage({
          message: '认证成功',
          type: 'success',
        })
      } else {
        ElMessage({
          message: res.message,
          type: 'error',
        })
      }
      form.value.forEach(item => {
        item.value = null; // 否则，将 value 设置为空字符串
      });
      done()
    }
  })
}
</script>

<template>
  <div>
    <el-button size="small" type="primary" @click="addAuthentication">新增认证</el-button>
    <pure-table style="margin-top: 20px" :data="tableData" :columns="columns"/>
    <el-row style="margin-top: 20px; justify-content: flex-end; width: 100%">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        @current-change="currentChange"
      />
    </el-row>
  </div>
</template>

<style scoped lang="scss">

</style>
