<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { SealTypeMap } from "@/utils/map";
import Header from "@/components/Common/Header.vue";
import ShImageUpload from "@/views/components/shImageUpload/index.vue";

type PrinciType = {
  change: (form: any) => void;
  tabClick: (tab: any) => void;
};

const staticValue = ref("1");
const companyStaticValue = ref("0");

const props = defineProps<PrinciType>();

const initialPersonForm = {
  idType: "0",
  //姓名
  name: "",
  //手机
  tel: "",
  //身份证号
  idCard: "",
  //住址
  address: "",
  facePath: "",
  backPath: ""
};

const initialCompanyForm = {
  responsibilityIdType: "0",
  operatorIdType: "0",
  // 单位类型 0:一般企业，1：事业单位
  unitType: "",
  //单位名称
  custName: "成都泰和瑞祥科技有限公司",
  //统一信用代码
  custCreditNo: "91510100MA6CPCRP4G",
  //住址
  address: "",
  //营业执照/证书/文件
  businessPicture: "",
  //法定代表人姓名
  juriName: "洪峰",
  //法定代表人手机号
  juriTel: "18183279409",
  //法定代表人证件号码
  juriIdNo: "422130197803190131",
  //法定代表人身份证正面照存储标识
  juriFacePath: "",
  //法定代表人身份证反面照存储标识
  juriBackPath: "",
  //经办人姓名
  operatorName: "",
  //经办人实名手机号码
  operatorTel: "",
  //经办人证件号码
  operatorIdNo: "",
  juriIdType: "0"
};

const companyForm = ref(initialCompanyForm);
const form = ref(initialPersonForm);

const activeName = ref("person");

const clear = (isPerson: boolean) => {
  if (isPerson) {
    form.value = initialPersonForm;
  } else {
    companyForm.value = initialCompanyForm;
  }
};

defineExpose({
  clear
});
</script>

<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="tabClick">
      <el-tab-pane class="content" label="个人认证" name="person">
        <el-form :model="form" label-width="auto">
          <h2>信息录入</h2>
          <el-form-item label="办理人员：">
            <el-radio-group v-model="staticValue">
              <el-radio value="1" size="large">本人</el-radio>
            </el-radio-group>
          </el-form-item>
          <h2>个人信息</h2>
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名：">
                <el-input
                  v-model="form.name"
                  placeholder="请输入姓名"
                  @change="change(form)"
                />
              </el-form-item>
              <el-form-item label="个人身份证号：">
                <el-input
                  v-model="form.idCard"
                  placeholder="请输入个人身份证号"
                  @change="change(form)"
                />
              </el-form-item>
              <el-form-item label="个人实名手机号码：">
                <el-input
                  v-model="form.tel"
                  placeholder="请输入个人实名手机号码"
                  @change="change(form)"
                />
              </el-form-item>
              <el-form-item label="个人地址：">
                <el-input
                  v-model="form.address"
                  placeholder="请输入个人地址"
                  @change="change(form)"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12" style="display: flex">
              <el-form-item>
                <div
                  style="
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    margin-right: 20px;
                  "
                >
                  <ShImageUpload
                    @change="
                      id => {
                        form.facePath = id;
                      }
                    "
                  />
                  <div>身份证正面</div>
                </div>
              </el-form-item>
              <el-form-item>
                <div
                  style="
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                  "
                >
                  <ShImageUpload
                    @change="
                      id => {
                        form.backPath = id;
                      }
                    "
                  />
                  <div>身份证反面</div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane class="content" label="企业认证" name="company">
        <el-form :model="companyForm" label-width="auto">
          <h2>信息录入</h2>
          <el-form-item label="企业类型：">
            <el-radio-group v-model="companyForm.unitType">
              <el-radio value="0" size="large">企业单位</el-radio>
              <el-radio value="1" size="large">事业单位</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="办理人员：">
            <el-radio-group v-model="companyStaticValue">
              <el-radio value="0" size="large">法定代表人</el-radio>
              <el-radio value="1" size="large">经办人</el-radio>
            </el-radio-group>
          </el-form-item>
          <h2>单位信息</h2>
          <el-row>
            <el-col :span="12">
              <el-form-item label="单位名称：">
                <el-input
                  v-model="companyForm.custName"
                  placeholder="请输入单位名称"
                  @change="change(companyForm)"
                />
              </el-form-item>
              <el-form-item label="统一信用代码：">
                <el-input
                  v-model="companyForm.custCreditNo"
                  placeholder="请输入统一信用代码"
                  @change="change(companyForm)"
                />
              </el-form-item>
              <el-form-item label="住址：">
                <el-input
                  v-model="companyForm.address"
                  placeholder="请输入住址"
                  @change="change(companyForm)"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <div
                  style="
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                  "
                >
                  <ShImageUpload
                    @change="
                      id => {
                        companyForm.businessPicture = id;
                      }
                    "
                  />
                  <div>营业执照/证书/文件</div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <h2>法定代表人信息</h2>
          <el-row>
            <el-col :span="12">
              <el-form-item label="法定代表人姓名：">
                <el-input
                  v-model="companyForm.juriName"
                  placeholder="请输入法定代表人姓名"
                  @change="change(companyForm)"
                />
              </el-form-item>
              <el-form-item label="法定代表人手机号：">
                <el-input
                  v-model="companyForm.juriTel"
                  placeholder="请输入法定代表人手机号"
                  @change="change(companyForm)"
                />
              </el-form-item>
              <el-form-item label="法定代表人身份证号：">
                <el-input
                  v-model="companyForm.juriIdNo"
                  placeholder="请输入法定代表人身份证号"
                  @change="change(companyForm)"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12" style="display: flex">
              <el-form-item style="margin-right: 20px">
                <div
                  style="
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                  "
                >
                  <ShImageUpload
                    @change="
                      id => {
                        companyForm.juriFacePath = id;
                      }
                    "
                  />
                  <div>法人身份证人像面</div>
                </div>
              </el-form-item>
              <el-form-item>
                <div
                  style="
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                  "
                >
                  <ShImageUpload
                    @change="
                      id => {
                        companyForm.juriBackPath = id;
                      }
                    "
                  />
                  <div>法人身份证国徽面</div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <template v-if="companyStaticValue == '1'">
            <h2>经办人信息</h2>
            <el-row>
              <el-col :span="12">
                <el-form-item label="经办人姓名：">
                  <el-input
                    v-model="companyForm.operatorName"
                    placeholder="请输入经办人姓名"
                    @change="change(companyForm)"
                  />
                </el-form-item>
                <el-form-item label="经办人手机号：">
                  <el-input
                    v-model="companyForm.operatorTel"
                    placeholder="请输入经办人手机号"
                    @change="change(companyForm)"
                  />
                </el-form-item>
                <el-form-item label="经办人身份证号：">
                  <el-input
                    v-model="companyForm.operatorIdNo"
                    placeholder="请输入经办人身份证号"
                    @change="change(companyForm)"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12" style="display: flex">
                <el-form-item style="margin-right: 20px">
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <ShImageUpload
                      @change="
                        id => {
                          form.backPath = id;
                        }
                      "
                    />
                    <div>经办人身份证人像面</div>
                  </div>
                </el-form-item>
                <el-form-item>
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                    "
                  >
                    <ShImageUpload
                      @change="
                        id => {
                          form.backPath = id;
                        }
                      "
                    />
                    <div>经办人身份证国徽面</div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
.content {
  height: 500px;
  overflow-y: scroll;
}
.el-form-item {
  align-items: center;
  margin-bottom: 4px !important;
}
h2 {
  width: 100%;
  font-weight: 600;
  border-bottom: 0.1px solid #9ca3af;
  margin-bottom: 4px;
  color: black;
}
.el-input {
  width: 200px;
}
</style>
