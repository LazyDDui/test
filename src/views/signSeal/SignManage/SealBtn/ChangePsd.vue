<script setup lang="ts">
import {reactive, ref} from "vue";
import {http} from "@/utils/http";
import {message} from "@/utils/message";
import {closeAllDialog} from "@/components/ReDialog/index";
import {useVerifyCode} from "@/views/login/utils/verifyCode";
import {useI18n} from "vue-i18n";

type ChangePsd = {
  data: any;
};

const props = defineProps<ChangePsd>();
const {text} = useVerifyCode();
const {t} = useI18n();


const psdRef = ref()

const psd = reactive({
  oldPin: "",
  newPin: "",
  code: ""
});

const review = ref("")

const submit = () => {
  if (review.value !== psd.newPin) {
    message("两次密码请输入一致", {
      type: "error"
    })
    return
  }
  if (!psd.code) {
    message("验证码不能为空", {
      type: "error"
    })
    return;
  }
  http
    .post(`/app/userAuthentication/seal/changePin`, {
      data: {
        oldPassword: psd.oldPin,
        newPassword: psd.newPin,
        sealId: props.data.id,
        code:psd.code
      }
    })
    .then(() => {
      message("修改成功", {
        type: "success"
      });
      closeAllDialog();
    })
};
</script>

<template>
  <el-form ref="psdRef" style="display: flex;flex-direction: column;align-items: center" v-model="psd">
    <el-form-item label="旧密码" label-width="100" prop="oldPin">
      <el-input
        maxlength="6"
        v-model="psd.oldPin"
        style="margin-bottom: 20px;width: 300px"
        placeholder="请输入旧密码"
      />
    </el-form-item>
    <el-form-item label="新密码" label-width="100" prop="newPin">
      <el-input style="margin-bottom: 20px;width: 300px" maxlength="6" v-model="psd.newPin" placeholder="请输入新密码"/>
    </el-form-item>
    <el-form-item label="确认新密码" label-width="100" prop="newPin">
      <el-input style="margin-bottom: 20px;width: 300px" maxlength="6" v-model="psd.newPin"
                placeholder="请输入确认新密码"/>
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <div class="w-full flex">
        <el-input
          v-model="psd.code"
          clearable
          :placeholder="t('login.pureSmsVerifyCode')"
        />
        <el-button
          class="ml-2"
          @click="
              async () => {
                await useVerifyCode().noCheckStart(psdRef);
                await http.post(`/app/userAuthentication/sms`)
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
    <el-button type="primary" @click="submit" style="margin-top: 20px">确认修改</el-button>
  </el-form>

</template>

<style scoped lang="scss"></style>
