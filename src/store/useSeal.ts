/*
 * @Descripttion:
 * @Author: zheng xinyi
 * @Date: 2024-05-11 10:59:32
 * @LastEditors: zheng xinyi
 * @LastEditTime: 2024-05-11 17:05:49
 */
import { ref } from "vue";
import { defineStore } from "pinia";
import { downloadFileApi, getSignRequestFile } from "@/api/test";
import { http } from "@/utils/http";
import { preViewFile } from "@/utils/common";

export const useSeal = defineStore("seal", () => {
  const userInfo = ref(
    window.localStorage.getItem("sealUserInfo")
      ? JSON.parse(window.localStorage.getItem("sealUserInfo"))
      : ""
  );

  const setUserInfo = (usrInfo: any) => {
    userInfo.value = usrInfo;
    window.localStorage.setItem("sealUserInfo", JSON.stringify(usrInfo));
  };

  const auth = ref<any>({});
  const fileId = ref(
    window.localStorage.getItem("fileId")
      ? window.localStorage.getItem("fileId")
      : ""
  );
  const docName = ref(
    window.localStorage.getItem("docName")
      ? window.localStorage.getItem("docName")
      : ""
  );

  const setDocName = (n: string) => {
    docName.value = n;
    localStorage.setItem("docName", n);
  };
  const getPdf = async () => {
    return await downloadFileApi(fileId.value);
  };

  const sealInfo = ref(
    window.localStorage.getItem("sealInfo")
      ? JSON.parse(window.localStorage.getItem("sealInfo"))
      : ""
  );
  const setSealInfo = (info: any) => {
    sealInfo.value = info;
    window.localStorage.setItem("sealInfo", JSON.stringify(info));
  };
  const setFileId = (id: string) => {
    fileId.value = id;
    localStorage.setItem("fileId", JSON.stringify(id));
  };

  const userStatus = ref(false);

  const sealManage = ref({
    total: 0,
    records: []
  });

  const getSealManageInfo = async () => {
    const sealInfo: any = await http.post(`/app/userAuthentication/seal/page`, {
      data: {
        current: 1
      }
    });
    sealManage.value = sealInfo.data;
  };

  const setUserStatus = (status: boolean) => {
    userStatus.value = status;
  };

  const fileList = ref<any>([]);

  const getList = async (page: number, search?: any = {}) => {
    const { data } = await getSignRequestFile(page, search);
    fileList.value = data;
  };

  const list0 = [
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

  const list1 = [
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

  const list3 = [
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
      name: "api开通",
      src: "signSeal/u3009.png"
    }
  ];

  const list = ref([]);

  const setAuth = async (au?: any) => {
    if (au) {
      auth.value = au;
      if (auth.value.subjectId) {
        localStorage.setItem("subjectId", auth.value.subjectId);
        if (auth.value.type == "0") {
          if (auth.value.isApplyApi == "1") {
            list.value = list0;
          } else {
            list.value = list3;
          }
        } else {
          list.value = list1;
        }
      }
      await getList(1);
    } else {
      list.value = list1;
    }
  };

  const getSubjectId = () => {
    return localStorage.getItem("subjectId");
  };

  return {
    auth,
    setAuth,
    getSubjectId,
    list,
    fileList,
    getList,
    setUserStatus,
    userStatus,
    sealManage,
    getSealManageInfo,
    fileId,
    setFileId,
    getPdf,
    sealInfo,
    setSealInfo,
    docName,
    setDocName,
    setUserInfo,
    userInfo
  };
});
