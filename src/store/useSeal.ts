/*
 * @Descripttion:
 * @Author: zheng xinyi
 * @Date: 2024-05-11 10:59:32
 * @LastEditors: zheng xinyi
 * @LastEditTime: 2024-05-11 17:05:49
 */
import {ref} from "vue";
import {defineStore} from "pinia";

export const useSeal = defineStore("seal", () => {
  const auth = ref({});

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

  const list = ref([])

  const setAuth = (au: any) => {
    auth.value = au;
    if (auth.value.subjectId) {
      localStorage.setItem("subjectId", auth.value.subjectId);
      if (auth.value.type == '0') {
        list.value = list0
      } else {
        list.value = list1
      }
    }
  };

  const getSubjectId = () => {
    return localStorage.getItem("subjectId");
  };

  return {
    auth,
    setAuth,
    getSubjectId,
    list
  };
});
