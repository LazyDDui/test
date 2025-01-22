export const SealTypeMap = new Map([
  ["99", "个人印章"],
  ["01", "法定名称章"],
  ["02", "财务专用章"],
  ["03", "发票专用章"],
  ["04", "合同专用章"],
  ["05", "法定代表人名章"]
]);

export const SealTypeReverseMap = new Map([
  ["个人印章", "99"],
  ["法定名称章", "01"],
  ["财务专用章", "02"],
  ["发票专用章", "03"],
  ["合同专用章", "04"],
  ["法定代表人名章", "05"]
])

export const CertStatusMap = new Map([
  ["00", "正常"],
  ["01", "待审核"],
  ["02", "认证失败"]
]);

export const AuthTypeMap = new Map([
  ["0", "企业单位"],
  ["1", "个人"]
]);

export const StampShapeMap = new Map([
  ["0", "圆形"],
  ["1", "椭圆"],
  ["2", "方形"]
]);

export const StampShapeTypeCompanyMap = new Map([
  ["42*42", "42_42"],
  ["40*40", "40_40"],
  ["40*30", "40_30"],
])

export const StampShapeTypePersonalMap = new Map([
  ["20*10", "20_10"],
  ["20*20", "20_20"],
])

export const OrderStatusMap = new Map([
  ["-1", "未支付"],
  ["0", "待支付"],
  ["1", "支付成功"],
  ["2", "支付失败"],
  ["3", "支付超期"],
  ["4", "已扫码，待支付"]
])

export const PlatFormTitleMap = new Map([
  ["gd", "广东省"],
  ["shd", "山东省"],
  ["sc", "四川省"],
  ["gx", "广西省"],
  ["gzh", "贵州省"],
  ["js", "江苏省"],
  ["zhj", "浙江省"],
  ["cq", "重庆市"],
  ["hb", "湖北省"],
  ["heb", "河北省"],
  ["fj", "福建省"],
  ["jx", "江西省"],
  ["shx", "陕西省"],
  ["hun", "湖南省"],
  ["hen", "河南省"],
  ["hain", "海南省"]
])
