<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref, reactive } from "vue";
import Motion from "../utils/motion";
import { message } from "@/utils/message";
import { phoneRules } from "../utils/rule";
import type { FormInstance } from "element-plus";
import { $t, transformI18n } from "@/plugins/i18n";
import { useVerifyCode } from "../utils/verifyCode";
import { useUserStoreHook } from "@/store/modules/user";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Iphone from "@iconify-icons/ep/iphone";
import { getUserGraphCode, getUserSmsCodeApi, phoneLoginApi } from "@/api/test";
import { v4 as uuidv4 } from "uuid";
import { setToken } from "@/utils/auth";
import { initRouter } from "@/router/utils";
import { useRouter } from "vue-router";
import {useSeal} from "@/store/useSeal";

const { t } = useI18n();
const loading = ref(false);
const ruleForm = reactive({
  username: "",
  code: "",
  scope: "server"
});
const {setUserInfo} = useSeal()
const ruleFormRef = ref<FormInstance>();
const { isDisabled, text } = useVerifyCode();
const router = useRouter();
const disabled = ref(false);

const onLogin = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      // 模拟登录请求，需根据实际开发进行修改
      phoneLoginApi(ruleForm)
        .then((res: any) => {
          // 获取后端路由
          setToken({
            ...res,
            accessToken: `${res.token_type} ${res.access_token}`
          });
          setUserInfo(res);
          return initRouter().then(() => {

            disabled.value = true;
            router
              .push("/SignManage")
              .then(() => {
                message(t("login.pureLoginSuccess"), { type: "success" });
                onBack();
              })
              .finally(() => (disabled.value = false));
          });
        })
        .finally(() => {
          loading.value = false;
        });
    } else {
      loading.value = false;
    }
  });
};

const graphCode = ref("");

const getPhoneCode = async () => {
  const res: any = await getUserSmsCodeApi(
    randomStr.value,
    graphCode.value,
    ruleForm.username
  );
  if (res.code == "1") {
    message(res.msg, {
      type: "error"
    });
  }
};

const imageCode = ref("");
const randomStr = ref("");

const getImage = async () => {
  randomStr.value = uuidv4();
  const result = await getUserGraphCode(randomStr.value);
  //@ts-ignore
  imageCode.value = URL.createObjectURL(result);
};

getImage();

function onBack() {
  useVerifyCode().end();
  useUserStoreHook().SET_CURRENTPAGE(0);
}
</script>

<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="phoneRules" size="large">
    <Motion>
      <el-form-item prop="phone">
        <el-input
          v-model="ruleForm.username"
          clearable
          :placeholder="t('login.purePhone')"
          :prefix-icon="useRenderIcon(Iphone)"
        />
      </el-form-item>
    </Motion>
    <Motion :delay="150">
      <el-form-item prop="code">
        <el-input
          v-model="graphCode"
          clearable
          :placeholder="t('login.pureVerifyCode')"
          :prefix-icon="useRenderIcon('ri:shield-keyhole-line')"
        >
          <template v-slot:append>
            <el-image :src="imageCode" alt="code" @click="getImage" />
          </template>
        </el-input>
      </el-form-item>
    </Motion>
    <Motion :delay="150">
      <el-form-item prop="code">
        <div class="w-full flex justify-between">
          <el-input
            v-model="ruleForm.code"
            clearable
            :placeholder="t('login.pureSmsVerifyCode')"
            :prefix-icon="useRenderIcon('ri:shield-keyhole-line')"
          />
          <el-button
            :disabled="isDisabled"
            class="ml-2"
            @click="
              async () => {
                if (!graphCode) {
                  message('请输入输入验证码', {
                    type: 'error'
                  });
                }
                await useVerifyCode().start(ruleFormRef, 'phone');
                await getPhoneCode();
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
    </Motion>

    <!--    <Motion :delay="100">-->
    <!--      <el-form-item prop="code">-->
    <!--        <div class="w-full flex justify-between">-->
    <!--          <el-input-->
    <!--            v-model="ruleForm.code"-->
    <!--            clearable-->
    <!--            :placeholder="t('login.pureSmsVerifyCode')"-->
    <!--            :prefix-icon="useRenderIcon('ri:shield-keyhole-line')"-->
    <!--          />-->
    <!--          <el-button-->
    <!--            :disabled="isDisabled"-->
    <!--            class="ml-2"-->
    <!--            @click="useVerifyCode().start(ruleFormRef, 'phone')"-->
    <!--          >-->
    <!--            {{-->
    <!--              text.length > 0-->
    <!--                ? text + t("login.pureInfo")-->
    <!--                : t("login.pureGetVerifyCode")-->
    <!--            }}-->
    <!--          </el-button>-->
    <!--        </div>-->
    <!--      </el-form-item>-->
    <!--    </Motion>-->

    <Motion :delay="150">
      <el-form-item>
        <el-button
          class="w-full"
          size="default"
          type="primary"
          :loading="loading"
          @click="onLogin(ruleFormRef)"
        >
          {{ t("login.pureLogin") }}
        </el-button>
      </el-form-item>
    </Motion>

    <Motion :delay="200">
      <el-form-item>
        <el-button class="w-full" size="default" @click="onBack">
          {{ t("login.pureBack") }}
        </el-button>
      </el-form-item>
    </Motion>
  </el-form>
</template>
