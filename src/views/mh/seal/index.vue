<script setup lang="ts">
import ShContainer from "@/components/Common/ShContainer.vue";
import { ref, onMounted, toRaw } from "vue";
import { useRouter } from "vue-router";
import { companyCertApi, companySign, personSign } from "@/api/test";
import { downloadPdf } from "@/utils";
import { http } from "@/utils/http";
import {ElMessage} from "element-plus";

let sealLoading = ref(false);
let sealData = ref([]);
let subjectId = ref(undefined);
const searchSeals = () => {
  sealLoading.value = true;
  http
    .post("/biz/seal/query", {
      data: {
        custNo: subjectId.value
      }
    })
    .then(res => {
      sealData.value = res.data;
      sealLoading.value = false;
    });
};
const toSubject = () => {
  subjectId.value = undefined;
  type.value = "0";
  searchSubjectName();
};

const downloadBA = r => {
  http
    .post("/app/seal/viewRecordUni", {
      data: {
        sealSn: r.id
      }
    })
    .then(res => {
      downloadPdf(
        res.data.fileTempUrl.replace("http://182.151.13.73:9190", "")
      );
    });
};
const router = useRouter();

let type = ref("0");
let loading = ref(false);
let tableData = ref([]);
let content = ref(undefined);
let pageSize = ref(10);
let pageNo = ref(1);
let totalNum = ref(0);
const searchSubjectName = () => {
  loading.value = true;
  http
    .post(
      "/biz/seal/record/query",
      {
        data: {
          current: pageNo.value,
          size: pageSize.value,
          subjectName: content.value
        }
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    )
    .then(res => {
      tableData.value = res.records;
      totalNum.value = res.total;
      loading.value = false;
    });
};
const confirm = async () => {
  const res = await personSign(form.value);
  if (res.code == "00") {
    ElMessage({
      message: "认证成功",
      type: "success"
    });
  } else {
    ElMessage({
      message: res.message,
      type: "error"
    });
  }
  form.value.forEach(item => {
    item.value = null; // 否则，将 value 设置为空字符串
  });
  dialogVisible.value = false;
  console.log(res);
};
const companyConfirm = () => {
  const res = companySign(companyForm.value);
  console.log(res);
};
const form = ref<object>({
  name: "",
  idCard: "",
  idType: "0",
  tel: "",
  facePath: "1865689519196520449",
  backPath: "1865689519196520449",
  notifyType: "",
  sealPic: ""
});
const companyForm = ref<object>({
  custCreditNo: "",
  custName: "",
  juriName: "",
  juriIdType: "0",
  juriIdNo: "",
  juriTel: "",
  juriFacePath: "1865689519196520449",
  juriBackPath: "1865689519196520449",
  businessPicture: "1865689519196520449",
  isApplySeal: "1",
  sealTypes: "01,02,03,04,05"
});
const handleSizeChange = v => {
  pageSize.value = v;
  searchSubjectName();
};
const handleCurrentChange = v => {
  pageNo.value = v;
  searchSubjectName();
};
const toSeal = row => {
  subjectId.value = row.id;
  type.value = "1";
  searchSeals();
};

searchSubjectName();

const personCert = async () => {
  dialogVisible.value = true;
};

const companyCert = async (item: object) => {
  // const { data } = await companyCertApi({
  //   custCreditNo:item.id,
  //   custName:'',
  //   juriName:item.juriName,
  //   juriIdtype:item.juriIdtype,
  //   juriIdno:item.juriIdNo,
  //   juriTel:item.juriTel,
  //   juriFacePath:"",
  //   juriBackPath:""
  // });
  companyDialogVisible.value = true;
};
const dialogVisible = ref<boolean>(false);
const companyDialogVisible = ref<boolean>(false);
</script>

<template>
  <div class="Shcontainer">
    <div v-if="type == '0'">
      <el-row>
        <el-col :span="1.5">
          <div style="padding-top: 10px; font-size: 14px">主体名称：</div>
        </el-col>
        <el-col :span="8">
          <el-input
            v-model="content"
            size="large"
            placeholder="搜索主体"
            @keyup.enter="searchSubjectName"
          />
        </el-col>
      </el-row>
      <br />
      <el-table
        v-loading="loading"
        :data="tableData"
        header-align="center"
        element-loading-svg-view-box="-10, -10, 50, 50"
      >
        <el-table-column width="30px" />
        <el-table-column label="主体名称" prop="subjectName" />
        <el-table-column label="类型" width="150px" align="center">
          <template #default="scope">
            <div v-if="scope.row.type === '0'">
              <span>单位</span>
            </div>
            <div v-if="scope.row.type === '1'">
              <span>个人</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime" />
        <el-table-column label="操作" align="center" width="500px">
          <template #default="scope">
            <div style="white-space: nowrap">
              <el-button type="text" @click="toSeal(scope.row)"
                >查看印章</el-button
              >
              <el-button
                type="primary"
                @click="
                  () => {
                    router.push('/sign?id=' + scope.row.id);
                  }
                "
                >发起签章
              </el-button>
              <el-button
                type="primary"
                @click="
                  () => {
                    personCert();
                  }
                "
              >
                个人实名认证
              </el-button>
              <el-button
                type="primary"
                @click="
                  () => {
                    companyCert(scope.row);
                  }
                "
              >
                企业实名认证
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <br />
      <el-pagination
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
        style="position: absolute; bottom: 0; right: 20px; left: auto"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div v-if="type == '1'">
      <el-row>
        <el-button class="btn" :icon="Back" @click="toSubject">
          返回
        </el-button>
      </el-row>
      <br />
      <el-table
        v-loading="sealLoading"
        :data="sealData"
        header-align="center"
        element-loading-svg-view-box="-10, -10, 50, 50"
      >
        <el-table-column width="30px" />
        <el-table-column label="印章编号" prop="code" />
        <el-table-column label="印章名称" prop="name" />
        <el-table-column label="印文" prop="">
          <template #default="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="'data:image/png;base64,' + scope.row.pic"
            />
          </template>
        </el-table-column>
        <el-table-column label="制章时间" prop="makeTime" />
        <el-table-column label="操作" align="center" width="180px">
          <template #default="scope">
            <el-button type="text" @click="downloadBA(scope.row)"
              >下载备案</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="新增个人实名认证"
    width="600"
    :before-close="handleClose"
  >
    <el-form :model="form" label-width="auto" style="max-width: 300px">
      <el-form-item label="姓名">
        <el-input v-model="form.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="个人身份证号">
        <el-input v-model="form.idCard" placeholder="请输入个人身份证号" />
      </el-form-item>
      <el-form-item label="个人实名手机号码">
        <el-input v-model="form.tel" placeholder="请输入个人实名手机号码" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm()"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog
    v-model="companyDialogVisible"
    title="新增企业实名认证"
    width="600"
    :before-close="handleClose"
  >
    <el-form :model="companyForm" label-width="auto" style="max-width: 300px">
      <el-form-item label="统一信用代码">
        <el-input
          v-model="companyForm.custCreditNo"
          placeholder="请输入统一信用代码"
        />
      </el-form-item>
      <el-form-item label="主体名称">
        <el-input v-model="companyForm.custName" placeholder="请输入主体名称" />
      </el-form-item>
      <el-form-item label="法定代表人姓名">
        <el-input
          v-model="companyForm.juriName"
          placeholder="请输入法定代表人姓名"
        />
      </el-form-item>
      <el-form-item label="法定代表人证件号码">
        <el-input
          v-model="companyForm.juriIdNo"
          placeholder="请输入法定代表人证件号码"
        />
      </el-form-item>
      <el-form-item label="法定代表人实名手机号码">
        <el-input
          v-model="companyForm.juriTel"
          placeholder="法定代表人实名手机号码"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="companyDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="companyConfirm()"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.Shcontainer {
  padding: 20px;
}
</style>
