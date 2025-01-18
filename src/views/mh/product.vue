<script setup lang="ts">
import {useMainStore} from "@/store/useMainStore";
import {fp} from "@/utils";

const mainStore = useMainStore();

const banner = fp("product/17134214866678.jpg");
const bannerTips = fp("product/productWords.png");
const area1 = fp("product/gxxcx.png");
const area2 = fp("product/gxapp.png");
const area3 = fp("product/gxkhd.png");
const area4 = fp("product/gxzfkhd.png");
const area5 = fp("product/saasapi.png");
const qrcode = fp("product/qrcode.png");
const icon1 = fp("product/README.png");
const icon2 = fp("product/icowin.png");
const icon3 = fp("product/iconote.png");
</script>

<template>
  <div>
    <div class="banner">
      <div :height="mainStore.deviceInfo.height + 'px'">
        <v-img
          cover
          :width="mainStore.deviceInfo.width"
          :height="mainStore.deviceInfo.height"
          :src="banner"
        />
      </div>
      <div class="bannertips">
        <v-img
          v-if="!mainStore.isMobile"
          cover
          :width="mainStore.deviceInfo.width - 600"
          :height="mainStore.deviceInfo.height - 800"
          :src="bannerTips"
        />
        <v-img
          v-else
          cover
          :width="mainStore.deviceInfo.width - 100"
          :height="mainStore.deviceInfo.height - 800"
          :src="bannerTips"
        />
      </div>
    </div>
    <div class="tips_1" :style="{ background: `${fp(`product/area2bg.jpg`)}` }">
      <div class="w">
        <div class="flex">
          <div class="left">
            <v-img :src="area1" max-width="338px"/>
          </div>
          <div class="right">
            <h2>国信公链电子印章小程序</h2>
            <p class="desc">
              小程序移动端极简应用，支持申领单位电子公章、个人电子私章申领、应用和管理。
            </p>
            <div class="qrcode">
              <v-img :src="qrcode" width="180px" height="180px"/>
              <p>微信扫一扫</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tips_2">
      <div class="w">
        <div class="flex">
          <div class="left">
            <h2>国信公链电子印章APP</h2>
            <p class="desc">
              APP移动端极简应用，支持申领单位电子公章、个人电子私章申领、应用和管理。
            </p>
            <!--            <div class="qrcode">-->
            <!--              <a-->
            <!--                class="btn"-->
            <!--                href="https://www.ciceseal.com/app/"-->
            <!--                target="_blank"-->
            <!--              >-->
            <!--                <span><v-img width="16px" height="20px" :src="icon1" /></span>-->
            <!--                <span>Android下载</span>-->
            <!--              </a>-->
            <!--            </div>-->
          </div>
          <div class="right">
            <v-img :src="area2" max-width="338px"/>
          </div>
        </div>
      </div>
    </div>
    <div class="tips_1">
      <div class="w">
        <div class="flex">
          <div class="left">
            <v-img :src="area3" max-width="338px"/>
          </div>
          <div class="right">
            <h2>国信公链电子印章签章客户端</h2>
            <p class="desc">
              本地化签章客户端，实现本地文件签章、骑缝章、多页签章、大文件签章、文档查验等功能。
            </p>
            <!--            <div class="qrcode">-->
            <!--              <a-->
            <!--                class="btn"-->
            <!--                href="https://www.ciceseal.com/app/"-->
            <!--                target="_blank"-->
            <!--              >-->
            <!--                <span><v-img width="16px" height="20px" :src="icon2" /></span>-->
            <!--                <span>立即下载</span>-->
            <!--              </a>-->
            <!--            </div>-->
          </div>
        </div>
      </div>
    </div>
    <div class="tips_2">
      <div class="w">
        <div class="flex">
          <div class="left">
            <h2>国信公链电子印章制发客户端</h2>
            <p class="desc">
              面向各省市终端刻章企业、服务网点提供的全国电子印章制发客户端，服务
              用户线下办理电子印章业务。
            </p>
            <div class="qrcode">
              <!--              <a-->
              <!--                class="btn"-->
              <!--                href="https://www.ciceseal.com/app/"-->
              <!--                target="_blank"-->
              <!--              >-->
              <!--                <span><v-img width="16px" height="20px" :src="icon2" /></span>-->
              <!--                <span>立即下载</span>-->
              <!--              </a>-->
            </div>
          </div>
          <div class="right">
            <v-img :src="area4" max-width="338px"/>
          </div>
        </div>
      </div>
    </div>
    <div class="tips_1">
      <div class="w">
        <div class="flex">
          <div class="left">
            <v-img :src="area5" max-width="338px"/>
          </div>
          <div class="right">
            <h2>SaaS API 服务能力</h2>
            <p class="desc">
              开发者可以借助“全国电子印章管理与服务平台”的开放能力，在自身业务
              系统中无缝集成电子印章申领、签章、核验等功能。
            </p>
            <!--            <div class="qrcode">-->
            <!--              <a-->
            <!--                class="btn"-->
            <!--                href="https://www.ciceseal.com/app/"-->
            <!--                target="_blank"-->
            <!--              >-->
            <!--                <span><v-img width="16px" height="20px" :src="icon3"/></span>-->
            <!--                <span>申请试用</span>-->
            <!--              </a>-->
            <!--            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.banner {
  position: relative;

  .bannertips {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.tips_1 {
  width: 100%;
  background-size: auto;
  background-size: 100% 100%;

  .w {
    width: 1200px;
    margin: 0 auto;

    .flex {
      display: flex;
      align-items: center;
      height: 500px;
      width: 1200px;

      .left {
        width: 50%;
        text-align: left;
      }

      .right {
        width: 50%;
        display: block;
        padding-left: 25px;
        box-sizing: border-box;

        h2 {
          color: #333333;
          font-size: 36px;
          line-height: 30px;
          font-weight: 600;
        }

        .desc {
          margin: 22px 0 26px 0;
          padding: 0;
          font-weight: bold;
          font-size: 14px;
          line-height: 26px;
          color: #999999;
          width: 90%;
        }

        .qrcode {
          margin: 0;
          width: 180px;
          text-align: center;
        }

        a:hover {
          text-decoration: none;
          color: #166baa;
        }

        .btn:hover {
          opacity: 0.85;
        }

        .btn {
          background: #e2f3ff;
          border-radius: 4px;
          font-width: bold;
          border: 1px solid #1890ff;
          color: #1890ff;
          font-size: 16px;
          width: 200px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          height: 50px;
          line-height: 50px;
          text-align: center;
          padding: 0;
          margin: 10px auto 15px auto;
        }

        p {
          color: #999999;
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }
}

.tips_2 {
  width: 100%;
  background-size: auto;
  background-size: 100% 100%;

  .w {
    width: 1200px;
    margin: 0 auto;

    .flex {
      display: flex;
      align-items: center;
      height: 500px;
      width: 1200px;

      .left {
        width: 50%;
        display: block;
        padding-left: 25px;
        box-sizing: border-box;

        h2 {
          color: #333333;
          font-size: 36px;
          line-height: 30px;
          font-weight: 600;
        }

        .desc {
          margin: 22px 0 26px 0;
          padding: 0;
          font-weight: bold;
          font-size: 14px;
          line-height: 26px;
          color: #999999;
          width: 90%;
        }

        .qrcode {
          margin: 0;
          width: 180px;
          text-align: center;
        }

        a:hover {
          text-decoration: none;
          color: #166baa;
        }

        .btn:hover {
          opacity: 0.85;
        }

        .btn {
          background: #e2f3ff;
          border-radius: 4px;
          font-width: bold;
          border: 1px solid #1890ff;
          color: #1890ff;
          font-size: 16px;
          width: 200px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          height: 50px;
          line-height: 50px;
          text-align: center;
          padding: 0;
          margin: 10px auto 15px auto;
        }

        p {
          color: #999999;
          font-size: 16px;
          font-weight: bold;
        }
      }

      .right {
        width: 50%;
        text-align: -webkit-center;
      }
    }
  }
}
</style>
