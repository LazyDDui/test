/*
 * @Descripttion:
 * @Author: zheng xinyi
 * @Date: 2024-05-11 10:59:32
 * @LastEditors: zheng xinyi
 * @LastEditTime: 2024-05-11 17:05:49
 */
import { ref } from "vue";
import { defineStore } from "pinia";

export const useSeal = defineStore("seal", () => {
  const auth = ref({});

  const setAuth = (au: any) => {
    auth.value = au;
    if(auth.value.subjectId){
      localStorage.setItem("subjectId",auth.value.subjectId)
    }
  };

  const getSubjectId = () => {
    return localStorage.getItem("getSubjectId")
  }

  return {
    auth,
    setAuth,
    getSubjectId
  };
});
