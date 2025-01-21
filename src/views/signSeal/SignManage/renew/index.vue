<script setup lang="ts">
import {getBase64, stripBase64Prefix} from "@/utils/common";
import {OrderStatusMap, SealTypeMap, StampShapeMap} from "@/utils/map";
import ReQrcode from "@/components/ReQrcode";
import Motion from "@/views/login/utils/motion";
import ShImageUpload from "@/views/components/shImageUpload/index.vue";
import {onBeforeUnmount, reactive, ref} from "vue";
import {useSeal} from "@/store/useSeal";
import {storeToRefs} from "pinia";
import {createSealOrderApi, getOderQueryApi, getRightsDefinitionApi, orderPayApi} from "@/api/test";
import {message} from "@/utils/message";

type RenewProps = {
  data: any;
  seeOrder: () => void;
  type: "1" | "2";
}

defineOptions({
  name: "Renew"
})

const props = defineProps<RenewProps>()
const {auth} = storeToRefs(useSeal())
const orderStatus = ref("")

const step = ref(1)

const qrCode = ref("")

const rights = ref({
  records: [],
  current: 1,
  total: 0
})

let timer

const currentRight = ref([])

const toNext = () => {
  step.value++
}

const info = reactive({
  //联系人
  contact: "",
  contactPhone: "",
  address: ""
})
const orderInfo = ref()

const submit = async () => {
  if (step.value === 1) {
    if (currentRight.value.length > 0) {
      toNext()
    }
  } else if (step.value === 2) {
    if (auth.value.type == "1") {
      const {data} = await createSealOrderApi({
        contact: info.contact,
        contactPhone: info.contactPhone,
        address: info.address,
        items: [
          {
            sealId: props.data.id,
            rightsDefinitionId: currentRight.value[0].id
          }
        ]
      })
      orderInfo.value = data
      if (!data) {
        return
      }
      const orderRes = await orderPayApi(orderInfo.value.orderNo)
      if (orderRes.data) {
        qrCode.value = orderRes.data.billQRCode
        toNext()
      } else {
        message(orderRes.msg, {
          type: "error"
        })
        return
      }
    } else {
      const {data} = await createSealOrderApi({
        contact: info.contact,
        contactPhone: info.contactPhone,
        address: info.address,
        items: [
          {
            sealId: props.data.id,
            rightsDefinitionId: currentRight.value[0].id
          }
        ]
      })
      orderInfo.value = data
      if (!data) {
        return
      }
      const orderRes = await orderPayApi(orderInfo.value.orderNo)
      if (orderRes.data) {
        qrCode.value = orderRes.data.billQRCode
        toNext()
      } else {
        message(orderRes.msg, {
          type: "error"
        })
        return
      }


      if (!timer) {
        timer = setInterval(() => {
          getOderQueryApi(orderInfo.value.orderNo).then((res) => {
            orderStatus.value = res.data
            if (res.data === "1") {
              clearInterval(timer)
              message("已支付", {
                type: "success"
              })
              setTimeout(() => {
                props.seeOrder()
              }, 1000)
            }
          })
        }, 2000)
      }
    }
  }
}
const chooseRights = (item) => {
  rights.value.records.forEach((i) => {
    if (i.id === item.id) {
      i.select = true
      currentRight.value = [item]
    } else {
      i.select = false
    }
  })
}

const getRightsList = async (type: "1" | "2") => {
  const {data} = await getRightsDefinitionApi(1, type, props.type)
  rights.value = {
    ...data,
    records: data.records.map((item) => ({
      ...item,
      select: false
    }))
  }
}

if (auth.value.type == "1") {
  getRightsList("2")
} else {
  getRightsList("1")
}

const toBack = () => {
  step.value--
}

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
        message("已支付", {
          type: "success"
        })
        setTimeout(() => {
          props.seeOrder()
        }, 1000)
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
  <div v-if="auth.type == '1'" class="sealBox">
    <Motion v-if="step === 1">
      <h2>第1步，选择权益</h2>
      <el-row :key="item.id" @click="chooseRights(item)"
              :style="{border:item.select?`1px dashed red`:`1px dashed rgb(224, 224, 235)`}" class="rightsItem"
              v-for="(item) in rights.records">
        <el-col :span="12">
          <div class="title">{{ item.name }}</div>
          <div class="content">{{ item.sealType == '1' ? "企业公章" : "个人私章" }}</div>
          <div class="content">{{ item.expireTime }}之前有效</div>
          <div class="content">签署份数:{{ item.signMaxNum }}</div>
        </el-col>
        <el-col class="priceContent" :span="12">
          <div class="price">
            ¥{{ Number(item.price) }}
          </div>
        </el-col>
        <h3>价格明细</h3>
      </el-row>
    </Motion>
    <Motion v-if="step === 2">
      <h2>第2步，确认订单</h2>
      <el-row :key="item.id"
              style="border:1px solid rgb(224, 224, 235);" class="rightsItem"
              v-for="(item) in currentRight">
        <el-col :span="12">
          <div class="title">{{ item.name }}</div>
          <div class="content">{{ item.sealType == '1' ? "企业公章" : "个人私章" }}</div>
          <div class="content">{{ item.expireTime }}之前有效</div>
          <div class="content">签署份数:{{ item.signMaxNum }}</div>
        </el-col>
        <el-col class="priceContent" :span="12">
          <div class="price">
            ¥{{ Number(item.price) / 100 }}
          </div>
        </el-col>
      </el-row>
      <h2>联系地址</h2>
      <el-form v-model="info" style="margin-top: 10px;">
        <el-form-item label="联系人">
          <el-input v-model="info.contact" style="width: 200px"/>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="info.contactPhone" style="width: 200px"/>
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input v-model="info.address" style="width: 600px"/>
        </el-form-item>
      </el-form>
    </Motion>
    <Motion v-if="step == 3">
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
      <h2>第1步，选择权益</h2>
      <el-row :key="item.id" @click="chooseRights(item)"
              :style="{border:item.select?`1px dashed red`:`1px dashed rgb(224, 224, 235)`}" class="rightsItem"
              v-for="(item) in rights.records">
        <el-col :span="12">
          <div class="title">{{ item.name }}</div>
          <div class="content">{{ item.sealType == '1' ? "企业公章" : "个人私章" }}</div>
          <div class="content">{{ item.expireTime }}之前有效</div>
          <div class="content">签署份数:{{ item.signMaxNum }}</div>
        </el-col>
        <el-col class="priceContent" :span="12">
          <div class="price">
            ¥{{ Number(item.price) / 100 }}
          </div>
        </el-col>
        <h3>价格明细</h3>
      </el-row>
    </Motion>
    <Motion v-if="step === 2">
      <h2>第2步，确认订单</h2>
      <el-row :key="item.id"
              style="border:1px solid rgb(224, 224, 235);" class="rightsItem"
              v-for="(item) in currentRight">
        <el-col :span="12">
          <div class="title">{{ item.name }}</div>
          <div class="content">{{ item.sealType == '1' ? "企业公章" : "个人私章" }}</div>
          <div class="content">{{ item.expireTime }}之前有效</div>
          <div class="content">签署份数:{{ item.signMaxNum }}</div>
        </el-col>
        <el-col class="priceContent" :span="12">
          <div class="price">
            ¥{{ Number(item.price) / 100 }}
          </div>
        </el-col>
      </el-row>
      <h2>联系地址</h2>
      <el-form v-model="info" style="margin-top: 10px;">
        <el-form-item label="联系人">
          <el-input v-model="info.contact" style="width: 200px"/>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="info.contactPhone" style="width: 200px"/>
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input v-model="info.address" style="width: 600px"/>
        </el-form-item>
      </el-form>
    </Motion>
    <Motion v-if="step == 3">
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
    <el-button style="width: 200px" type="primary" @click="toBack" :disabled="step == 1">上一步</el-button>
    <!--    <el-button @click="toNext" :disabled="step == 4">下一步</el-button>-->
    <el-button style="width: 200px" type="primary" @click="submit" :disabled="step == 3 || currentRight.length==0">
      {{ "下一步" }}
    </el-button>
  </el-row>
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
