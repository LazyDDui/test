<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import ShUpload from "@/views/components/shUpload/index.vue";
import {SealTypeMap} from "@/utils/map";

type PrinciType = {
  change: (form: any) => void;
  tabClick: (tab: any) => void;
};

const props = defineProps<PrinciType>();

const companyForm = ref({
  custCreditNo: "",
  custName: "",
  juriName: "",
  juriIdType: "0",
  juriIdNo: "",
  juriTel: "",
  juriFacePath: "",
  juriBackPath: "",
  businessPicture: "",
  isApplySeal: "",
  sealTypes: ""
});
const form = ref({
  name: "",
  idCard: "",
  idType: "0",
  tel: "",
  facePath: "",
  backPath: "",
  notifyType: "",
  sealPic: ""
});

const activeName = ref("person");
</script>

<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="tabClick">
      <el-tab-pane class="content" label="个人认证" name="person">
        <el-form :model="form" label-width="auto" style="max-width: 400px">
          <el-form-item label="姓名">
            <el-input
              v-model="form.name"
              placeholder="请输入姓名"
              @change="change(form)"
            />
          </el-form-item>
          <el-form-item label="个人身份证号">
            <el-input
              v-model="form.idCard"
              placeholder="请输入个人身份证号"
              @change="change(form)"
            />
          </el-form-item>
          <el-form-item label="个人实名手机号码">
            <el-input
              v-model="form.tel"
              placeholder="请输入个人实名手机号码"
              @change="change(form)"
            />
          </el-form-item>
          <el-form-item label="身份证正面">
            <ShUpload
              @change="
                id => {
                  form.facePath = id;
                }
              "
            />
          </el-form-item>
          <el-form-item label="身份证反面">
            <ShUpload
              @change="
                id => {
                  form.backPath = id;
                }
              "
            />
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane class="content" label="企业认证" name="company">
        <el-form
          :model="companyForm"
          label-width="auto"
          style="max-width: 400px"
        >
          <el-form-item label="统一信用代码">
            <el-input
              v-model="companyForm.custCreditNo"
              placeholder="请输入统一信用代码"
              @change="change(companyForm)"
            />
          </el-form-item>
          <el-form-item label="主体名称">
            <el-input
              v-model="companyForm.custName"
              placeholder="请输入主体名称"
              @change="change(companyForm)"
            />
          </el-form-item>
          <el-form-item style="display: flex;flex-wrap: wrap;width: 200px;" label="印章类型">
            <el-radio @change="change(companyForm)" v-for="(item,index) in Array.from(SealTypeMap)" :key="index" v-model="companyForm.sealTypes"
                      :value="item[0]">{{ item[1] }}
            </el-radio>
          </el-form-item>
          <el-form-item label="法定代表人姓名">
            <el-input
              v-model="companyForm.juriName"
              placeholder="请输入法定代表人姓名"
              @change="change(companyForm)"
            />
          </el-form-item>
          <el-form-item label="法定代表人证件号码">
            <el-input
              v-model="companyForm.juriIdNo"
              placeholder="请输入法定代表人证件号码"
              @change="change(companyForm)"
            />
          </el-form-item>
          <el-form-item label="法定代表人实名手机号码">
            <el-input
              v-model="companyForm.juriTel"
              placeholder="法定代表人实名手机号码"
              @change="change(companyForm)"
            />
          </el-form-item>
          <el-form-item label="身份证正面">
            <ShUpload
              @change="
                id => {
                  companyForm.juriFacePath = id;
                }
              "
            />
          </el-form-item>
          <el-form-item label="身份证反面">
            <ShUpload
              @change="
                id => {
                  companyForm.juriBackPath = id;
                }
              "
            />
          </el-form-item>
          <el-form-item label="营业执照">
            <ShUpload
              @change="
                id => {
                  companyForm.businessPicture = id;
                }
              "
            />
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
.content {
  height: 400px;
  overflow-y: scroll;
}
</style>
