<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="keywords" content="{$siteKeywords}" />
    <meta name="description" content="{$siteDescription}" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="/favicon.ico" rel="icon" />
    <link rel="stylesheet" href="./template/product/app//css/common.css">
    <link rel="stylesheet" href="./template/product/app//css/index.css">
    <title>{$siteTitle}</title>
</head>
<body>
<div class="content">
    <div class="bigBox">
        <div class="left">
            <img class="mac" src="./template/product/app/img/app.png" alt="电子印章制作">
        </div>
        <div class="right">
            <a href="/" title="国信公链电子印章APP"><img class="logo" src="./template/product/app/img/logo.png" alt="国信公链电子印章APP"></a>
            <div class="title">
                <h2>国信公链电子印章APP</h2>
                <span class="span">国信公链电子印章APP</span>
            </div>

            <p>APP移动端极简应用，支持申领单位电子公章、个人电子私章申领、应用和管理。 </p>
            <img class="mactwo" src="./template/product/app/img/app.png" alt="">
            <div class="code">
                <div class="title">在线客服</div>
                <img class="img" src="./template/product/app/img/code.png" alt="">
            </div>
            <div class="phone"><span>服务热线：</span>400-115-9966</div>

            <a href="javascript:;" class="downloadBtn">
                <img src="./template/product/app/img/android.png" alt="">
                <span>Android下载</span>
            </a>
            <img class="gongan" src="./template/product/app/img/gongan.png" alt="">
        </div>
    </div>
    <div class="mobile-bottom">
        <img class="img" id="mobileBtn" src="./template/product/app/img/downloadBtn.png" alt="">
        <img class="imgtwo" src="./template/product/app/img/sansuo.png" alt="">
    </div>
</div>
<div class="pop" id="closeMask" style="display: none;">
    <img class="close" src="./template/product/app/img/ysj.png">
    <div class="mask"></div>
</div>
<script src="./template/js/jquery.min.js"></script>
<script src="/config.js"></script>
<script>
    let userAgent = navigator.userAgent.toLowerCase();
    let appDownloadUrl = downloadURL.app;
    let webUrl = "{$SITE_URL}/{$com.com_catalog}";
    $(".downloadBtn").click(function(){
        window.open(appDownloadUrl);
    })
    $("#mobileBtn").click(function(){
        if (userAgent.indexOf('micromessenger') !== -1) {
            $(".pop").show();
        }else{
            window.open(appDownloadUrl);
        }
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
