<script setup lang="ts">
import { ref } from "vue";
import ShImageUpload from "@/views/components/shImageUpload/index.vue";

type GetSealProps = {
  d: (data) => void;
  type: "0" | "1";
};

const props = defineProps<GetSealProps>();

const form = ref({

});

const radio = ref(3);

const formData = ref("99");
</script>

<template>
  <div v-if="type == '1'" class="sealBox">
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
              style="display: flex; align-items: center; flex-direction: column"
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

    <el-radio-group v-model="radio">
      <el-radio value="99">个人印章</el-radio>
      <el-radio value="01">法定名称章</el-radio>
      <el-radio value="02">财务专用章</el-radio>
      <el-radio value="03">发票专用章</el-radio>
      <el-radio value="04">合同专用章</el-radio>
      <el-radio value="05">法定代表人名章</el-radio>
    </el-radio-group>
  </div>
  <div v-if="type == '0'" class="sealBox">
    <el-radio-group v-model="radio">
      <el-radio value="99">个人印章</el-radio>
      <el-radio value="01">法定名称章</el-radio>
      <el-radio value="02">财务专用章</el-radio>
      <el-radio value="03">发票专用章</el-radio>
      <el-radio value="04">合同专用章</el-radio>
      <el-radio value="05">法定代表人名章</el-radio>
    </el-radio-group>
  </div>
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
</style>
