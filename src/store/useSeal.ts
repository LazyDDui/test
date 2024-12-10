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
  const auth = ref('')

  const setAuth = (au:string) => {
    auth.value = au
  }

  return {
    auth,
    setAuth
  };
});

