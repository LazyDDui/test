import {http} from "@/utils/http";

export const login = (data: object) =>
  http.post("/saas/auth/getToken", {...data});

export const sealUpload = () => http.post("/saas/getPreFileUrl");
///saas/sign/init

export const signInit = () => http.post("/saas/sign/init");
export const checkFile = file =>
  http.post("/saas/sign/verify", file, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

export const personSign = data => http.post("/saas/per/approve", data, {});
export const companySign = data => http.post("/saas/uni/approve", data, {});
export const preSign = (url: string, file: any) =>
  http.request('put',url.replace("http://182.151.13.73:9190", ""), file, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

export const getSealImg = (custNo: string) =>
  http.post("/saas/seal/queryUni", {
    data: {
      custNo
    }
  });

export const companyCertApi = (data: object) =>
  http.post(`/saas/uni/approve`, data);
