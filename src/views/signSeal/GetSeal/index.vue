<script setup lang="ts">
import { computed, ref } from "vue";
import ShImageUpload from "@/views/components/shImageUpload/index.vue";
import { stripBase64Prefix } from "@/utils/common";
import { sealAddApi } from "@/api/test";
import { SealTypeMap, StampShapeMap } from "@/utils/map";
import { useSeal } from "@/store/useSeal";
import { closeAllDialog } from "@/components/ReDialog/index";
import { message } from "@/utils/message";

type GetSealProps = {
  type?: "0" | "1";
};
const staticValue = ref("1");
const { getSealManageInfo } = useSeal();
const props = defineProps<GetSealProps>();

const form = ref({
  type: "99",
  //印章编码
  code: "",
  //印章名称
  name: "",
  // //印章形状
  // shape: "",
  // //印章图片
  stamp: "",
  // //印章长度mm
  stampLength: "10",
  // //印章宽度mm
  stampWidth: "20",
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
  shape: "",
  //印章图片
  stamp: "",
  //印章长度mm
  stampLength: "",
  //印章宽度mm
  stampWidth: "",
  //pin码
  pin: ""
});

const pin = ref("");

const radio = ref(3);

const submit = async () => {
  if (props.type == "1") {
    const res: any = await sealAddApi(form.value);
    console.log(res);
    if (res.msg) {
      message(res.msg, {
        type: "error"
      });
    } else {
      message("申领成功", {
        type: "success"
      });
      closeAllDialog();
      await getSealManageInfo();
    }
  } else {
    const res: any = await sealAddApi(companyForm.value);
    message("申领成功", {
      type: "success"
    });
    closeAllDialog();
    await getSealManageInfo();
  }
};

const createType = ref("1");
const ai = computed(() => {
  return createType.value == "1";
});
</script>

<template>
  <div v-if="type == '1'" class="sealBox">
    <el-form :model="form" label-width="auto">
      <h2>第1步，印章制作</h2>
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
      <h2>个人信息</h2>
      <el-row>
        <el-col :span="12">
          <el-form-item v-if="!ai" label="印章名称：">
            <el-input v-model="form.name" placeholder="请输入印章名称" />
          </el-form-item>
          <el-form-item label="印章编码：">
            <el-input v-model="form.code" placeholder="请输入印章编码" />
          </el-form-item>
          <!--          <el-form-item v-if="!ai" label="印章形状：">-->
          <!--            <el-select-->
          <!--              v-model="form.shape"-->
          <!--              placeholder="请输入印章形状"-->
          <!--              size="default"-->
          <!--              style="width: 200px"-->
          <!--            >-->
          <!--              <el-option-->
          <!--                v-for="(item, index) in Array.from(StampShapeMap)"-->
          <!--                :key="index"-->
          <!--                :label="item[1]"-->
          <!--                :value="item[0]"-->
          <!--              />-->
          <!--            </el-select>-->
          <!--          </el-form-item>-->
          <!--          <el-form-item v-if="!ai" label="印章宽度(mm)：">-->
          <!--            <el-input-->
          <!--              v-model="form.stampWidth"-->
          <!--              placeholder="请输入印章宽度(mm)"-->
          <!--            />-->
          <!--          </el-form-item>-->
          <!--          <el-form-item v-if="!ai" label="印章长度(mm)：">-->
          <!--            <el-input-->
          <!--              v-model="form.stampLength"-->
          <!--              placeholder="请输入印章长度(mm)"-->
          <!--            />-->
          <!--          </el-form-item>-->
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
            v-model="pin"
            :maxlength="6"
            placeholder="请输入6位纯数字"
            type="password"
          />
        </el-form-item>
        <el-form-item label="密码：">
          <el-input
            v-model="form.pin"
            :maxlength="6"
            :disabled="!pin"
            placeholder="请输入再次输入密码"
            type="password"
          />
        </el-form-item>
      </el-row>
    </el-form>
  </div>
  <div v-else class="sealBox">
    <el-form :model="companyForm" label-width="auto">
      <h2>第1步，印章制作</h2>
      <el-form-item label="申领方式：">
        <el-radio-group v-model="createType">
          <el-radio value="1" size="large">智能生成</el-radio>
          <el-radio value="2" size="large">上传实物印迹</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="印章类型：">
        <el-select
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
      <h2>个人信息</h2>
      <el-row>
        <el-col :span="12">
          <el-form-item v-if="!ai" label="印章名称：">
            <el-input v-model="companyForm.name" placeholder="请输入印章名称" />
          </el-form-item>
          <el-form-item label="印章编码：">
            <el-input v-model="companyForm.code" placeholder="请输入印章编码" />
          </el-form-item>
          <el-form-item v-if="!ai" label="印章形状：">
            <el-select
              v-model="companyForm.shape"
              placeholder="请输入印章形状"
              size="default"
              style="width: 200px"
            >
              <el-option
                v-for="(item, index) in Array.from(StampShapeMap)"
                :key="index"
                :label="item[1]"
                :value="item[0]"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="!ai" label="印章宽度(mm)：">
            <el-input
              v-model="companyForm.stampWidth"
              placeholder="请输入印章宽度(mm)"
            />
          </el-form-item>
          <el-form-item v-if="!ai" label="印章长度(mm)：">
            <el-input
              v-model="companyForm.stampLength"
              placeholder="请输入印章长度(mm)"
            />
          </el-form-item>
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
                      companyForm.stamp = stripBase64Prefix(base64);
                    } else {
                      companyForm.stamp = ``;
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
            v-model="pin"
            :maxlength="6"
            placeholder="请输入6位纯数字"
            type="password"
          />
        </el-form-item>
        <el-form-item label="密码：">
          <el-input
            v-model="companyForm.pin"
            :maxlength="6"
            :disabled="!pin"
            placeholder="请输入再次输入密码"
            type="password"
          />
        </el-form-item>
      </el-row>
    </el-form>
  </div>
  <el-row style="width: 100%; justify-content: flex-end">
    <el-button>上一步</el-button>
    <el-button @click="submit">确认申领</el-button>
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
</style>
