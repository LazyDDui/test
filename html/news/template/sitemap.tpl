<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" />
    <meta name="keywords" content="{$siteKeywords}" />
    <meta name="description" content="{$siteDescription}" />
	<title>网站地图-{$siteName}</title>
  <style type="text/css">
  {literal}
    *{ margin: 0; padding: 0;}
    body {
      background: #eee;
      line-height: 160%;
    }
    a{ color: #666;}
    .time{ color:#666; font-size:14px;}
    .container {
      background: #fff;
      width: 900px;
      margin: 15px auto;
      border-radius: 10px;
      padding: 30px;
      box-shadow: 0 3px 3px #999;
    }
    @media screen and (max-width:768px) {
      .container{ width: auto; font-size: 14px;}
    }
  {/literal}
  </style>
</head>

<body>

  <div class="container">
    <div class="line">
      <ul>
      
        <li><a href="{$SITE_URL}/" title="全国电子印章管理与服务平台">全国电子印章管理与服务平台</a></li>

        <li><a href="{$SITE_URL}/product/" title="产品中心">产品中心</a></li>

        <li style="margin-left:2em;"><a href="{$SITE_URL}/saasapi/" title="SaasApi">SaasApi</a></li>
        <li style="margin-left:2em;"><a href="{$SITE_URL}/make/" title="国信公链电子印章制发客户端">国信公链电子印章制发客户端</a></li>
        <li style="margin-left:2em;"><a href="{$SITE_URL}/client/" title="国信公链电子印章签章客户端">国信公链电子印章签章客户端</a></li>
        <li style="margin-left:2em;"><a href="{$SITE_URL}/app/" title="国信公链电子印章APP">国信公链电子印章APP</a></li>

        <li><a href="{$SITE_URL}/solution/" title="解决方案">解决方案</a></li>

        <li><a href="{$SITE_URL}/service/" title="服务与支持">服务与支持</a></li>

		{foreach from=$service_list item=com}
		<li style="margin-left:2em;"><a href="{$SITE_URL}{$com.url}"><span>{$com.com_name}</span></a></li>
            {if $com.com_id eq 86}
                {foreach from=$dramaclub_list item=guide}
                    <li style="margin-left:4em;"><a href="{$SITE_URL}{$guide.f_url}" title="{$guide.c_name}">{$guide.c_name}</a></li>
                {/foreach}
            {/if}
            {if $com.com_id eq 85}
                {foreach from=$history_list item=history}
                    <li style="margin-left:4em;"><a href="{$SITE_URL}{$history.f_url}" title="{$history.s_title}">{$history.s_title}</a></li>
                {/foreach}
            {/if}
		{/foreach}

        <!--<li><a href="{$SITE_URL}/price/" title="产品定价">产品定价</a></li>-->

		<li><a href="{$SITE_URL}/news/" title="资讯动态">资讯动态</a></li>

	    {foreach from=$news_list item=news}
            <li style="margin-left:2em;"><a href="{$SITE_URL}{$news.f_url}" title="{$news.ktitle}">{$news.f_subject}</a><span class="time">({$news.f_addTime})</span></li>
	    {/foreach}
		
		<li><a href="{$SITE_URL}/about/" title="关于我们">关于我们</a></li>

		<li>标签</li>
		{foreach from=$all_tags_list item=tags}
		<li style="margin-left:2em;"><a href="{$SITE_URL}{$tags.url}" title="{$tags.tags_name}">{$tags.tags_name}</a></li>
		{/foreach}

      </ul>
    </div>
  </div>
</body>

</html>