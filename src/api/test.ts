import { http } from "@/utils/http";

export const login = (data: object) =>
  http.post(
    "/app/oauth2/token",
    {
      data
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic dGVzdDp0ZXN0",
        "Content-Length": 32
      }
    }
  );

export const sealUpload = () => http.post("/app/getPreFileUrl");
///saas/sign/init

export const signInit = () => http.post("/app/sign/init");
export const checkFile = file =>
  http.post("/app/sign/verify", file, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

export const personSign = data => http.post("/app/per/approve", data, {});
export const companySign = data => http.post("/app/uni/approve", data, {});
export const preSign = (url: string, file: FormData) =>
  http.request(
    "put",
    url,
    { data: file },
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

export const getSealImg = (custNo: string) =>
  http.post("/app/seal/queryUni", {
    data: {
      custNo
    }
  });

export const companyCertApi = (data: object) =>
  http.post(`/app/uni/approve`, data);
