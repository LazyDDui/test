<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="keywords" content="{$siteKeywords}" />
    <meta name="description" content="{$siteDescription}" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="/favicon.ico" rel="icon" />
    <link rel="stylesheet" href="./template/product/make/css/common.css">
    <link rel="stylesheet" href="./template/product/make/css/index.css">
    <title>{$siteTitle}</title>
</head>
<body>
<div class="content">
    <div class="bigBox">
        <div class="left">
            <img class="mac" src="./template/product/make/img/make.png" alt="电子印章制作">
            <div class="left-bottom">
                <div class="btn">
                    <div class="btn-box">
                        <img src="./template/product/make/img/m-ico1.png" alt="公安备案">
                        <span>公安备案</span>
                    </div>
                </div>
                <div class="btn">
                    <div class="btn-box">
                        <img src="./template/product/make/img/m-ico2.png" alt="现场制发">
                        <span>现场制发</span>
                    </div>
                </div>
                <div class="btn">
                    <div class="btn-box">
                        <img src="./template/product/make/img/m-ico3.png" alt="同步发放">
                        <span>同步发放</span>
                    </div>
                </div>
                <div class="btn">
                    <div class="btn-box">
                        <img src="./template/product/make/img/m-ico4.png" alt="一键续期">
                        <span>一键续期</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="right">
            <a href="/" title="国信公链电子印章制发客户端"><img class="logo" src="./template/product/make/img/logo.png" alt="国信公链电子印章制发客户端"></a>
            <div class="title">
                <h2>国信公链电子印章制发客户端</h2>
                <span class="span">国信公链电子印章制发客户端</span>
            </div>

            <p>面向各省市终端刻章企业、服务网点提供的全国电子印章制发客户端，服务用户线下办理电子印章业务。</p>
            <img class="mactwo" src="./template/product/make/img/make.png" alt="">
            <div class="code">
                <div class="title">在线客服</div>
                <img class="img" src="./template/product/make/img/code.png" alt="在线客服">
            </div>
            <div class="phone"><span>服务热线：</span>400-115-9966</div>

            <a href="javascript:;" class="downloadBtn">
                <img src="./template/product/make/img/windos.png" alt="">
                <span>立即下载</span>
            </a>
            <img class="gongan" src="./template/product/make/img/gongan.png" alt="">
        </div>
    </div>
    <div class="flow">
        <div class="w">
            <div class="tc head">
                <h2>商务合作</h2>
            </div>
            <ul class="flex">
                <li><div class="item"><i class="ico ico-flow1"></i> <div class="name">洽谈合作</div><p>达成合作  签订协议</p></div> </li>
                <li><div class="item"><i class="ico ico-flow2"></i> <div class="name">申请授权</div><p>提交资料  申请经营授权</p></div> </li>
                <li><div class="item"><i class="ico ico-flow3"></i> <div class="name">开通账号</div><p>开通系统账号</p></div> </li>
                <li class="last"><div class="item"><i class="ico ico-flow4"></i> <div class="name">线上培训</div><p>产品培训   发相关资料</p></div> </li>
            </ul>
            <div class="flow-line"></div>
        </div>
    </div>
    <div class="mobile-bottom">
        <img class="img" id="mobileBtn" src="./template/product/make/img/downloadBtn.png" alt="">
        <img class="imgtwo" src="./template/product/make/img/sansuo.png" alt="">
    </div>
</div>
<div class="pop" style="display: none;">
    <div class="popmsg">
        <div class="con">
            <div class="ico"><img src="./template/product/make/img/ico-success@2x.png"></div>
            <div class="a1">链接复制成功！</div>
            <div class="a2">请使用PC浏览器打开</div>
        </div>
        <div class="btn" id="closeMask">
            我知道了
        </div>
    </div>
    <div class="mask"></div>
</div>
<script src="./template/js/jquery.min.js"></script>
<script src="/config.js"></script>
<script>
    let makeDownloadUrl = downloadURL.make;
    let webUrl = "{$SITE_URL}/{$com.com_catalog}";
    $(".downloadBtn").click(function(){
        window.open(makeDownloadUrl);
    })
    $("#mobileBtn").click(function(){
        getCopyLink(webUrl);
    })
    $("#closeMask").click(function(){
        $(".pop").hide();
    })
    function getCopyLink (mobileLink) {
        const input = document.createElement('input')
        input.style.cssText = 'opacity: 0';
        input.type = 'text';
        input.value = mobileLink;
        document.body.appendChild(input)
        input.select();
        document.execCommand("copy");
        input.remove();
        $(".pop").show();
    }
</script>
</body>
</html>
