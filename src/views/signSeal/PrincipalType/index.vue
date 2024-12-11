<script setup lang="ts">
import {onMounted, ref} from "vue"
import {useRouter} from 'vue-router';

type PrinciType = {
  change: (form: any) => void;
  tabClick: (tab: any) => void
}

const props = defineProps<PrinciType>()

const companyForm = ref<object>({
  custCreditNo: "",
  custName: "",
  juriName: "",
  juriIdType: "0",
  juriIdNo: "",
  juriTel: "",
  juriFacePath: "1865689519196520449",
  juriBackPath: "1865689519196520449",
  businessPicture: "1865689519196520449",
  isApplySeal: "1",
  sealTypes: "01,02,03,04,05"
})
const form = ref<object>({
  name: '',
  idCard: "",
  idType: '0',
  tel: "",
  facePath: "1865689519196520449",
  backPath: "1865689519196520449",
  notifyType: "",
  sealPic: "",
})


const activeName = ref('person')
</script>

<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="tabClick">
      <el-tab-pane label="个人认证" name="person">
        <el-form :model="form" label-width="auto" style="max-width: 400px">
          <el-form-item label="姓名">
            <el-input @change="change(form)" v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="个人身份证号">
            <el-input @change="change(form)" v-model="form.idCard" placeholder="请输入个人身份证号"></el-input>
          </el-form-item>
          <el-form-item label="个人实名手机号码">
            <el-input @change="change(form)" v-model="form.tel" placeholder="请输入个人实名手机号码"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="企业认证" name="company">
        <el-form :model="companyForm" label-width="auto" style="max-width: 400px">
          <el-form-item label="统一信用代码">
            <el-input @change="change(companyForm)" v-model="companyForm.custCreditNo" placeholder="请输入统一信用代码"></el-input>
          </el-form-item>
          <el-form-item label="主体名称">
            <el-input @change="change(companyForm)" v-model="companyForm.custName" placeholder="请输入主体名称"></el-input>
          </el-form-item>
          <el-form-item label="法定代表人姓名">
            <el-input @change="change(companyForm)" v-model="companyForm.juriName" placeholder="请输入法定代表人姓名"></el-input>
          </el-form-item>
          <el-form-item label="法定代表人证件号码">
            <el-input @change="change(companyForm)" v-model="companyForm.juriIdNo" placeholder="请输入法定代表人证件号码"></el-input>
          </el-form-item>
          <el-form-item label="法定代表人实名手机号码">
            <el-input @change="change(companyForm)" v-model="companyForm.juriTel" placeholder="法定代表人实名手机号码"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">

</style>
