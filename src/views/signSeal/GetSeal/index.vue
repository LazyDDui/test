<script setup lang="ts">
import {computed, h, onBeforeMount, onBeforeUnmount, reactive, ref, watch} from "vue";
import ShImageUpload from "@/views/components/shImageUpload/index.vue";
import {downloadPdf, getBase64, stripBase64Prefix} from "@/utils/common";
import {
  createSealOrderApi,
  getRightsDefinitionApi,
  getSignRequestFile,
  sealAddApi, stampSealMakerApi,
  stampTemplatePageApi,
  getOderQueryApi,
  orderPayApi
} from "@/api/test";
import {
  OrderStatusMap,
  SealTypeMap,
  StampShapeMap,
  StampShapeTypeCompanyMap,
  StampShapeTypePersonalMap
} from "@/utils/map";
import {useSeal} from "@/store/useSeal";
import {closeAllDialog} from "@/components/ReDialog/index";
import {message} from "@/utils/message";
import Motion from "@/views/login/utils/motion";
import Btn from "@/views/signSeal/GetSeal/Btn/index.vue";
import {http} from "@/utils/http";
import {storeToRefs} from "pinia";
import ReQrcode from "@/components/ReQrcode";
import {fp} from "@/utils";
import SealMaker from "@/components/SealMaker/index.vue";

type GetSealProps = {
  type?: "0" | "1";
  seeOrder: () => void;
};
const staticValue = ref("1");
const {getSealManageInfo} = useSeal();
const {auth} = storeToRefs(useSeal())
const props = defineProps<GetSealProps>();
const qrCode = ref("http://182.151.13.73:9999/pay/open/getQrCode/667726500140683264")

const personStamp = ref("")


const form = ref({
  type: "",
  //印章编码
  code: "",
  //印章名称
  name: "",
  // //印章形状
  // shape: "",
  // //印章图片
  stamp: "",
  // // //印章长度mm
  stampLength: "",
  // //印章宽度mm
  stampWidth: "",
  //pin码
  pin: ""
});

const companyForm = ref({
  type: "",
  //印章编码
  code: "",
  //印章名称
  name: "",
  //印章形状
  // shape: "",
  //印章图片
  stamp: "",
  //印章长度mm
  stampLength: "",
  //印章宽度mm
  stampWidth: "",
  //pin码
  pin: ""
});

const pin = ref({
  first: "",
  last: ""
});
const orderStatus = ref("")

const radio = ref(3);
const sealId = ref([])

const orderInfo = ref()
const loading = ref(false)

const companySeal = ref([])
const submit = async () => {
  if (step.value === 1) {
    //第一步
    if (props.type == "1") {
      if (!pin.value.last || pin.value.last != pin.value.first) {
        message("请输入pin码")
        return
      }
      loading.value = true
      const finalForm = {
        pin: pin.value.last,
        seals: [
          {
            type: form.value.type,
            code: form.value.code,
            name: form.value.name,
            stamp: form.value.stamp,
            stampLength: form.value.stampLength,
            stampWidth: form.value.stampWidth
          }
        ]
      }
      const res: any = await sealAddApi(finalForm);
      if (res.msg && !res.data) {
        message(res.msg, {
          type: "error"
        });
        loading.value = false
      } else {
        message("申领成功", {
          type: "success"
        });
        sealId.value = res.data.map((item) => item.id)
        loading.value = false
        // closeAllDialog();
        await getSealManageInfo();
        toNext()
      }
    } else {
      if (!pin.value.last || (pin.value.last != pin.value.first)) {
        message("请输入pin码")
        return
      }

      const finalForm = {
        pin: pin.value.last,
        seals: companySeal.value.map((item) => ({
          type: item.type,
          code: item.code,
          name: item.name,
          stamp: item.stamp,
          stampLength: item.stampLength,
          stampWidth: item.stampWidth
        }))
      }

      const res: any = await sealAddApi(finalForm);
      if (res.msg && !res.data) {
        message(res.msg, {
          type: "error"
        });
        loading.value = false
      } else {
        message("申领成功", {
          type: "success"
        });

      }
      sealId.value = res.data.map((item) => item.id)
      loading.value = false
      // closeAllDialog();
      await getSealManageInfo();

      toNext()
    }
  } else if (step.value === 2) {
    if (currentRightCom.value.length > 0) {
      toNext()
    }


  } else if (step.value === 3) {
    const res = await getOderQueryApi("1879782312031350785")
    orderStatus.value = res.data
    if (props.type == "1") {
      const {data} = await createSealOrderApi({
        contact: companyInfo.contact,
        contactPhone: companyInfo.contactPhone,
        address: companyInfo.address,
        items: sealId.value.map((item) => ({
          sealId: item,
          rightsDefinitionId: currentRightCom.value[0].id
        }))
        // items: [
        //   {
        //     sealId: sealId.value,
        //     rightsDefinitionId: currentRightCom.value[0].id
        //   }
        // ]
      })
      orderInfo.value = data
      const orderRes = await orderPayApi(orderInfo.value.orderNo)
      qrCode.value = orderRes.data.billQRCode
      toNext()
      if (!timer) {
        timer = setInterval(() => {
          getOderQueryApi(orderInfo.value.orderNo).then((res) => {
            orderStatus.value = res.data
            if (res.data === "1") {
              clearInterval(timer)
              props.seeOrder()
            }
          })
        }, 2000)
      }
    } else {
      const {data} = await createSealOrderApi({
        contact: companyInfo.contact,
        contactPhone: companyInfo.contactPhone,
        address: companyInfo.address,
        items: sealId.value.map((item) => ({
          sealId: item,
          rightsDefinitionId: currentRightCom.value[0].id
        }))
      })
      orderInfo.value = data
      const orderRes = await orderPayApi(orderInfo.value.orderNo)
      qrCode.value = orderRes.data.billQRCode
      toNext()

      if (!timer) {
        timer = setInterval(() => {
          getOderQueryApi(orderInfo.value.orderNo).then((res) => {
            orderStatus.value = res.data
            if (res.data === "1") {
              props.seeOrder()
              clearInterval(timer)
            }
          })
        }, 2000)
      }

    }
  }


};

const createType = ref("1");
const ai = computed(() => {
  return createType.value == "1";
});

const step = ref(1);


const templatePage = ref({
  records: [],
  current: 1,
  total: 0
});
const templateSearch = ref({});


const currentChange = async (e: number) => {
  templatePage.value.current = e;
  const {data} = await stampTemplatePageApi(templatePage.value.current, currentType.value);
  templatePage.value = {
    records: props.type == '1' ? data.records.map((item) => ({
      ...item,
      select: false,
    })).filter((i) => i.type == '99') : data.records.map((item) => ({
      ...item,
      select: false,
    })).filter((i) => i.type !== '99'),
    current: data.current,
    total: data.total
  };
};


const stampCreateType = ref("1");

const sealKinds = Array.from(SealTypeMap).map((item) => ({
  label: item[1],
  value: item[0]
}))
if (props.type == "1") {
  sealKinds.splice(1)
} else {
  sealKinds.splice(0, 1)
  // companyForm.value.type = sealKinds[0].value
}

const currentType = ref('')
// console.log(getBase64())
currentChange(1);


const toNext = () => {
  step.value++;
};

const toBack = () => {
  step.value--;
};

const personPic = ref("")


const selectStampTemplate = (item) => {
  if (props.type == '1') {
    templatePage.value.records.forEach((i) => {
      if (i.id == item.id) {
        i.select = true
        currentType.value = item.type
        form.value.type = item.type
        stampSealMakerApi({
          template: JSON.parse(item.template),
          param: {
            juriName: auth.value.authenticationName
          }
        }).then((res) => {
          personPic.value = res.data
          form.value.stamp = res.data
        })
      } else {
        i.select = false
      }
    })
  } else {
    templatePage.value.records.forEach((i) => {
      if (i.id == item.id) {
        i.select = true
        currentType.value = item.type
        companyForm.value.type = item.type
        stampSealMakerApi({
          template: JSON.parse(item.template),
          param: {
            cn: auth.value.authenticationName,
            juriName: auth.value.juriName,
            fwm: companyForm.value.code
          }
        }).then((res) => {
          personPic.value = res.data
          companyForm.value.stamp = res.data
        })
      } else {
        i.select = false
      }
    })
  }

}

const companyStampChange = async (e) => {
  if (e) {
    companyForm.value.name = SealTypeMap.get(e)
  } else {
    companyForm.value.name = ""
  }

  currentType.value = e
  await currentChange(1)
}

//企业权益

const companyRights = ref({
  records: [],
  current: 1,
  total: 0
})
const getRightsList = async (type: "1" | "2") => {
  const {data} = await getRightsDefinitionApi(1, type)
  companyRights.value = {
    ...data,
    records: data.records.map((item) => ({
      ...item,
      select: false
    }))
  }
}

const currentRightCom = ref([])
const companyInfo = reactive({
  //联系人
  contact: "",
  contactPhone: "",
  address: ""
})

const chooseCompanyRights = (item) => {
  companyRights.value.records.forEach((i) => {
    if (i.id === item.id) {
      i.select = true
      currentRightCom.value = [item]
    } else {
      i.select = false
    }
  })
}
if (props.type == "1") {
  getRightsList("2")
} else {
  getRightsList("1")
}

let timer

// watch([step, orderStatus], ([value1, value2]) => {
//   // if (value === 2) {
//   //   // getCompanyRightsList()
//   // } else if (value === 3) {
//   //   console.log(currentRightCom.value)
//   // } else if (value == 4) {
//   //   // getOderQueryApi("1879782312031350785")
//   // }
//
//   if (value1 == 4) {
//     if (!timer) {
//       timer = setInterval(() => {
//         getOderQueryApi("1879782312031350785").then((res) => {
//           orderStatus.value = res.data
//           if (res.data === "1") {
//             props.seeOrder()
//           }
//         })
//       }, 2000)
//     }
//   }
// })

const reGetQrcode = async () => {
  const {data} = await orderPayApi(orderInfo.value.orderNo)
  if (timer) {
    clearInterval(timer)
  }
  qrCode.value = data.billQRCode
  timer = setInterval(() => {
    getOderQueryApi(orderInfo.value.orderNo).then((res) => {
      orderStatus.value = res.data
      if (res.data === "1") {
        clearInterval(timer)
        props.seeOrder()
      }
    })
  }, 2000)
}

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})

</script>

<template>
  <div v-if="type == '1'" class="sealBox">
    <Motion v-if="step === 1">
      <el-form :model="form" label-width="auto">
        <h2>第1步，印章制作</h2>
        <el-row>
          <el-col :span="12">
            <el-form-item label="申领方式：">
              <el-radio-group v-model="createType">
                <el-radio value="1" size="large">智能生成</el-radio>
                <el-radio value="2" size="large">上传实物印迹</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="印章类型：">
              <el-radio-group v-model="staticValue">
                <el-radio value="1" size="large">个人私章</el-radio>
              </el-radio-group>
            </el-form-item>
            <!--            <el-form-item label="是否批量：">-->
            <!--              <el-radio-group v-model="isForPerson">-->
            <!--                <el-radio value="1" size="large">是</el-radio>-->
            <!--                <el-radio value="0" size="large">否</el-radio>-->
            <!--              </el-radio-group>-->
            <!--            </el-form-item>-->
            <el-form-item v-if="createType == '1'" label="印章样式：" style="width: 100%">
              <el-row>
                <el-col @click="selectStampTemplate(item)" class="stampTemp" :span="8"
                        v-for="(item,index) in templatePage.records" :key="index">
                  <el-image style="width: 60px;height: 60px;object-fit: contain" :src="getBase64(item.pic)"
                            :alt="index"></el-image>
                  <el-tag :type="item.select?`danger`:`info`">{{ item.description }}</el-tag>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="印章规格：">
              <el-select
                clearable
                @change="(e)=>{
                  if(e){
                     form.stampLength = e.split('_')[0]
                     form.stampWidth = e.split('_')[1]
                  }else {
                     form.stampLength = ''
                     form.stampWidth = ''
                  }
                }"
                v-model="personStamp"
                placeholder="请选择印章规格"
                size="default"
                style="width: 200px"
              >
                <el-option
                  v-for="(item, index) in Array.from(StampShapeTypePersonalMap)"
                  :key="index"
                  :label="item[0]"
                  :value="item[1]"
                />
              </el-select>
            </el-form-item>
            <!--            <el-form-item label="印章宽度：" style="width: 100%">-->
            <!--              <el-input type="number" v-model="form.stampWidth" placeholder="请输入印章宽度"/>-->
            <!--            </el-form-item>-->
            <!--            <el-form-item label="印章长度：" style="width: 100%">-->
            <!--              <el-input type="number" v-model="form.stampLength" placeholder="请输入印章长度"/>-->
            <!--            </el-form-item>-->
          </el-col>
          <el-col :span="12" v-if="createType == '1'">
            <div style="display: flex;flex-direction: column;align-items: center;">
              <el-image style="width: 300px;height: 300px;" alt="personPic" v-if="personPic"
                        :src="getBase64(personPic)"></el-image>
              <div
                style="font-size: 40px;display: flex;justify-content: center;align-items: center;width: 300px;height: 300px;border: 1px dashed black;"
                v-else>
                👁‍🗨
              </div>
              <div style="font-weight: 600;">章预览</div>
            </div>
          </el-col>
        </el-row>
        <h2 v-if="!ai">个人信息</h2>
        <el-row>
          <el-col :span="12">
            <el-form-item v-if="!ai" label="印章名称：">

              <el-input v-model="form.name" placeholder="请输入印章名称"/>
            </el-form-item>
            <!--            <el-form-item label="印章编码：">-->
            <!--              <el-input v-model="form.code" placeholder="请输入印章编码"/>-->
            <!--            </el-form-item>-->
          </el-col>
          <el-col v-if="!ai" :span="12" style="display: flex">
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
                  @getBase64="
                    (base64: string) => {
                      if (base64) {
                        form.stamp = stripBase64Prefix(base64);
                      } else {
                        form.stamp = ``;
                      }
                    }
                  "
                />
                <div>印章图片</div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <h2>确认密码</h2>
        <el-row>
          <el-form-item label="密码：">
            <el-input
              v-model="pin.first"
              :maxlength="6"
              placeholder="请输入6位纯数字"
              type="password"
            />
          </el-form-item>
          <el-form-item label="密码：">
            <el-input
              v-model="pin.last"
              :maxlength="6"
              :disabled="!pin.first"
              placeholder="请输入再次输入密码"
              type="password"
            />
          </el-form-item>
        </el-row>
      </el-form>
    </Motion>
    <Motion v-if="step === 2">
      <h2>第2步，选择权益</h2>
      <el-row :key="item.id" @click="chooseCompanyRights(item)"
              :style="{border:item.select?`1px dashed red`:`1px dashed rgb(224, 224, 235)`}" class="rightsItem"
              v-for="(item) in companyRights.records">
        <el-col :span="12">
          <div class="title">{{ item.name }}</div>
          <div class="content">{{ item.sealType == '1' ? "企业公章" : "个人私章" }}</div>
          <div class="content">{{ item.expireTime }}之前有效</div>
          <div class="content">签署份数:{{ item.signMaxNum }}</div>
        </el-col>
        <el-col class="priceContent" :span="12">
          <div class="price">
            ¥{{ item.price }}
          </div>
        </el-col>
        <h3>价格明细</h3>
      </el-row>
    </Motion>
    <Motion v-if="step === 3">
      <h2>第3步，确认订单</h2>
      <el-row :key="item.id"
              style="border:1px solid rgb(224, 224, 235);" class="rightsItem"
              v-for="(item) in currentRightCom">
        <el-col :span="12">
          <div class="title">{{ item.name }}</div>
          <div class="content">{{ item.sealType == '1' ? "企业公章" : "个人私章" }}</div>
          <div class="content">{{ item.expireTime }}之前有效</div>
          <div class="content">签署份数:{{ item.signMaxNum }}</div>
        </el-col>
        <el-col class="priceContent" :span="12">
          <div class="price">
            ¥{{ Number(item.price) * sealId.length }}
          </div>
        </el-col>
      </el-row>
      <h2>联系地址</h2>
      <el-form v-model="companyInfo" style="margin-top: 10px;">
        <el-form-item label="联系人">
          <el-input v-model="companyInfo.contact" style="width: 200px"/>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="companyInfo.contactPhone" style="width: 200px"/>
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input v-model="companyInfo.address" style="width: 600px"/>
        </el-form-item>
      </el-form>
    </Motion>
    <Motion v-if="step == 4">
      <el-row style="display: flex;justify-content: center">
        <el-col :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
          <el-card shadow="hover" class="mb-[10px] text-center">
            <div class="font-bold">请扫码支付</div>
            <div class="font-bold">{{ OrderStatusMap.get(orderStatus) }}</div>
            <ReQrcode :text="qrCode"/>
          </el-card>
        </el-col>
      </el-row>
      <div style="display: flex;justify-content: center;">
        <el-button @click="reGetQrcode">重新获取二维码</el-button>
      </div>
    </Motion>
  </div>
  <div v-else class="sealBox">
    <Motion v-if="step === 1">
      <SealMaker @change="(e)=>{
        companySeal = e
      }"/>
      <h2>确认密码</h2>
      <el-row>
        <el-form-item label="密码：">
          <el-input
            v-model="pin.first"
            :maxlength="6"
            placeholder="请输入6位纯数字"
            type="password"
          />
        </el-form-item>
        <el-form-item label="密码：">
          <el-input
            v-model="pin.last"
            :maxlength="6"
            :disabled="!pin.first"
            placeholder="请输入再次输入密码"
            type="password"
          />
        </el-form-item>
      </el-row>
    </Motion>
    <Motion v-if="step === 2">
      <h2>第2步，选择权益</h2>
      <el-row :key="item.id" @click="chooseCompanyRights(item)"
              :style="{border:item.select?`1px dashed red`:`1px dashed rgb(224, 224, 235)`}" class="rightsItem"
              v-for="(item) in companyRights.records">
        <el-col :span="12">
          <div class="title">{{ item.name }}</div>
          <div class="content">{{ item.sealType == '1' ? "企业公章" : "个人私章" }}</div>
          <div class="content">{{ item.expireTime }}之前有效</div>
          <div class="content">签署份数:{{ item.signMaxNum }}</div>
        </el-col>
        <el-col class="priceContent" :span="12">
          <div class="price">
            ¥{{ item.price }}
          </div>
        </el-col>
        <h3>价格明细</h3>
      </el-row>
    </Motion>
    <Motion v-if="step === 3">
      <h2>第3步，确认订单</h2>
      <el-row :key="item.id"
              style="border:1px solid rgb(224, 224, 235);" class="rightsItem"
              v-for="(item) in currentRightCom">
        <el-col :span="12">
          <div class="title">{{ item.name }}</div>
          <div class="content">{{ item.sealType == '1' ? "企业公章" : "个人私章" }}</div>
          <div class="content">{{ item.expireTime }}之前有效</div>
          <div class="content">签署份数:{{ item.signMaxNum }}</div>
        </el-col>
        <el-col class="priceContent" :span="12">
          <div class="price">
            ¥{{ Number(item.price) * sealId.length }}
          </div>
        </el-col>
      </el-row>
      <h2>联系地址</h2>
      <el-form v-model="companyInfo" style="margin-top: 10px;">
        <el-form-item label="联系人">
          <el-input v-model="companyInfo.contact" style="width: 200px"/>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="companyInfo.contactPhone" style="width: 200px"/>
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input v-model="companyInfo.address" style="width: 600px"/>
        </el-form-item>
      </el-form>
    </Motion>
    <Motion v-if="step == 4">
      <el-row style="display: flex;justify-content: center">
        <el-col :xl="6" :lg="6" :md="12" :sm="24" :xs="24">
          <el-card shadow="hover" class="mb-[10px] text-center">
            <div class="font-bold">请扫码支付</div>
            <div class="font-bold">{{ OrderStatusMap.get(orderStatus) }}</div>
            <ReQrcode :text="qrCode"/>
          </el-card>
        </el-col>
      </el-row>
      <div style="display: flex;justify-content: center;">
        <el-button @click="reGetQrcode">重新获取二维码</el-button>
      </div>

    </Motion>
  </div>
  <el-row style="width: 100%; justify-content: center">
    <el-button style="width: 200px" type="primary" @click="toBack" :disabled="step == 1 || step == 2">上一步</el-button>
    <!--    <el-button @click="toNext" :disabled="step == 4">下一步</el-button>-->
    <el-button style="width: 200px" type="primary" @click="submit" :disabled="step == 4">
      {{ step == 1 ? "确认申领" : "下一步" }}
    </el-button>
  </el-row>
  <el-dialog v-model="loading" width="300" align-center>
    <div style="text-align: center;display: flex;flex-direction: column;align-items: center">
      <img alt="loading" :src="fp('verify/loading.96e04459.gif')"/>
      <div>申领中，请耐心等待～</div>
    </div>
  </el-dialog>
</template>

<style scoped lang="scss">
.sealBox {
  padding: 20px;

  h2 {
    width: 100%;
    font-weight: 600;
    border-bottom: 0.1px solid #9ca3af;
    margin-bottom: 4px;
    color: black;
  }
}

.el-form-item {
  align-items: center;
  margin-bottom: 4px !important;
}

.el-input {
  width: 200px;
}

.stampTemp {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rightsItem {
  margin-top: 20px;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;

  .content {
    font-size: 15px;
    margin-bottom: 6px;
  }

  .title {
    font-size: 20px;
    color: rgb(177, 79, 225);
    margin-bottom: 6px;
  }

  .priceContent {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    .price {
      font-size: 30px;
      display: flex;
      justify-content: flex-end;
      color: red;
    }
  }

}

:deep(.el-form-item) {
  margin-bottom: 10px !important;
}
</style>
