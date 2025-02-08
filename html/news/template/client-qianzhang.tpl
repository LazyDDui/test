<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="keywords" content="{$siteKeywords}" />
    <meta name="description" content="{$siteDescription}" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="/favicon.ico" rel="icon" />
    <link rel="stylesheet" href="./template/product/client/css/common.css">
    <link rel="stylesheet" href="./template/product/client/css/index.css">
    <title>{$siteTitle}</title>
</head>
<body>
<div class="content">
    <div class="bigBox">
        <div class="left">
            <img class="mac" src="./template/product/client/img/mac.png" alt="">
            <div class="left-bottom">
                <div class="btn">
                    <div class="btn-box">
                        <img src="./template/product/client/img/page01.png" alt="本地化">
                        <span>本地化</span>
                    </div>
                </div>
                <div class="btn">
                    <div class="btn-box">
                        <img src="./template/product/client/img/page02.png" alt="大文件">
                        <span>大文件</span>
                    </div>
                </div>
                <div class="btn">
                    <div class="btn-box">
                        <img src="./template/product/client/img/page03.png" alt="国密算法">
                        <span>国密算法</span>
                    </div>
                </div>
                <div class="btn">
                    <div class="btn-box">
                        <img src="./template/product/client/img/page04.png" alt="便捷安装">
                        <span>便捷安装</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="right">
            <a href="/" title="国信公链电子印章签章客户端"><img class="logo" src="./template/product/client/img/logo.png" alt="国信公链电子印章签章客户端"></a>
            <div class="title">
                <h2>国信公链电子印章签章客户端</h2>
                <span class="span">国信公链电子印章签章客户端</span>
            </div>

            <p>本地化签章客户端，实现本地文件签章、骑缝章、多页签章、大文件签章、文档查验等功能。</p>
            <img class="mactwo" src="./template/product/client/img/mac.png" alt="">
            <div class="code">
                <div class="title">在线客服</div>
                <img class="img" src="./template/product/make/img/code.png" alt="在线客服">
            </div>
            <div class="phone"><span>服务热线：</span>400-115-9966</div>

            <a href="javascript:;" class="downloadBtn">
                <img src="./template/product/client/img/windos.png" alt="">
                <span>立即下载</span>
            </a>
            <img class="gongan" src="./template/product/client/img/gongan.png" alt="">
        </div>
    </div>
    <div class="mobile-bottom">
        <img class="img" id="mobileBtn" src="./template/product/client/img/downloadBtn.png" alt="">
        <img class="imgtwo" src="./template/product/client/img/sansuo.png" alt="">
    </div>
</div>
<div class="pop" style="display: none;">
    <div class="popmsg">
        <div class="con">
            <div class="ico"><img src="./template/product/client/img/ico-success@2x.png"></div>
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
    let clientDownloadUrl = downloadURL.client;
    let webUrl = "{$SITE_URL}/{$com.com_catalog}";
    $(".downloadBtn").click(function(){
        window.open(clientDownloadUrl);
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
