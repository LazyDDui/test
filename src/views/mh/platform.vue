<script setup lang="ts">
import {fp} from "@/utils";
import Op1 from "@/components/views/Service/Option/Op1.vue";
import Op4 from "@/components/views/Service/Option/Op4.vue"
import {useRoute, useRouter} from "vue-router";
import SealVerify from "@/components/Common/SealVerify.vue";
import {mgMapKeyWords} from "@/assets/mh/config";
import {ref} from "vue";

const info = ref(mgMapKeyWords[window.location.origin])


document.title = mgMapKeyWords[`window.location.origin`]?.title

const route = useRoute()

const router = useRouter()
const n = route.query.name


</script>

<template>
  <div class="homepage">
    <div class="headers">
      <div class="w">
        <div class="logo">
          <a><img
            src="../../../src/assets/image/bigguohui.ac95d823.png"
            alt="1">
            {{ info?.title }}
          </a>
        </div>
      </div>
    </div>
    <div class="banner">
      <div class="gif">
        <img :src="info?.imgPath"/>
        <video id="video" :src="info?.videoPath" autoplay muted
               loop
               class="video"></video>
        <dl class="words">
          <dt>
            <img src="../../../src/assets/image/bigguohui.ac95d823.png"
                 :alt="n"><span>全国电子印章管理与服务平台{{ n }}{{ n == '广西' ? "壮族自治区" : "省" }}平台</span>
          </dt>
          <dd>公安备案 全国互认 一键核验</dd>
        </dl>
      </div>
    </div>
    <div class="service">
      <div class="w">
        <div class="apply" @click="()=>{
         router.push(`/login`)
        }">
          <div data-v-f0e458c2=""><h2 data-v-f0e458c2="">申领印章</h2>
            <p data-v-f0e458c2="">在线申领 高效便捷</p><span data-v-f0e458c2="" class="btn">立即申领 &gt;&gt;</span>
          </div>
          <img data-v-f0e458c2="" src="../../../src/assets/image/system_pic.247b1dd6.png" alt="申领电子公章"
               class="icon">
        </div>
        <div class="links">
          <div @click="()=>{
          router.push(`/login`)
        }" data-v-f0e458c2="" class="item">
            <div data-v-f0e458c2=""><h2 data-v-f0e458c2="">印章使用</h2>
              <p data-v-f0e458c2="">简单应用 安全管控</p><img src="../../../src/assets/image/无标题.png"
                                                              class="arrow-right"></div>
            <img data-v-f0e458c2="" src="../../../src/assets/image/system_pic1.479a694a.png" alt="签章应用"
                 class="icon"></div>
          <div @click="()=>{
          router.push(`/login`)
        }" data-v-f0e458c2="" class="item">
            <div data-v-f0e458c2=""><h2 data-v-f0e458c2="">签章验证</h2>
              <p data-v-f0e458c2="">统一验证 互信互认</p><img src="../../../src/assets/image/无标题.png"
                                                              class="arrow-right"></div>
            <img data-v-f0e458c2="" src="../../../src/assets/image/system_pic2.fee7a3d5.png" alt="文档验证"
                 class="icon"></div>
        </div>
      </div>
    </div>
    <div class="fileselect">
      <div class="w">
        <SealVerify/>
      </div>
    </div>
    <div class="blank"></div>
    <div class="qet">
      <div class="w">
        <component :is="Op1"></component>
      </div>
    </div>
    <div class="qet">
      <div class="w">
        <component :is="Op4"></component>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.homepage {
  //padding: 100px 0 0 0;

  .headers {
    padding: 10px 0;
    background: #fff;

    .w {
      width: 1200px;
      margin: 0 auto;

      .logo {
        height: 40px;
        line-height: 40px;
        position: relative;
        font-size: 22px;
        font-weight: 500;
        overflow: hidden;

        a {
          color: #333;
          display: flex;
          align-items: center;
          font-weight: 700;
          text-decoration: none;
          font-size: 22px;

          img {
            height: 40px;
            display: inline-block;
            margin-right: 14px;
          }
        }
      }
    }
  }

  .banner {
    height: 420px;
    background-size: auto 100%;

    .gif {
      height: 100%;
      width: 100%;
      position: relative;
      overflow: hidden;

      .video {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 999;
      }

      .words {
        z-index: 1000;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        dt {
          height: 110px;
          display: flex;
          align-items: center;
          font-size: 42px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 3px;
          white-space: nowrap;

          img {
            height: 110px;
            margin-right: 30px;
          }
        }

        dd {
          white-space: nowrap;
          margin-top: 30px;
          height: 35px;
          font-size: 32px;
          color: #fff;
          line-height: 40px;
          text-shadow: 0 2px 10px rgba(3, 45, 144, .4);
          letter-spacing: 48px;
          font-weight: 500;
          text-align: center;
        }
      }
    }
  }

  .service {
    background-color: #fff;

    .w {
      display: flex;
      flex-direction: row;
      justify-content: center;
      padding: 90px 0;
      width: 1200px;
      margin: 0 auto;

      .apply {
        width: 735px;
        height: 350px;
        background: #e2f1ff;
        margin-right: 30px;
        padding-left: 48px;
        border-radius: 8px;
        display: flex;
        position: relative;

        h2 {
          padding-top: 59px;
          font-size: 30px;
          color: #333;
          font-weight: 400;
        }

        p {
          color: #999;
          font-size: 18px;
        }

        .btn {
          display: block;
          width: 150px;
          background: rgba(10, 79, 211, .5);
          border-radius: 25px;
          font-size: 18px;
          color: #fff;
          height: 50px;
          line-height: 50px;
          text-align: center;
          margin-top: 125px;
          cursor: pointer;
          transition: background .5s;
        }

        .icon {
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }

      .links {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 735px;

        .item {
          height: 160px;
          margin: 0 0 30px 0;
          background-color: #d7ebff;
          cursor: pointer;
          padding-left: 48px;
          border-radius: 8px;
          display: flex;
          position: relative;

          h2 {
            padding: 0 0 19px 0;
            font-size: 30px;
            color: #333;
            font-weight: 400;
          }

          p {
            color: #999;
            font-size: 18px;
          }

          .arrow-right {
            display: block;
            margin: 25px 0 0 0;
            transition: margin-left .5s;
          }

          .icon {
            position: absolute;
            right: 0;
            bottom: 0;
          }
        }
      }
    }
  }

  .fileselect {

    .body-content {
      padding: 100px 0 0 0;
      background: #f8f9fa;
      width: 100vw;
      display: flex;
      flex-direction: column;
      align-items: center;

      .result {
        padding: 100px 0;

        .result-title {
          width: 1200px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 400;
          color: #1344a1;
          background-size: 100% 100%;
        }

        .table-bg {
          margin-top: 100px;

          .bt-table-content {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            width: 1200px;
          }

          .tb-table {
            margin-top: 20px;
            margin-bottom: 10px;
            position: relative;
            width: 48.8%;

            .tb-row:first-child {
              border-top-left-radius: 4px;
              border-top-right-radius: 4px;
            }

            .tb-row:last-child {
              border-bottom-left-radius: 4px;
              border-bottom-right-radius: 4px;
              border-bottom: 1px solid #ccc;
            }

            .tb-row {
              line-height: 45px;
              display: flex;
              line-height: 46px;
              background-color: #fff;
              border: 1px solid #ccc;
              border-bottom-width: 1px;
              border-bottom-style: solid;
              border-bottom-color: rgb(204, 204, 204);
              border-bottom: none;

              .seal-sign {
                height: 190px;
              }

              .tb-col {
                padding: 0 10px 0 30px;
                flex: 1;
                display: flex;
                color: #666;
                font-weight: bold;
                font-size: 16px;

                label {
                  color: #333;
                  font-weight: bold;
                  font-size: 16px;
                }
              }
            }
          }

          .table {
            margin-top: 20px;
            margin-bottom: 10px;
            position: relative;

            .tb-row:first-child {
            }

            .row {
              border: 1px solid #ccc;
              border-radius: 5px;
              height: 45px;
              background-color: #fbfbfb;

              .col {
                padding: 0 10px 0 30px;
                color: #666;
                font-size: 16px;

                .success-color {
                  height: 45px;
                  color: #5fbf5b;
                  display: flex;
                  align-items: center;
                  flex: 1;
                }

                .warning-color {
                  height: 45px;
                  color: #e07169;
                  font-weight: bold;
                  display: flex;
                  align-items: center;
                  flex: 1;
                }
              }
            }
          }

          .title {
            position: relative;
            text-align: left;
            font-size: 18px;
            font-weight: 400;
            color: #333;
            line-height: 24px;
            margin: 30px 0 0 0;

            .tip {
              font-size: 14px;
            }

            .dot {
              display: block;
              position: absolute;
              left: -16px;
              top: 2px;
              width: 6px;
              height: 20px;
              background: #4081ff;
              border-radius: 0 2px 2px 0;
            }
          }
        }
      }

      .tc {
        text-align: center;
      }

      .head {
        padding: 0 90px;
        margin: -15px 0 0 0;
        margin-bottom: 60px;

        h2 {
          font-weight: 600;
          color: #333;
          font-size: 36px;
        }
      }

      .search-area {
        margin: 0 auto;
        padding: 0 30px;
        height: 240px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-size: 100% 100%;
      }
    }

    :deep(.el-upload-list__item-info) {
      display: none;
    }

    .upload {
      cursor: pointer;
      font-size: 16px;
      color: #0a4fd3;
      line-height: 16px;
      margin-left: 10px;
    }

    .check {
      background-color: #0a4fd3;
      text-align: center;
      color: #fff;
      width: 240px;
      height: 64px;
      font-size: 16px;
      line-height: 64px;
      border-radius: 8px;
      margin-left: 20px;
    }
  }

  .blank {
    height: 80px;
    background-color: #fff;
  }

  .qet {
    margin-top: 20px;
    //background-color: #fff;
    width: 1200px;
    margin: 0 auto;
  }
}

</style>
