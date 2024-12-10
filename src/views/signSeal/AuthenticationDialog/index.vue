<script setup lang="ts">
import {h, reactive, ref, toRaw} from "vue";
import Btn from "@/views/signSeal/AuthenticationDialog/btn/index.vue";
import {addDialog} from "@/components/ReDialog/index";
import SignManagePageList from "@/views/signSeal/SignManage/PageList/index.vue";
import PrincipalType from "@/views/signSeal/PrincipalType/index.vue"
import {personSign, companySign, userAuthentication, changeAuthentication, getCurrentAuthentication} from "@/api/test";
import {useSeal} from "@/store/useSeal";
import {storeToRefs} from "pinia";

const {setAuth} = useSeal()
const {auth} = storeToRefs(useSeal())
type ShTable = {
  cols: TableColumnList;
  tableData: any[];
  total: number;
};

const props = defineProps<ShTable>();
const personData = ref<object>()
const columns: TableColumnList = [
  {
    label: "名称",
    prop: "authenticationName"
  },
  {
    label: "类型",
    prop: "type"
  },
  {
    label: "操作",
    cellRenderer(data) {
      return h(Btn, {
        cgClick: async () => {
          const res = await changeAuthentication(data.row.id)
          console.log('切换', res)
          const res2 = await getCurrentAuthentication()
          setAuth(res2.data)
          console.log('res2', res2)
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
      console.log('参数', personData.value)
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
    <div>
    </div>
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
