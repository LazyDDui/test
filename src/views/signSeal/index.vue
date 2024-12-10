<script setup lang="ts">
import {fp} from "@/utils";
import {addDialog} from "@/components/ReDialog/index";
import Sign from "@/components/views/Sign/index.vue";
import {h} from "vue";
import signSeal from "@/views/signSeal/SignManage/index.vue"
import {useRouter} from 'vue-router';
import {userAuthentication} from "@/api/test"
import AuthticaltionTable from "@/views/signSeal/AuthenticationDialog/index.vue"
import SignManage from "@/views/signSeal/SignManage/index.vue";
import SignRecent from "@/views/signSeal/SignRecent/index.vue"
import SignManagePageList from "@/views/signSeal/SignManage/PageList/index.vue"

const router = useRouter();
const authenticationDialog = ref<boolean>(false)
const useSeal = () => {
  addDialog({
    title: "发起签章",
    contentRenderer: () => h(Sign),
    fullscreen: true,
    hideFooter: true
  });
};
import {defineComponent, h, ref, toRaw} from "vue";

const toGoPage = () => {
  router.push({name: "verify"});
};
const userAuthenlicationInfo = ref([
  {}
])
const getUserAuthenlication = async () => {
  const res = await userAuthentication()
  userAuthenlicationInfo.value = res.data.records
  if (userAuthenlicationInfo.value && userAuthenlicationInfo.value.length > 0) {
    if (userAuthenlicationInfo.value[0].type == '0') {
      list.value = [
        {
          name: "申领印章",
          src: "signSeal/u3009.png"
        },
        {
          name: "印章使用",
          src: "signSeal/u3009.png"
        },
        {
          name: "签章验证",
          src: "signSeal/u3009.png"
        },
        {
          name: "api管理",
          src: "signSeal/u3009.png"
        }
      ];
    } else {
      list.value = [
        {
          name: "申领印章",
          src: "signSeal/u3009.png"
        },
        {
          name: "印章使用",
          src: "signSeal/u3009.png"
        },
        {
          name: "签章验证",
          src: "signSeal/u3009.png"
        }
      ];
    }
  }
  console.log('获取当前用户认证信息', userAuthenlicationInfo.value)
}
const authenlicationCol = [
  {
    label: "名称",
    prop: "authenticationName",
    align: 'center'
  },
  {
    label: "类型",
    prop: "type",
    align: 'center'
  },
]
getUserAuthenlication()
const list = ref<any[]>([
  {
    name: "申领印章",
    src: "signSeal/u3009.png"
  },
  {
    name: "印章使用",
    src: "signSeal/u3009.png"
  },
  {
    name: "签章验证",
    src: "signSeal/u3009.png"
  },
  {
    name: "api管理",
    src: "signSeal/u3009.png"
  }
]);
const radio = ref(0);
const radioChange = val => {
  console.log(val);
  if (val == 2) {
    list.value = [
      {
        name: "申领印章",
        src: "signSeal/u3009.png"
      },
      {
        name: "印章使用",
        src: "signSeal/u3009.png"
      },
      {
        name: "签章验证",
        src: "signSeal/u3009.png"
      },
      {
        name: "api管理",
        src: "signSeal/u3009.png"
      }
    ];
  } else {
    list.value = [
      {
        name: "申领印章",
        src: "signSeal/u3009.png"
      },
      {
        name: "印章使用",
        src: "signSeal/u3009.png"
      },
      {
        name: "签章验证",
        src: "signSeal/u3009.png"
      }
    ];
  }
};
const AuthenticationTable = ref(
  {
    currPage: 1,
    pageSize: 10,
    list: [],
    totalCount: 0
  }
)
const changeAuthentication = () => {
  addDialog({
    title: '切换认证',
    contentRenderer() {
      return h(AuthticaltionTable, {
        tableData: userAuthenlicationInfo.value,
        cols: authenlicationCol.value
      })
    },
    hideFooter: true
  })
}
//sh
const sealManage = () => {
  addDialog({
    title: "印章管理",
    contentRenderer: () => h(SignManage)
  });
};
//sh
const signManageSeeMore = () => {
  addDialog({
    title: "签章文档",
    fullscreen: true,
    hideFooter: true,
    contentRenderer: () => h(SignManagePageList)
  })
}
</script>

<template>
  <div class="shContainer">
    <div class="shBox">
      <!--      <el-radio-group v-model="radio" @change="radioChange">-->
      <!--        <el-radio :value="0">未认证过</el-radio>-->
      <!--        <el-radio :value="1">个人已认证</el-radio>-->
      <!--        <el-radio :value="2">企业已认证</el-radio>-->
      <!--      </el-radio-group>-->
      <div class="header">
        <div class="w">
          <div
            v-for="(item, index) in list"
            :key="index"
            class="box"
            @click="
              () => {
                if (item.name === '印章使用') {
                  useSeal();
                } else if (item.name === '签章验证') {
                  toGoPage();
                }
              }
            "
          >
            <h2>{{ item.name }}</h2>
            <img :src="fp(item.src)" width="70" height="70"/>
          </div>
        </div>
      </div>
      <div class="text">
        <div class="left-side">
          <div class="left1">
            <div class="title">
              <p class="more tip">
                <img width="14" height="16" :src="fp('signSeal/u3029.png')"/>
                <span class="pdl-5">认证信息</span>
              </p>
              <p class="more blue" @click="changeAuthentication()">
                <span class="pdr-5">切换认证</span
                ><img width="16" height="20" :src="fp('signSeal/u3032.png')"/>
              </p>
            </div>
            <div class="content">
              <h2 class="h_2">
                {{
                  userAuthenlicationInfo[0].authenticationName ? userAuthenlicationInfo[0].authenticationName : '--'
                }}</h2>
              <p class="p-2">{{ userAuthenlicationInfo[0].subjectId }}</p>
              <p>
                <span class="black tag">企业单位</span>
                <span class="green tag">已认证</span>
              </p>
            </div>
          </div>
          <div class="left2">
            <div class="title">
              <p class="more tip">
                <img width="14" height="16" :src="fp('signSeal/u3075.png')"/>
                <span class="pdl-5">印章管理</span>
              </p>
              <p class="more blue">
                <span class="pdr-5" @click="sealManage">管理</span
                ><img width="16" height="20" :src="fp('signSeal/u3032.png')"/>
              </p>
            </div>
            <div class="content">
              <h2 class="h_2">5</h2>
              <p class="p-2">总数量</p>
            </div>
          </div>
        </div>
        <div class="right-side">
          <div class="title">
            <p class="more tip">
              <img width="14" height="16" :src="fp('signSeal/u3075.png')"/>
              <span class="pdl-5">最近签章文档</span>
            </p>
            <p class="more blue">
              <span class="pdr-5" @click="signManageSeeMore">查看更多</span
              ><img width="16" height="20" :src="fp('signSeal/u3032.png')"/>
            </p>
          </div>
          <SignRecent></SignRecent>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.shContainer {
  padding-top: 20px;
  background-color: #f2f2f2;
  height: 100%;
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
            font-size: 22px;
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
