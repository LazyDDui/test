import {http} from "@/utils/http";

export const login = (data: object) =>
  http.post(
    "/app/oauth2/token",
    {
      data
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        // Authorization: "Basic dGVzdDp0ZXN0"
        Authorization:"Bearer JCZUsSJo9Z9Vqr6-8iiTfrSrCYkpQ6E9ZmWspwhuNb7jY2Ni1y1sf5MK4cp7kV6RfSu_pjQ27OZ8OK5jqGIz-g8DIIoBwBBwtg2En6e1GLG9aN8q4no23123oPau26up"
      }
    }
  );

export const sealUpload = () => http.post("/app/getPreFileUrl");
///saas/sign/init

export const signInit = () => http.post("/app/sign/init");
export const checkFile = file =>
  http.post(
    "/app/sign/verify",
    {data: file},
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

export const personSign = data => http.post("/app/per/approve", data, {});
export const companySign = data => http.post("/app/uni/approve", data, {});
export const preSign = (url: string, file: FormData) =>
  http.request(
    "put",
    url,
    {data: file},
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
// /userAuthentication/seal/page
export const getUserAuthentication = (current: number) =>
  http.post(`/app/userAuthentication/seal/page`, {
    data: {
      current,
      size: 10
    }
  });
//签署请求文件/signRequestFile/page
export const getSignRequestFile = (current: number) =>
  http.post(`/app/signRequestFile/page`, {
      data: {
        current,
        size: 10
      }
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  )

//认证信息列表
export const userAuthentication = (data) => {
  http.post(`/app/userAuthentication/page`, data);
}

