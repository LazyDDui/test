<script setup lang="ts">

import Header from "@/components/Common/Header.vue";
import { ref } from "vue";
import { fp } from "@/utils";

const img1 = '/advisory/default.jpg'
const title = '资讯动态'
const sub = "关注资讯动态，了解行业最新成果"
const listArr = ref()
const list = [
  {
    desc: '电子印章引领数字化转型新篇章 助力高效便捷服务',
    img: fp('advisory/default.jpg'),
    data: '2024-09-14'
  },
  {
    desc: '公安备案助力高效政务',
    img: fp('advisory/default.jpg'),
    data: '2024-09-06'
  }, {
    desc: '四川电子印章招商大会，开创数字经济新格局',
    img: fp('advisory/四川招商.jpg'),
    data: '2024-08-09'
  }, {
    desc: '电子印章在线核验 保障信息安全 助力绿色办公',
    img: fp('advisory/default.jpg'),
    data: '2024-07-20'
  }, {
    desc: '电子印章可查可验 为互联网签约提供安全保障',
    img: fp("advisory/default.jpg"),
    data: '2024-06-25'
  }, {
    desc: '具备这3个要素 才能称得上合格的电子印章',
    img: fp('advisory/default.jpg'),
    data: '2024-06-04'
  }, {
    desc: '智能办公新体验 电子印章:助力“安全+效率”双提升',
    img: fp('/advisory/default.jpg'),
    data: '2024-04-12'
  }, {
    desc: '保安全 增效率 数字工具赋能政企服务“加速跑”',
    img: fp('advisory/default.jpg'),
    data: '2024-03-20'
  }, {
    desc: '轻松提高办事效率 电子印章好处多！',
    img: fp('advisory/default.jpg'),
    data: '2024-03-15'
  }, {
    desc: '国信公链宣传视频制作项目询价邀请',
    img: fp('advisory/default.jpg'),
    data: '2024-03-05'
  }, {
    desc: '一文看懂什么是合法合规的电子印章',
    img: fp('advisory/default.jpg'),
    data: '2024-02-09'
  }, {
    desc: '全国电子印章管理与服务平台海南省平台正式成立',
    img: fp('advisory/海南.png'),
    data: '2024-01-23'
  },
]
listArr.value = list
const list2 = [
  {
    desc: '全国电子印章管理与服务平台河南省平台正式成立',
    img: fp('advisory/河南.png'),
    data: '2024-01-15'
  },
  {
    desc: '全国电子印章管理与服务平台湖南省平台正式成立',
    img: fp('advisory/湖南.jpg'),
    data: '2024-11-21'
  }, {
    desc: '全国电子印章管理与服务平台陕西省平台正式成立',
    img: fp('advisory/陕西.jpg'),
    data: '2024-10-29'
  }, {
    desc: '全国电子印章管理与服务平台江西省平台正式成立',
    img: fp('advisory/江西.jpeg'),
    data: '2024-10-26'
  }, {
    desc: '全国电子印章管理与服务平台福建省平台正式成立',
    img: fp('advisory/福建.jpg'),
    data: '2024-10-20'
  }, {
    desc: '全国电子印章管理与服务平台河北省平台正式成立',
    img: fp('advisory/河北.png'),
    data: '2024-10-09'
  }, {
    desc: '全国电子印章管理与服务平台湖北省平台正式成立',
    img: fp('advisory/湖北.jpg'),
    data: '2024-09-24'
  }, {
    desc: '全国电子印章管理与服务平台重庆市平台正式成立',
    img: fp('advisory/重庆.png'),
    data: '2024-09-20'
  }, {
    desc: '全国电子印章管理与服务平台贵州省平台正式成立',
    img: fp('advisory/贵州.jpg'),
    data: '2024-09-09'
  }, {
    desc: '国全国电子印章管理与服务平台浙江省平台正式成立',
    img: fp('advisory/浙江.gif'),
    data: '2024-08-23'
  }, {
    desc: '全国电子印章管理与服务平台江苏省平台正式成立',
    img: fp('advisory/江苏.jpg'),
    data: '2024-08-19'
  }, {
    desc: '全国电子印章管理与服务平台广西壮族自治区平台正式成立',
    img: fp('advisory/广西.gif'),
    data: '2024-08-10'
  },
]
const list3 = [
  {
    desc: '全国电子印章管理与服务平台四川省平台正式成立',
    img: fp('/advisory/四川.jpeg'),
    data: '2023-07-26'
  },
  {
    desc: '全国电子印章管理与服务平台山东省平台正式成立',
    img: fp('advisory/山东.jpg'),
    data: '2023-07-19'
  }, {
    desc: '全国电子印章管理与服务平台广东省平台正式成立',
    img: fp('advisory/广东.jpg'),
    data: '2023-07-06'
  }
]

const handleSizeChange = (val) => {
  console.log(val)
}
const handleCurrentChange = (val) => {
  switch (val) {
    case 1:
      listArr.value = list
      console.log(list)
      break;
    case 2:
      listArr.value = list2
      break;
    case 3:
      listArr.value = list3
      break
  }
}
</script>

<template>
  <Header type="news" :title="title" :subtitle="sub"/>
  <div class="news">
    <div class="w">
      <ul class="flex">
        <li class="item" v-for="(item,index) in listArr" :key="index">
          <a class="box" href="/news/180.html" :title="item.desc">
            <v-img :src="item.img"></v-img>
          </a>
          <div class="con">
            <a href="/news/180.html" :title="item.desc">
              <h2>
                {{ item.desc }}
              </h2>
            </a>
            <p>
              <span>{{ item.data }}</span>
              <a>详情></a>
            </p>
          </div>
        </li>
      </ul>
      <div class="page">
        <el-pagination
            size="small"
            background
            layout="prev, pager, next"
            :total="27"
            class="mt-4"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.news {
  padding: 100px 0 0 0;

  .w {
    width: 1200px;
    margin: 0 auto;

    .flex {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding-top: 0;
      align-items: center;

      li:nth-child(4n+4) {
        margin-right: 0;
      }

      li {
        margin-bottom: 50px;
        width: 282px;
        height: 320px;
        background: #FFFFFF;
        box-shadow: 0px 0px 10px 0px rgba(25, 43, 68, 0.1);
        overflow: hidden;
        margin-right: 24px;
        overflow: hidden; /* 防止放大后图片溢出 */
        .img {
          transition: transform 0.3s ease; /* 平滑的过渡效果 */
        }

        .img:hover {
          transform: scale(1.1); /* 放大图片 */
        }

        h2 {
          font-weight: 500;
          font-size: 18px;
          color: #344264;
          //height: 50px;
          overflow: hidden;
          text-align: justify;
          margin-bottom: 25px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }

        h2:hover {
          color: #1D76F9;
        }

        .con {
          padding: 2px 22px 0 22px;

          a {
            text-decoration: none;
            color: #808080;
            transition: color .3s;
          }
        }

        p {
          display: flex;
          color: #98A3B7;
          font-size: 14px;
          justify-content: space-between;
        }

        a {
          text-decoration: none;
          color: #808080;
          transition: color .3s;
          cursor: pointer;
        }

        a:hover {
          text-decoration: none;
          color: #166BAA;
        }
      }
    }

    .page {
      justify-items: center;
      margin-top: 40px;
      color: #7f7f7f;
      font-size: 14px;
      clear: both;
      margin-bottom: 80px;
    }
  }
}
</style>
