<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="utf-8">
  <meta name="format-detection" content="email=no"/>
  <meta name="keywords" content="{$siteKeywords}" />
  <meta name="description" content="{$siteDescription}" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <script src="/template/js/jquery.min.js"></script>
  <script src="/template/js/jquery.mmenu.js"></script>
  <script src="/template/layer/layer.js"></script>
  <script src="/template/js/main.js{$version}"></script>
  <link href="/favicon.ico" rel="icon" />
  <link href="/template/css/global.css" rel="stylesheet" />
  <link href="/template/css/jquery.mmenu.css" rel="stylesheet" />
  <link href="/template/css/style.css{$version}" rel="stylesheet" />
  <title>{$siteTitle}</title>
</head>
<body{if $news.f_id || $video || $guide || $tags} class="news-detail"{elseif $bannerFocus} class="home"{/if}>
<div class="header">
  <div class="flex w">
    <div class="logo"><a href="/" title="{$siteName}"><img src="/template/images/icoguohui.png" /> <img src="/template/images/{if $bannerFocus}logo_white.png{else}logo.png{/if}" alt="{$siteName}"></a></div>
    <ul class="nav">
      <li><a href="/" {if $curpage eq 'home'} class="active"{/if} title="首页">首页</a></li>
      <li><a href="/product/"{if $curpage eq 'product'} class="active"{/if} title="产品中心">产品中心</a></li>
      <li><a href="/solution/"{if $curpage eq 'solution'} class="active"{/if} title="解决方案">解决方案</a></li>
      <li>
        <a href="javascript:;" rel="nofollow" {if $curpage eq 'service'} class="active"{/if} title="服务与支持">服务与支持</a>
        <ul class="child">
          <li><a href="/verify/" title="签章验证">签章验证</a></li>
          <li><a href="/service/" title="省级门户">省级门户</a></li>
        </ul>
      </li>
      <!--<li><a href="/price/"{if $curpage eq 'price'} class="active"{/if} title="产品定价">产品定价<span class="hot">HOT</span></a></li>-->
      <li><a href="/news/"{if $curpage eq 'news'} class="active"{/if} title="资讯动态">资讯动态</a></li>
      <li><a href="/about/"{if $curpage eq 'about'} class="active"{/if} title="关于我们">关于我们</a></li>
    </ul>
    <div class="tr phone">
      <div class="box none"><i class="ico ico-phone"></i> {$siteContactTel}</div>
      <a href="#mmenu" class="jq-mmenu"><span></span><span></span><span></span></a>
    </div>
  </div>
</div>