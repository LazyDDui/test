<script lang="ts" setup>

import {getBase64, stripBase64Prefix} from "@/utils/common";
import {SealTypeMap, StampShapeTypeCompanyMap, StampShapeTypePersonalMap} from "@/utils/map";
import {computed, reactive, ref, toRaw, watchEffect} from "vue";
import ShImageUpload from "@/views/components/shImageUpload/index.vue";
import {stampSealMakerApi, stampTemplatePageApi} from "@/api/test";
import {useSeal} from "@/store/useSeal";
import {storeToRefs} from "pinia";
import {v4 as uuidv4} from "uuid";
import {message} from "@/utils/message";
import {FormRules} from "element-plus";

defineOptions({
  name: "SealMaker"
})

const emit = defineEmits(["change"])
const {auth} = storeToRefs(useSeal())

const createType = ref("1");
const companyStamp = ref("")


const companyForm = ref({
  type: "",
  //印章编码
  code: "",
  //印章名称
  name: "",
  //印章图片
  stamp: "",
  //印章长度mm
  stampLength: "",
  //印章宽度mm
  stampWidth: "",
  stampInfo: ""
  // //pin码
  // pin: ""
});

const chooseList = ref([])
const currentChoose = ref({
  type: "",
  name: "",
  stamp: "",
  stampLength: "",
  stampWidth: "",
  id: ""
})

const companyStampChange = async (e) => {

  const f = JSON.parse(JSON.stringify(toRaw(chooseList.value))).find((item) => {
    return e == item.type
  })

  if (f) {
    await chooseChange(f)
  } else {
    companyForm.value = {
      type: companyForm.value.type,
      //印章编码
      code: "",
      //印章名称
      name: "",
      //印章图片
      stamp: "",
      //印章长度mm
      stampLength: "",
      //印章宽度mm
      stampWidth: "",
    }
    if (e) {
      companyForm.value.name = SealTypeMap.get(e)
    } else {
      companyForm.value.name = ""
    }
    currentTemplatePage.value = {
      id: "",
      template: "",
      width: 0,
      length: 0
    }
    currentChoose.value.id = ""
    companyForm.value.stamp = '';
    currentChoose.value.stamp = ''
    await currentChange(1, e)
  }
}

const currentChange = async (e: number, type: string) => {
  templatePage.value.current = e;
  const {data} = await stampTemplatePageApi(templatePage.value.current, type);
  templatePage.value = {
    records: data.records.map((item) => ({
      ...item,
      select: false,
    })).filter((i) => i.type !== '99'),
    current: data.current,
    total: data.total
  };
};

const currentTemplatePage = ref({
  id: "",
  template: "",
  width: 0,
  length: 0
})
const templatePage = ref({
  records: [],
  current: 1,
  total: 0
});

// const find = computed(() => {
//   return chooseList.value.find((item) => {
//     return companyForm.value.type == item.type
//   })
// })
const find = computed(() => {
  return currentChoose.value.id
})

const add = async (isPic?: boolean) => {
  if (isPic) {
    if (currentChoose.value.id) {
      chooseList.value.forEach((item) => {
        if (item.id == currentChoose.value.id) {
          item.type = companyForm.value.type
          item.name = SealTypeMap.get(companyForm.value.type)
          item.stamp = companyForm.value.stamp
          item.stampLength = companyForm.value.stampLength
          item.stampWidth = companyForm.value.stampWidth
          item.stampInfo = companyForm.value.stampInfo
          item.id = currentTemplatePage.value.id
          item.code = companyForm.value.code
          item.isTemp = createType.value
        }
      })
    } else {

      if (find.value) {
        message(`已添加${SealTypeMap.get(find.value.type)}类型章`, {
          type: "error"
        })
        return
      }
      const uni = uuidv4()
      currentChoose.value = {
        type: companyForm.value.type,
        name: SealTypeMap.get(companyForm.value.type),
        stamp: companyForm.value.stamp,
        stampLength: companyForm.value.stampLength,
        stampWidth: companyForm.value.stampWidth,
        stampInfo: companyForm.value.stampInfo,
        id: uni,
        code: companyForm.value.code,
        isTemp: createType.value
      }
      chooseList.value.push({
        type: companyForm.value.type,
        name: SealTypeMap.get(companyForm.value.type),
        stamp: companyForm.value.stamp,
        stampLength: companyForm.value.stampLength,
        stampWidth: companyForm.value.stampWidth,
        stampInfo: companyForm.value.stampInfo,
        id: uni,
        code: companyForm.value.code,
        isTemp: createType.value
      })


    }
  } else {
    const {data} = await stampSealMakerApi({
      template: JSON.parse(currentTemplatePage.value.template),
      param: {
        cn: auth.value.authenticationName ? auth.value.authenticationName : "",
        juriName: auth.value.juriName ? auth.value.juriName : "",
        fwm: companyForm.value.code
      }
    })
    companyForm.value.stamp = data
    if (currentChoose.value.id) {
      chooseList.value.forEach((item) => {
        if (item.id == currentChoose.value.id) {
          item.type = companyForm.value.type
          item.name = SealTypeMap.get(companyForm.value.type)
          item.stamp = companyForm.value.stamp
          item.stampLength = currentTemplatePage.value.length
          item.stampWidth = currentTemplatePage.value.width
          item.id = currentTemplatePage.value.id
          item.template = currentTemplatePage.value.template
          item.code = companyForm.value.code
          item.isTemp = createType.value
        }
      })
    } else {
      if (find.value) {
        message(`已添加${SealTypeMap.get(find.value.type)}类型章`, {
          type: "error"
        })
        return
      }
      currentChoose.value = {
        type: companyForm.value.type,
        name: SealTypeMap.get(companyForm.value.type),
        stamp: companyForm.value.stamp,
        stampLength: currentTemplatePage.value.length,
        stampWidth: currentTemplatePage.value.width,
        id: currentTemplatePage.value.id,
        template: currentTemplatePage.value.template,
        code: companyForm.value.code,
        isTemp: createType.value
      }
      chooseList.value.push({
        type: companyForm.value.type,
        name: SealTypeMap.get(companyForm.value.type),
        stamp: companyForm.value.stamp,
        stampLength: currentTemplatePage.value.length,
        stampWidth: currentTemplatePage.value.width,
        id: currentTemplatePage.value.id,
        template: currentTemplatePage.value.template,
        code: companyForm.value.code,
        isTemp: createType.value
      })


    }
  }
  emit("change", chooseList.value)
  console.log(chooseList.value)
}

const clear = () => {
  companyForm.value = {
    type: "",
    code: "",
    name: "",
    stamp: "",
    stampLength: "",
    stampWidth: "",
  }
  currentTemplatePage.value = {
    id: "",
    template: "",
    width: 0,
    length: 0
  }
  templatePage.value = {
    records: [],
    current: 1,
    total: 0
  }
}

const chooseChange = async (item: any) => {
  const i = JSON.parse(JSON.stringify(item))
  //@ts-ignore
  currentChoose.value = JSON.parse(JSON.stringify(item))
  //@ts-ignore
  companyForm.value = i
  await currentChange(1, i.type)
  currentTemplatePage.value.id = i.id
  currentTemplatePage.value.template = i.template
  currentTemplatePage.value.width = i.stampWidth
  currentTemplatePage.value.length = i.length
  createType.value = currentChoose.value.isTemp
}

const removeChoose = (item: any) => {
  chooseList.value.splice(chooseList.value.find((i) => i.id == item.id), 1)
  clear()
  currentChoose.value = {
    type: "",
    name: "",
    stamp: "",
    stampLength: "",
    stampWidth: "",
    id: ""
  }
  emit("change", chooseList.value)
}

const ruleFormRef = ref(null)


const rules = reactive<FormRules>({
  code: [
    {
      validator: (rule, value, callback) => {
        if ((value.length > 18 || value.length < 13) && value) {
          callback(new Error("印章编码必须在13位到18位之间"))
        } else {
          callback()
        }
      }
    }
  ]
})

defineExpose({
  ruleFormRef
})

</script>
<template>
  <el-form ref="ruleFormRef" :model="companyForm" label-width="auto" :rules="rules">
    <h2>第1步，印章制作</h2>
    <el-form-item label="印章类型：">
      <el-select
        clearable
        @change="companyStampChange"
        v-model="companyForm.type"
        placeholder="请选择印章类型"
        size="default"
        style="width: 200px"
      >
        <el-option
          v-for="(item, index) in Array.from(SealTypeMap).slice(1)"
          :key="index"
          :label="item[1]"
          :value="item[0]"
        />
      </el-select>
    </el-form-item>


    <el-row>
      <el-col :span="12">
        <el-form-item label="申领方式：">
          <el-radio-group v-model="createType">
            <el-radio value="1" size="large">制作申领</el-radio>
            <!--            <el-radio value="2" size="large">上传实物印迹</el-radio>-->
          </el-radio-group>
        </el-form-item>

        <el-form-item label="印章编码：" prop="code">
          <el-input
            clearable
            :maxlength="18"
            style="width: 200px;"
            v-model="companyForm.code"
            placeholder="请输入印章编码"
          />
        </el-form-item>
        <el-form-item v-if="createType == '1' && templatePage.records.length>0" label="印章样式：" style="width: 100%">
          <el-row style="width: 100%;">
            <el-col
              @click="()=>{
                currentTemplatePage = item

              }"
              class="stampTemp" :span="8"
              v-for="(item,index) in templatePage.records" :key="index">
              <el-image style="width: 120px;height: 120px;object-fit: contain" :src="getBase64(item.pic)"
                        :alt="index"></el-image>
              <el-tag style="font-size: 12px;" :type="item.id==currentTemplatePage.id?`danger`:`info`">
                {{ item.description }}
              </el-tag>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="印章规格：" v-if="createType != '1'">
          <el-select
            clearable
            @change="(e)=>{
                          if(e){
                             companyForm.stampLength = e.split('_')[0]
                             companyForm.stampWidth = e.split('_')[1]
                          }else {
                             companyForm.stampLength = ''
                             companyForm.stampWidth = ''
                          }
                        }"
            v-model="companyForm.stampInfo"
            placeholder="请选择印章规格"
            size="default"
            style="width: 200px"
          >
            <el-option
              v-for="(item, index) in Array.from(StampShapeTypeCompanyMap)"
              :key="index"
              :label="item[0]"
              :value="item[1]"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="createType != '1'">
          <div
            style="
                  display: flex;
                  align-items: center;
                  flex-direction: column;
                  margin-right: 20px;
                "
          >
            <ShImageUpload
              :imgs="currentChoose.stamp"
              @getBase64="
                    (base64: string) => {
                      if (base64) {
                        companyForm.stamp = stripBase64Prefix(base64);
                      } else {
                        companyForm.stamp = ``;
                        currentChoose.stamp = ``
                        // chooseList.splice(chooseList.findIndex((item)=>{
                        //   return item.id == currentChoose.id
                        // }),1)
                      }
                    }
                  "
            />
            <div>印章图片</div>
          </div>
        </el-form-item>
        <el-button v-if="createType == '2' && companyForm.stamp" type="primary" @click="add(true)">
          {{ find ? `确认修改` : `确认添加` }}
        </el-button>
        <el-button v-if="currentTemplatePage.id && createType == '1'" type="primary" @click="add(false)">{{
            find ? `确认修改` : `确认添加`
          }}
        </el-button>
      </el-col>
      <el-col :span="12" style="height: 400px;">
        <div style="display: flex">
          <div style="flex:1;">
            <el-image style="width: 300px;height: 300px;object-fit: contain" v-if="currentChoose.stamp"
                      :src="getBase64(currentChoose.stamp)">
            </el-image>
            <div v-else
                 style="width: 250px;height: 250px;border: 1px #466c6c dashed;border-radius: 50%;display: flex;justify-content: center;align-items: center;">
              <span class="iconfont" style="font-size: 30px;color:#466c6c;">&#xe607;</span>
            </div>
          </div>
          <div
            style="flex:1;display: flex;flex-direction: column;align-items: center;height: 300px;overflow-y: scroll;border-left: 1px dashed #466c6c;">
            <div
              class="cList"
              @click.stop="chooseChange(item)"
              v-for="(item) in chooseList"
              :key="item.id"
              :style="{backgroundColor:currentChoose.id==item.id?'rgba(89, 142, 217,0.2)':'transparent',width:'100%',display:'flex',justifyContent:'center',padding:`10px 0`}">
              <!--              <div v-if="!item.id" class="addBtn">-->
              <!--                <span class="iconfont">&#xe6f0;</span>-->
              <!--              </div>-->
              <el-image style="width: 120px;height: 120px;object-fit: contain" :src="getBase64(item.stamp)"></el-image>
              <span @click.stop="removeChoose(item)" v-if="item.id" class="iconfont"
                    style="font-size: 20px;position: absolute;right: 20px;top: 10px;cursor: pointer;">&#xe612;</span>
              <div>{{ item.name }}</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>
<style>
.stampTemp {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.addBtn {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid #466c6c;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 30px;
    color: #466c6c;
  }

}

.cList {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
