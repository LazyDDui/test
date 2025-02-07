import CryptoJS from 'crypto-js';

// 配置加密相关的参数
const key = CryptoJS.enc.Utf8.parse('thanks,pig4cloud'); // 密钥，确保长度为16字节
const iv = CryptoJS.enc.Utf8.parse('thanks,pig4cloud'); // 偏移量，确保长度为16字节
export async function downloadPdf(url, filename = "document.pdf") {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // 获取响应体作为 Blob
    const blob = await response.blob();

    // 创建一个临时的 <a> 元素用于触发下载
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename; // 设置下载文件名

    // 将 <a> 元素添加到 DOM 中（虽然它是隐藏的）
    document.body.appendChild(link);

    // 触发点击事件以开始下载
    link.click();

    // 下载完成后移除 <a> 元素
    document.body.removeChild(link);

    // 释放对象 URL
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // 将文件读取为 Data URL
    reader.onload = () => resolve(reader.result); // 成功读取后调用
    reader.onerror = error => reject(error); // 发生错误时调用
  });
}

export const getFileBlob = file => {
  const blobUrl = URL.createObjectURL(file.raw);
  return blobUrl;
};

export const downLoadFile = (blob: Blob, docName?: string) => {
  // 创建一个带有Blob URL的对象URL
  const blobUrl = URL.createObjectURL(blob);
  // 创建一个隐藏的<a>元素用于触发下载
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = blobUrl;
  a.download = docName ? docName : "文件" + `.pdf`; // 设置下载文件名

  // 将<a>元素添加到DOM中
  document.body.appendChild(a);

  // 模拟点击以触发下载
  a.click();

  // 下载完成后移除<a>元素并释放对象URL
  document.body.removeChild(a);
  URL.revokeObjectURL(blobUrl);
};

export const preViewFile = (blob: Blob) => {
  return URL.createObjectURL(blob);
};

export function uniqueByIdReduce(arr, props: string, childProps?: string) {
  return arr.reduce((acc, current) => {
    const x = acc.find(
      item =>
        (childProps ? item[props][childProps] : item[props]) ===
        (childProps ? current[props][childProps] : current[props])
    );
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
}

export const getBase64 = (url: string) => {
  return "data:image/png;base64," + url;
};

export function stripBase64Prefix(base64Data) {
  // 去除base64数据的前缀，例如"data:image/jpeg;base64,"
  return base64Data.replace(/^data:image\/[a-z]+;base64,/, "");
}

export const enIdNo = (no: string) => {
  if (!no) {
    return "";
  }
  let a = "";
  for (let i = 0; i < no.length - 8; i++) {
    a += "*";
  }
  return no.slice(0, 8) + a;
};

export function removeLetters(str: string) {
  // 使用正则表达式匹配所有字母（不分大小写），并用空字符串替换它们
  return str.replaceAll(/[a-zA-Z]/g, "");
}

export function encryptCFB(plainText: string): string {
  const encrypted = CryptoJS.AES.encrypt(plainText, key, {
    iv: iv,
    mode: CryptoJS.mode.CFB,
    padding: CryptoJS.pad.NoPadding,
  });
  return encrypted.toString();
}

export const baseUrl = "https://www.ciceseal.com/api"
// export const baseUrl = "http://182.151.50.112:17000/api"

//测试
// export const baseUrl = "http://182.151.13.73:9999/api"

export const staticUrl = "https://cic.ciceseal.com/seal/"
// export const staticUrl = "https://www.ciceseal.com/seal"
export const newsUrl = "https://www.ciceseal.com/news"
