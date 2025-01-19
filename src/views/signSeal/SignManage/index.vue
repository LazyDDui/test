<script setup lang="ts">
import {http} from "@/utils/http";
import {h, reactive, ref} from "vue";
import Btn from "@/views/signSeal/SignManage/btn/index.vue";
import {getUserAuthentication} from "@/api/test";
import Image from "@/views/signSeal/SignManage/Image/index.vue";
import SealBtn from "@/views/signSeal/SignManage/SealBtn/index.vue";
import {addDialog} from "@/components/ReDialog/index";
import {message} from "@/utils/message";
import {downloadByData} from "@pureadmin/utils";
import {SealTypeMap} from "@/utils/map";
import {useSeal} from "@/store/useSeal";
import Loading from "@/components/Common/Loading.vue";
import Renew from "@/views/signSeal/SignManage/renew/index.vue";

const loading = ref(false)

type SignManageProps = {
  sealManageFn: () => void;
}

const props = defineProps<SignManageProps>()
const StatusMap = new Map([
  ["0", "无效（未支付）"],
  ["1", "有效"],
  ["2", "无效（注销）"],
  ["3", "无效（申领失败）"]
])


const getStatus = (item: any) => {
  if (item.status == "3") {
    return StatusMap.get(item.status) + "原因：" + item.activeFailedMsg
  } else {
    return StatusMap.get(item.status)
  }
}

const columns: TableColumnList = [
  {
    label: "印章编码",
    prop: "id",
    width: 180,
    align: "center"
  },
  {
    label: "印章名称",
    prop: "name",
    width: 160,
    align: "center"
  },
  {
    width: 140,
    label: "印章类型",
    prop: "status",
    align: "center",
    cellRenderer(data) {
      return SealTypeMap.get(data.row.type);
    }
  },
  {
    label: "权益到期时间",
    prop: "expireTime",
    align: "center"
  },
  {
    label: "签署额度",
    prop: "expireTime",
    align: "center",
    cellRenderer(data) {
      return h("div", null, data.row.maxNum == -1 ? `无限份` : `${data.row.maxNum - data.row.useNum}份`)
    },
  },
  {
    label: "状态",
    prop: "status",
    cellRenderer(data) {
      return h("div", null, getStatus(data.row))
    }
  },
  {
    width: 200,
    label: "印章图片",
    align: "center",
    // props: "pic",
    cellRenderer(data) {
      return h(Image, {
        pic: data.row.pic
      });
    }
  },
  {
    label: "操作",
    width: 280,
    cellRenderer(data) {
      const getTitle = () => {
        if (data.row.status == "1") {
          return data.row.name + "印章续费"
        }
        if (data.row.status == "0") {
          return data.row.name + "印章申领"
        }
        return ""
      }
      return h(SealBtn, {
        data: data.row,
        getList,
        addClick: () => {
          addDialog({
            hideFooter: true,
            width: '80vw',
            title: getTitle(),
            contentRenderer({options, index}) {
              return h(Renew, {
                data: data.row,
                seeOrder: () => {
                  props.sealManageFn()
                }
              })
            },
          })
        },
        detailClick: () => {
          loading.value = true
          http
            .get(
              `/app/userAuthentication/seal/recordDownload`,
              {
                params: {
                  id: data.row.id
                }
              },
              {
                responseType: "blob"
              }
            )
            .then(blob => {
              // 创建一个带有Blob URL的对象URL
              const blobUrl = URL.createObjectURL(blob);
              // 创建一个隐藏的<a>元素用于触发下载
              const a = document.createElement("a");
              a.style.display = "none";
              a.href = blobUrl;
              a.download = data.row.id + `.pdf`; // 设置下载文件名

              // 将<a>元素添加到DOM中
              document.body.appendChild(a);

              // 模拟点击以触发下载
              a.click();

              // 下载完成后移除<a>元素并释放对象URL
              document.body.removeChild(a);
              URL.revokeObjectURL(blobUrl);
              loading.value = false
            })
            .catch(error => {
                loading.value = false
                console.error(
                  "There was a problem with the fetch operation:",
                  error
                )
              }
            );
        }
      });
    },
    align: "center"
  }
];

async function downloadPdf(url, filename = "document.pdf") {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // 获取响应体作为 Blob
    const blob = await response.blob();

    // 创建一个临时的 <a> 元素用于触发下载
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename; // 设置下载文件名

    // 将 <a> 元素添加到 DOM 中（虽然它是隐藏的）
    document.body.appendChild(link);

    // 触发点击事件以开始下载
    link.click();

    // 下载完成后移除 <a> 元素
    document.body.removeChild(link);

    // 释放对象 URL
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

const form = reactive({
  name: "",
  userStatus: "",
  status: ""
});

const tableData = ref({
  current: 1,
  records: [],
  total: 0
});

const {getSealManageInfo} = useSeal()

const getList = async () => {
  const {data} = await getUserAuthentication(
    tableData.value.current,
    form.name
  );
  tableData.value = data;
  await getSealManageInfo()
};

const currentChange = async e => {
  tableData.value.current = e;
  await getList();
};
getList();
</script>

<template>
  <el-row>
    <el-input
      v-model="form.name"
      style="width: 200px; margin-right: 10px"
      placeholder="请输入印章名称"
    />
    <el-button type="primary" @click="getList">搜索</el-button>
    <pure-table
      style="margin-top: 20px"
      :data="tableData.records"
      :columns="columns"
    />
    <el-row style="margin-top: 20px; justify-content: flex-end; width: 100%">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="tableData.total"
        @current-change="currentChange"
      />
    </el-row>
  </el-row>
  <teleport to="body">
    <Loading :loading="loading" text="备案下载中，请稍等~"/>
  </teleport>
</template>

<style scoped lang="scss"></style>
