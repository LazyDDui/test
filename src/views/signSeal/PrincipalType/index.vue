<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {SealTypeMap} from "@/utils/map";
import Header from "@/components/Common/Header.vue";
import ShImageUpload from "@/views/components/shImageUpload/index.vue";
import {FormRules} from "element-plus";
import {useRenderIcon} from "@/components/ReIcon/src/hooks";
import {message} from "@/utils/message";
import {useVerifyCode} from "@/views/login/utils/verifyCode";
import {useI18n} from "vue-i18n";
import {v4 as uuidv4} from "uuid";
import {getUserGraphCode, getUserSmsCodeApi} from "@/api/test";
import {storeToRefs} from "pinia";
import {useSeal} from "@/store/useSeal";

type PrinciType = {
  change: (form: any) => void;
  tabClick: (tab: any) => void;
  isPerson: boolean;
};

const {auth, userInfo} = storeToRefs(useSeal())
const {t} = useI18n();
const staticValue = ref("1");
const companyStaticValue = ref("0");
const {isDisabled, text} = useVerifyCode();
const graphCode = ref("")
const graphCodeCompany = ref("")
const imageCodeComPany = ref("")
const imageCode = ref("")
const personRef = ref()
const companyRef = ref()


const props = defineProps<PrinciType>();

const initialPersonForm = {
  idType: "0",
  //姓名
  name: "",
  //手机
  tel: userInfo.value.user_info.phone,
  //身份证号
  idCard: "",
  //住址
  address: "",
  facePath: "",
  backPath: "",
  // smsCode: ""
};

console.log(initialPersonForm)

// const initialCompanyForm = {
//   responsibilityIdType: "0",
//   operatorIdType: "0",
//   // 单位类型 0:一般企业，1：事业单位
//   unitType: "0",
//   //单位名称
//   custName: "郫都区一辰卷饼餐饮服务部(个体工商户)",
//   //统一信用代码
//   custCreditNo: "92510124MAD1WQ023U",
//   //住址
//   address: "四川省成都市青羊区光华大道一段888号",
//   //营业执照/证书/文件
//   businessPicture: "1872101553694896129",
//   //法定代表人姓名
//   juriName: "赵浩",
//   //法定代表人手机号
//   juriTel: "18111293122",
//   //法定代表人证件号码
//   juriIdNo: "51303019970818205X",
//   //法定代表人身份证正面照存储标识
//   juriFacePath: "1872101562901393409",
//   //法定代表人身份证反面照存储标识
//   juriBackPath: "1872101572107890690",
//   //经办人姓名
//   operatorName: "",
//   //经办人实名手机号码
//   operatorTel: "",
//   //经办人证件号码
//   operatorIdNo: "",
//   juriIdType: "0"
// };

// {"responsibilityIdType":"0","operatorIdType":"0","unitType":"","custName":"郫都区一辰卷饼餐饮服务部个体工商户)","custCreditNo":"92510124MAD1WQ023U","address":"四川省成都市青羊区光华大道一段888号","businessPicture":"1872101553694896129","juriName":"赵浩","juriTel":"18111293122","juriIdNo":"51303019970818205X","juriFacePath":"1872101562901393409","juriBackPath":"1872101572107890690","operatorName":"","operatorTel":"","operatorIdNo":"","juriIdType":"0"}

const initialCompanyForm = {
  responsibilityIdType: "0",
  operatorIdType: "0",
  // 单位类型 0:一般企业，1：事业单位
  unitType: "",
  //单位名称
  custName: "",
  //统一信用代码
  custCreditNo: "",
  //住址
  address: "",
  //营业执照/证书/文件
  businessPicture: "",
  //法定代表人姓名
  juriName: "",
  //法定代表人手机号
  juriTel: "",
  //法定代表人证件号码
  juriIdNo: "",
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
  operatorFacePath: "",
  operatorBackPath: "",
  juriIdType: "0",
  smsCode: "",
  operatorLetterOfAuthorizationPath: ""
};

const randomStr = ref("");
const randomStrCompany = ref("")

const getImage = async () => {
  randomStr.value = uuidv4();
  const result = await getUserGraphCode(randomStr.value);
  //@ts-ignore
  imageCode.value = URL.createObjectURL(result);
};

getImage();

const getCompanyImage = async () => {
  randomStrCompany.value = uuidv4()
  const result = await getUserGraphCode(randomStrCompany.value);
  //@ts-ignore
  imageCodeComPany.value = URL.createObjectURL(result);
}

getCompanyImage()

const companyForm = ref(initialCompanyForm);
const form = ref(initialPersonForm);

const activeName = ref(props.isPerson ? "person" : "company");

const clear = (isPerson: boolean) => {
  if (isPerson) {
    form.value = initialPersonForm;
  } else {
    companyForm.value = initialCompanyForm;
  }
};

const getPersonPhoneCode = async () => {
  const res: any = await getUserSmsCodeApi(
    randomStr.value,
    graphCode.value,
    form.value.tel
  );
  if (res.code == "1") {
    message(res.msg, {
      type: "error"
    });
  }
};

const getCompanyPhoneCode = async () => {
  const res: any = await getUserSmsCodeApi(
    randomStrCompany.value,
    graphCodeCompany.value,
    auth.value.juriTel
  );
  if (res.code == "1") {
    message(res.msg, {
      type: "error"
    });
  }
}

defineExpose({
  clear
});

const tabChange = e => {
  if (e === "company") {
    props.change(companyForm.value);
    getCompanyImage()
  } else {
    props.change(form.value);
    getImage()
  }
};

const personRule = reactive<FormRules>({
  name: [
    {
      required: true,
      message: "请输入姓名",
      trigger: "blur"
    }
  ],
  tel: [
    {
      required: true,
      message: "请输入手机号",
      trigger: "blur"
    }
  ],
  idCard: [
    {
      required: true,
      message: "请输入身份证号",
      trigger: "blur"
    }
  ]
});


const companyRule = reactive<FormRules>({});

</script>

<template>
  <div>
    <el-tabs
      v-model="activeName"
      class="demo-tabs"
      @tab-change="tabChange"
      @tab-click="tabClick"
    >
      <el-tab-pane class="content" label="个人认证" name="person">
        <el-form ref="personRef" :rules="personRule" :model="form" label-width="auto">
          <h2>信息录入</h2>
          <el-form-item label="办理人员：">
            <el-radio-group v-model="staticValue">
              <el-radio value="1" size="large">本人</el-radio>
            </el-radio-group>
          </el-form-item>
          <h2>个人信息</h2>
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名：" prop="name" required>
                <el-input
                  v-model="form.name"
                  placeholder="请输入姓名"
                  @change="change(form)"
                />
              </el-form-item>
              <el-form-item label="身份证号码：" prop="idCard" required>
                <el-input
                  v-model="form.idCard"
                  placeholder="请输入身份证号"
                  @change="change(form)"
                />
              </el-form-item>
              <el-form-item label="实名手机号码：" prop="tel">
                <el-input
                  disabled
                  v-model="form.tel"
                  placeholder="请输入实名手机号码"
                  @change="change(form)"
                />
              </el-form-item>
              <!--              <el-form-item label="图形验证码" prop="code">-->
              <!--                <el-input-->
              <!--                  v-model="graphCode"-->
              <!--                  clearable-->
              <!--                  :placeholder="t('login.pureVerifyCode')"-->
              <!--                >-->
              <!--                  <template v-slot:append>-->
              <!--                    <el-image style="width: 100%;" :src="imageCode" alt="code" @click="getImage"/>-->
              <!--                  </template>-->
              <!--                </el-input>-->
              <!--              </el-form-item>-->
              <!--              <el-form-item label="验证码" prop="smsCode">-->
              <!--                <div class="w-full flex">-->
              <!--                  <el-input-->
              <!--                    v-model="form.smsCode"-->
              <!--                    clearable-->
              <!--                    :placeholder="t('login.pureSmsVerifyCode')"-->
              <!--                  />-->
              <!--                  <el-button-->
              <!--                    :disabled="!form.tel && !graphCode"-->
              <!--                    class="ml-2"-->
              <!--                    @click="-->
              <!--              async () => {-->
              <!--                if (!graphCode) {-->
              <!--                  message('请输入验证码', {-->
              <!--                    type: 'error'-->
              <!--                  });-->
              <!--                }-->
              <!--                await useVerifyCode().start(personRef, 'phone');-->
              <!--                await getPersonPhoneCode();-->
              <!--              }-->
              <!--            "-->
              <!--                  >-->
              <!--                    {{-->
              <!--                      text.length > 0-->
              <!--                        ? text + t("login.pureInfo")-->
              <!--                        : t("login.pureGetVerifyCode")-->
              <!--                    }}-->
              <!--                  </el-button>-->
              <!--                </div>-->
              <!--              </el-form-item>-->
              <el-form-item label="住址：">
                <el-input
                  v-model="form.address"
                  placeholder="请输入住址"
                  @change="change(form)"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12" style="display: flex">
              <el-form-item prop="facePath">
                <div
                  style="
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    margin-right: 20px;
                  "
                >
                  <ShImageUpload
                    upload-url="/app/func/ocr/idCard"
                    @change="
                      id => {
                        form.facePath = id;
                      }
                    "
                  />

                  <div><span style="color: red">*</span>身份证人像面</div>
                </div>
              </el-form-item>
              <el-form-item prop="backPath">
                <div
                  style="
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                  "
                >
                  <ShImageUpload
                    upload-url="/app/func/ocr/idCard"
                    @change="
                      id => {
                        form.backPath = id;
                      }
                    "
                  />
                  <div><span style="color: red">*</span>身份证国徽面</div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane class="content" label="企业认证" name="company">
        <el-form ref="companyRef" :model="companyForm" label-width="auto">
          <h2>信息录入</h2>
          <el-form-item label="企业类型：">
            <el-radio-group
              v-model="companyForm.unitType"
              @change="change(companyForm)"
            >
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
                  placeholder="请输入住所"
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
                    upload-url="/app/func/ocr/businessPicture"
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
              <el-form-item label="图形验证码" prop="code">
                <el-input
                  v-model="graphCodeCompany"
                  clearable
                  :placeholder="t('login.pureVerifyCode')"
                >
                  <template v-slot:append>
                    <el-image style="width: 100%;" :src="imageCodeComPany" alt="code" @click="getCompanyImage"/>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="smsCode">
                <div class="w-full flex">
                  <el-input
                    v-model="companyForm.smsCode"
                    clearable
                    :placeholder="t('login.pureSmsVerifyCode')"
                  />
                  <el-button
                    :disabled="!companyForm.juriTel && !graphCodeCompany"
                    class="ml-2"
                    @click="
              async () => {
                if (!graphCodeCompany) {
                  message('请输入验证码', {
                    type: 'error'
                  });
                }
                await useVerifyCode().start(companyRef, 'phone');
                await getCompanyPhoneCode();
              }
            "
                  >
                    {{
                      text.length > 0
                        ? text + t("login.pureInfo")
                        : t("login.pureGetVerifyCode")
                    }}
                  </el-button>
                </div>
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
                    upload-url="/app/func/ocr/idCard"
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
                    upload-url="/app/func/ocr/idCard"
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
                      upload-url="/app/func/ocr/idCard"
                      @change="
                        id => {
                          companyForm.operatorFacePath = id;
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
                      upload-url="/app/func/ocr/idCard"
                      @change="
                        id => {
                          companyForm.operatorBackPath = id;
                        }
                      "
                    />
                    <div>经办人身份证国徽面</div>
                  </div>
                </el-form-item>
                <el-form-item>
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex-direction: column;
                      margin-left: 20px;
                    "
                  >
                    <ShImageUpload
                      @change="
                        id => {
                          companyForm.operatorLetterOfAuthorizationPath = id;
                        }
                      "
                    />
                    <div> 经办人授权书照片存储标识</div>
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
  height: calc(100vh - 200px);
  overflow-y: scroll;
}

.el-form-item {
  align-items: center;
  margin-bottom: 20px !important;
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

:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0 !important;
}
</style>
