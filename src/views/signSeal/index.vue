<script setup lang="ts">
import {fp} from "@/utils";
import {addDialog} from "@/components/ReDialog/index";
import Sign from "@/components/views/Sign/index.vue";
import {h} from "vue";

const useSeal = () => {
  addDialog({
    title: "发起签章",
    contentRenderer: () => h(Sign),
    fullscreen: true,
    hideFooter: true
  });
};
</script>

<template>
  <div class="shContainer">
    <div class="shBox">
      <div class="header">
        <div class="w">
          <div class="box">
            <h2>申领印章</h2>
            <img :src="fp('signSeal/u3009.png')" width="70" height="70"/>
          </div>
          <div class="box" @click="useSeal">
            <h2>印章使用</h2>
            <img :src="fp('signSeal/u3009.png')" width="70" height="70"/>
          </div>
          <div class="box">
            <h2>签章验证</h2>
            <img :src="fp('signSeal/u3009.png')" width="70" height="70"/>
          </div>
          <div class="box">
            <h2>api管理</h2>
            <img :src="fp('signSeal/u3009.png')" width="70" height="70"/>
          </div>
        </div>
      </div>
      <div class="text">
        <div class="left-side">
          <div class="left1">
            <div class="title">
              <p class="more tip">
                <img
                  width="14"
                  height="16"
                  src="../../../public/signSeal/u3029.png"
                />
                <span class="pdl-5">认证信息</span>
              </p>
              <p class="more blue">
                <span class="pdr-5">切换认证</span
                ><img
                width="16"
                height="20"
                src="../../../public/signSeal/u3032.png"
              />
              </p>
            </div>
            <div class="content">
              <h2 class="h-2">成都xxx科技有限公司</h2>
              <p class="p-2">91510***********UL39</p>
              <p>
                <span class="black tag">企业单位</span>
                <span class="green tag">已认证</span>
              </p>
            </div>
          </div>
          <div class="left2">
            <div class="title">
              <p class="more tip">
                <img
                  width="14"
                  height="16"
                  src="../../../public/signSeal/u3075.png"
                />
                <span class="pdl-5">印章管理</span>
              </p>
              <p class="more blue">
                <span class="pdr-5">管理</span
                ><img
                width="16"
                height="20"
                src="../../../public/signSeal/u3032.png"
              />
              </p>
            </div>
            <div class="content">
              <h2 class="h-2">5</h2>
              <p class="p-2">总数量</p>
            </div>
          </div>
        </div>
        <div class="right-side">
          <div class="title">
            <p class="more tip">
              <img
                width="14"
                height="16"
                src="../../../public/signSeal/u3075.png"
              />
              <span class="pdl-5">印章管理</span>
            </p>
            <p class="more blue">
              <span class="pdr-5">查看更多</span
              ><img
              width="16"
              height="20"
              src="../../../public/signSeal/u3032.png"
            />
            </p>
          </div>
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
        cursor: pointer;
        padding: 5px 25px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #e5f1fe;
        border: 1px solid #fff;
        border-radius: 10px;

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

          .h-2 {
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

          .h-2 {
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
