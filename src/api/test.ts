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
        Authorization: "Basic dGVzdDp0ZXN0"
      }
    }
  );

export const sealUpload = () => http.post("/app/getPreFileUrl");
///saas/sign/init

export const signInit = () => http.post("/app/sign/init");
export const checkFile = file =>
  http.post(
    "/app/sign/verify",
    { data: file },
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

export const personSign = data => http.post("/app/per/approve", { data }, {});
export const companySign = data => http.post("/app/uni/approve", { data }, {});
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
  http.post<{ data: any }>(
    `/app/signRequestFile/page`,
    {
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
  );

//认证信息列表
export const userAuthentication = (data?: object) =>
  http.post<{ data: any }>("/app/userAuthentication/page", { data }, {});

//切换认证信息
export const changeAuthentication = (id: string) =>
  http.post<{ data: any }>("/app/session/changeUserAuthentication", {
    params: {
      id
    }
  });

export const changeAuthenticationApi = (id: string) =>
  http.post<{ data: any }>("/app/session/changeUserAuthentication", {
    params: {
      id
    }
  });

//获取当前认证信息
export const getCurrentAuthentication = (data?: object) =>
  http.post<{ data: any }>("/app/session/userAuthentication", { data }, {});

//api接口调用记录
export const getRequestPage = (page?: object) =>
  http.post<{ data: any }>("/app/app/pageRequest", { params: page }, {});
