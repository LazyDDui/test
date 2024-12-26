<script setup lang="ts">
import { fp } from "@/utils";
import { addDialog } from "@/components/ReDialog/index";
import Sign from "@/components/views/Sign/index.vue";
import { h } from "vue";
import { useRouter } from "vue-router";
import {
  changeAuthenticationApi,
  companySign,
  getCurrentAuthentication,
  personSign,
  userAuthentication
} from "@/api/test";
import AuthticaltionTable from "@/views/signSeal/AuthenticationDialog/index.vue";
import SignManage from "@/views/signSeal/SignManage/index.vue";
import SignRecent from "@/views/signSeal/SignRecent/index.vue";
import SignManagePageList from "@/views/signSeal/SignManage/PageList/index.vue";
import GetSeal from "@/views/signSeal/GetSeal/index.vue";
import { useSeal } from "@/store/useSeal";
import { storeToRefs } from "pinia";

const { setAuth, setUserStatus, getSealManageInfo } = useSeal();
const { auth, list, userStatus, sealManage } = storeToRefs(useSeal());

const useSealFn = () => {
  addDialog({
    title: "发起签章",
    contentRenderer: () => h(Sign),
    fullscreen: true,
    hideFooter: true
  });
};
import { h, ref } from "vue";
import { http } from "@/utils/http";
import { AuthTypeMap } from "../../utils/map";
import PrincipalType from "@/views/signSeal/PrincipalType/index.vue";
import { ElMessage } from "element-plus";

const router = useRouter();

const total = ref(0);
const { getList } = useSeal();

const toGoPage = () => {
  router.push({ name: "verify" });
};
const userAuthenlicationInfo = ref<any[]>([{}]);
const getUserAuthenlication = async () => {
  const res: any = await userAuthentication();
  userAuthenlicationInfo.value = res.data.records;
  total.value = res.data.total;

  if (res.data.records.length > 0) {
    await getCurrentAuthentication()
      .then(res2 => {
        //如果已切换认证，hold住状态
        if (res2.data) {
          setAuth(res2.data);
        } else {
          setAuth(userAuthenlicationInfo.value[0]);
        }
        setUserStatus(true);
      })
      .catch(async () => {
        changeAuthenticationApi(res.data.records[0].id);
        await getUserAuthenlication();
      });
    await getSealManageInfo();
  } else {
    setAuth();
    setUserStatus(false);
  }
};

const getUserAuthenlicationList = async (data?: any) => {
  const res = await userAuthentication(data ? data.current : null, data);
  userAuthenlicationInfo.value = res.data.records;
  total.value = res.data.total;
};

const authenlicationCol: TableColumnList = [
  {
    label: "名称",
    prop: "authenticationName",
    align: "center"
  },
  {
    label: "类型",
    prop: "type",
    align: "center"
  }
];
getUserAuthenlication();
const changeAuthentication = () => {
  addDialog({
    title: "切换认证",
    contentRenderer() {
      return h(AuthticaltionTable, {
        tableData: userAuthenlicationInfo.value,
        cols: authenlicationCol,
        total: total.value,
        getUserAuthenlication,
        goToCert,
        onSearch(data) {
          getUserAuthenlicationList(data);
        }
      });
    },
    hideFooter: true,
    open() {
      getUserAuthenlicationList();
    }
  });
};
//sh
const sealManageFn = () => {
  addDialog({
    title: "印章管理",
    contentRenderer: () => h(SignManage),
    hideFooter: true,
    width: "70vw"
  });
};
//sh
const signManageSeeMore = () => {
  addDialog({
    title: "签章文档",
    fullscreen: true,
    hideFooter: true,
    contentRenderer: () => h(SignManagePageList),
    beforeClose(done) {
      getList(1);
      done();
    }
  });
};

const getSealData = ref("99");

const isPerson = ref(true);

const unCertForm = ref({});

const clearUnCertForm = () => {
  for (const i in unCertForm.value) {
    unCertForm.value[i] = "";
  }
};

let clearUnCertInnerForm = null;

const goToCert = () => {
  addDialog({
    title: "主体类型",
    fullscreen: true,
    beforeClose(done) {
      clearUnCertForm();
      done();
    },
    contentRenderer: () => {
      return h(PrincipalType, {
        ref(ref: any) {
          if (!clearUnCertInnerForm) {
            clearUnCertInnerForm = ref.clear;
          }
        },
        change: data => {
          unCertForm.value = data;
        },
        tabClick: tab => {
          isPerson.value = tab.props.name == "person";
          // clearUnCertInnerForm();
          // clearUnCertForm();
        }
      });
    },
    async beforeSure(done) {
      if (isPerson.value) {
        const res: any = await personSign(unCertForm.value);
        if (res.code == "00") {
          ElMessage({
            message: "认证成功",
            type: "success"
          });
          done();
        } else {
          ElMessage({
            message: res.msg,
            type: "error"
          });
        }
        await getUserAuthenlication();

      } else {
        const res: any = await companySign(unCertForm.value);
        if (res.code == "00") {
          ElMessage({
            message: "认证成功",
            type: "success"
          });
          done();
        } else {
          ElMessage({
            message: res.msg,
            type: "error"
          });
        }
        await getUserAuthenlication();

      }
    }
  });
};

const unCertGetSealShow = ref(false);

const isPersonGetSeal = ref("1");

const unCertGetSeal = () => {
  unCertGetSealShow.value = true;
};

const getSeal = () => {
  addDialog({
    title: "申领印章",
    contentRenderer: () =>
      h(GetSeal, {
        d: (data: string) => {
          getSealData.value = data;
        }
      }),
    beforeSure: async done => {
      const { data } = await http.post(`/app/userAuthentication/seal/add`, {
        data: {
          type: getSealData.value
        }
      });
      done();
    }
  });
};

const unCertGetSealRadioChange = (e: "1" | "0") => {
  unCertGetSealShow.value = false;

  addDialog({
    width: 1200,
    alignCenter: true,
    hideFooter: true,
    title: e == "1" ? "个人私章申领" : "企业公章申领",
    contentRenderer: () => {
      return h(GetSeal, {
        type: e
      });
    }
  });
};
</script>

<template>
  <div class="shContainer">
    <div class="shBox">
      <div class="header">
        <div class="w">
          <div
            v-for="(item, index) in list"
            :key="index"
            class="box"
            @click="
              () => {
                if (item.name === '印章使用') {
                  useSealFn();
                } else if (item.name === '签章验证') {
                  toGoPage();
                } else if (item.name === '申领印章') {
                  if (userStatus) {
                    if (auth.type == '1') {
                      unCertGetSealRadioChange('1');
                    } else {
                      unCertGetSealRadioChange('2');
                    }
                  } else {
                    unCertGetSeal();
                  }
                } else if (item.name === 'api管理') {
                  router.push('/welcome');
                }
              }
            "
          >
            <h2>{{ item.name }}</h2>
            <img :src="fp(item.src)" width="70" height="70" />
          </div>
        </div>
      </div>
      <div class="text">
        <div class="left-side">
          <div class="left1">
            <div class="title">
              <p class="more tip">
                <img width="14" height="16" :src="fp('signSeal/u3029.png')" />
                <span class="pdl-5">认证信息</span>
              </p>
              <p
                v-if="userStatus"
                class="more blue"
                @click="changeAuthentication()"
              >
                <span class="pdr-5">切换认证</span
                ><img width="16" height="20" :src="fp('signSeal/u3032.png')" />
              </p>
            </div>
            <div v-if="userStatus" class="content">
              <h2 class="h_2">
                {{ auth?.authenticationName }}
              </h2>
              <p class="p-2">{{ auth?.subjectId }}</p>
              <p>
                <span class="black tag">{{ AuthTypeMap.get(auth.type) }}</span>
                <span class="green tag">已认证</span>
              </p>
            </div>
            <div v-else class="content">
              <el-button type="danger" style="margin-bottom: 10px">
                未认证
              </el-button>
              <el-button type="text" size="small" @click="goToCert"
                >前往认证
              </el-button>
            </div>
          </div>
          <div class="left2">
            <div class="title">
              <p class="more tip">
                <img width="14" height="16" :src="fp('signSeal/u3075.png')" />
                <span class="pdl-5">印章管理</span>
              </p>
              <p class="more blue">
                <span class="pdr-5" @click="sealManageFn">管理</span
                ><img width="16" height="20" :src="fp('signSeal/u3032.png')" />
              </p>
            </div>
            <div class="content">
              <h2 class="h_2">{{ sealManage.total }}</h2>
              <p class="p-2">总数量</p>
            </div>
          </div>
        </div>
        <div class="right-side">
          <div class="title">
            <p class="more tip">
              <img width="14" height="16" :src="fp('signSeal/u3075.png')" />
              <span class="pdl-5">最近签章文档</span>
            </p>
            <p class="more blue">
              <span class="pdr-5" @click="signManageSeeMore">查看更多</span
              ><img width="16" height="20" :src="fp('signSeal/u3032.png')" />
            </p>
          </div>
          <SignRecent />
        </div>
      </div>
    </div>
    <el-dialog v-model="unCertGetSealShow">
      <template #title>主体类型</template>
      <div
        style="
          display: flex;
          width: 100%;
          justify-content: center;
          padding: 40px;
        "
      >
        <el-radio-group v-model="isPersonGetSeal">
          <el-radio
            value="1"
            size="large"
            @click="unCertGetSealRadioChange('1')"
            >个人私章申领</el-radio
          >
          <el-radio
            value="0"
            size="large"
            @click="unCertGetSealRadioChange('0')"
            >单位公章申领</el-radio
          >
        </el-radio-group>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.shContainer {
  padding-top: 20px;
  background-color: #f2f2f2;
  box-sizing: border-box;
  height: 100vh;
  overflow-y: hidden;
}

.shBox {
  width: 1200px;
  margin: 0 auto;

  .header {
    width: 100%;
    height: 100px;
    background-color: #fff;
    margin-bottom: 20px;

    .w {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 100%;

      .box {
        padding: 5px 25px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #e5f1fe;
        border: 1px solid #fff;
        border-radius: 10px;
        cursor: pointer;

        h2 {
          font-size: 32px;
          font-weight: bold;
        }
      }
    }
  }

  .text {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 75vh;

    .left-side {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-right: 20px;

      .left1 {
        flex: 1;
        background-color: #fff;
        margin-bottom: 20px;
        border: 1px solid #fff;
        border-radius: 10px;

        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 40px;

          .h_2 {
            font-size: 16px;
            font-weight: bold;
          }

          .p-2 {
            font-weight: 400;
            font-style: normal;
            color: #7f7f7f;
          }

          .tag {
            font-weight: 400;
            font-style: normal;
            font-size: 12px;
            color: #ffffff;
          }

          .black {
            background-color: #454545;
            padding: 2px 5px;
          }

          .green {
            background-color: #5bc6c0;
            padding: 2px 5px;
            margin-left: 5px;
          }
        }

        .title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 8px;
        }

        .blue {
          color: #3478f7;
          font-weight: bold;
          cursor: pointer;
        }

        .tip {
          font-size: 18px;
          font-weight: bold;
        }

        .more {
          display: flex;
          align-items: center;

          .pdl-5 {
            padding-left: 5px;
          }

          .pdr-5 {
            padding-right: 5px;
          }
        }
      }

      .left2 {
        flex: 1;
        background-color: #fff;
        border: 1px solid #fff;
        border-radius: 10px;

        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 40px;

          .h_2 {
            font-size: 22px;
            font-weight: bold;
          }

          .p-2 {
            font-weight: 400;
            font-style: normal;
            color: #7f7f7f;
          }
        }

        .title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 8px;
        }

        .blue {
          color: #3478f7;
          font-weight: bold;
          cursor: pointer;
        }

        .tip {
          font-size: 18px;
          font-weight: bold;
        }

        .more {
          display: flex;
          align-items: center;

          .pdl-5 {
            padding-left: 5px;
          }

          .pdr-5 {
            padding-right: 5px;
          }
        }
      }
    }

    .right-side {
      flex: 4;
      background-color: #fff;
      border: 1px solid #fff;
      border-radius: 10px;

      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px 8px;
      }

      .blue {
        color: #3478f7;
        font-weight: bold;
        cursor: pointer;
      }

      .tip {
        font-size: 18px;
        font-weight: bold;
      }

      .more {
        display: flex;
        align-items: center;

        .pdl-5 {
          padding-left: 5px;
        }

        .pdr-5 {
          padding-right: 5px;
        }
      }
    }
  }
}
</style>
