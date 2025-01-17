import {http} from "@/utils/http";

export const login = (data: object) =>
  http.post(
    "/app/user/login/phone/pass",
    {
      data
    },
    {
      headers: {
        Authorization: "Basic dGVzdDp0ZXN0"
      }
    }
  );

export const sealUpload = () => http.post("/app/getPreFileUrl");

//手机号登陆
export const phoneLoginApi = (data: object) =>
  http.post(`/app/user/login/phone`, {
    data
  });
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

export const personSign = data =>
  http.post("/app/userAuthentication/addPer", {data}, {});
export const companySign = data =>
  http.post("/app/userAuthentication/addUni", {data}, {});
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

// export const getSealImg = (custNo: string) =>
//   http.post("/app/seal/queryUni", {
//     data: {
//       custNo
//     }
//   });

export const getSealImg = (current: number, size: number) =>
  http.post("/app/userAuthentication/seal/page", {
    data: {
      current,
      size
    }
  });

export const companyCertApi = (data: object) =>
  http.post(`/app/uni/approve`, data);
// /userAuthentication/seal/page
export const getUserAuthentication = (current: number, name?: string) =>
  http.post(`/app/userAuthentication/seal/page`, {
    data: {
      current,
      size: 10,
      name
    }
  });
//签署请求文件/signRequestFile/page
export const getSignRequestFile = (current: number, search?: object = {}) =>
  http.post<{ data: any }>(`/app/signRequestFile/page`, {
    data: {
      current,
      size: 10,
      ...search
    }
  });

//认证信息列表
export const userAuthentication = (
  current?: number = 1,
  search?: object = {}
) =>
  http.post<{ data: any }>(
    "/app/userAuthentication/page",
    {
      data: {
        ...search,
        current,
        size: 10
      }
    },
    {}
  );

//切换认证信息
export const changeAuthenticationApi = (id: string) =>
  http.post<{ data: any }>("/app/session/changeUserAuthentication", {
    data: {
      id
    }
  });

//获取当前认证信息
export const getCurrentAuthentication = (data?: object) =>
  http.post<{ data: any }>(
    "/app/session/userAuthentication",
    {data},
    {},
    true
  );

//api接口调用记录
export const getRequestPage = (page?: object) =>
  http.post<{ data: any }>("/app/app/pageRequest", {data: page}, {});
///userAuthentication/remove
export const removeUserAuthenticationApi = (id: string) =>
  http.post<{ data: any }>("/app/userAuthentication/remove", {
    data: {
      id
    }
  });

// http
//   .post(
//     `/app/file/upload`,
//     {
//       data: {
//         file: file.raw
//       }
//     },
//     {
//       headers: {
//         "Content-Type": "multipart/form-data"
//       }
//     }
//   )
//下载文件
export const uploadFileApi = (file: File) =>
  http.post(
    "/app/file/upload",
    {
      data: {file}
    },
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

export const downloadFileApi = (id: string) =>
  http.get(
    `/app/file/${id}`,
    {},
    {
      responseType: "blob"
    }
  );
// /userAuthentication/seal/add
export const sealAddApi = (data: object) =>
  http.post<{ data: any }>(`/app/userAuthentication/seal/add`, {
    data
  });
//获取图形验证码/auth/code/image
export const getUserGraphCode = (randomStr: string) =>
  http.hRequest<any>("get", `/app/user/graphCode`, {
    responseType: "blob",
    params: {
      randomStr
    }
  });
//获取短信验证码
export const getUserSmsCodeApi = (
  randomStr: string,
  graphCode: string,
  phone: string
) =>
  http.post<{ data: any }>(`/app/user/smsCode`, {
    data: {
      randomStr,
      graphCode,
      phone
    }
  });

//注册
export const userRegisterApi = (data: object) =>
  http.post(`/app/user/register`, {
    data
  });

//忘记密码
export const resetPasswordApi = (data: object) =>
  http.post(`/app/user/resetPass`, {
    data
  });

//登出
export const userLogoutApi = () => http.post(`/app/user/logout`);

//获取章分页
export const stampTemplatePageApi = (current: number, type?: string) =>
  http.post(`/app/sealMaker/template/page`, {
    data: {
      current,
      type,
      size: 10000
    }
  })

//章预览
export const stampSealMakerApi = (data: object) =>
  http.post(`/app/sealMaker/make`, {
    data
  })
//获取权益列表/order/seal/rightsDefinition
export const getRightsDefinitionApi = (current: number, rightsSealType: "1" | "2") =>
  http.post(`/app/order/seal/rightsDefinition`, {
    data: {
      current,
      size: 10000,
      rightsSealType
    }
  })
//创建订单
export const createSealOrderApi = (data: object) =>
  http.post(`/app/order/seal`, {
    data
  })

//支付
export const orderPayApi = (orderNo: string) =>
  http.post(`/app/order/seal/pay`, {
    data: {
      orderNo
    }
  })
//获取订单
export const getOderQueryApi = (orderNo: string) =>
  http.post(`/app/order/seal/query`, {
    data: {
      orderNo
    }
  })

//按类型获取印章模板
export const getSealMakerTypeTemplateApi = (sealType: string, cn?: string) =>
  http.post(`/app/sealMaker/make/type`, {
    data: {
      sealType,
      param: {
        cn
      }
    }
  })

