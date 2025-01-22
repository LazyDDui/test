{include file="./header.tpl"}

  <div class="flex banner" style="background-image: url('/template/images/banner-news.jpg')">
    <div class="w">
      <div class="text">资讯动态</div>
      <p>关注资讯动态，了解行业最新成果</p>
    </div>
  </div>

  <div class="news">
    <div class="w">
      <ul class="flex top-news">
        {foreach from=$newslist item=news}
        <li>
          <a href="{$news.f_url}" title="{$news.f_subject}" class="img transform-img"><img src="{$news.f_pic}" alt="{$news.f_subject}"></a>
          <div class="con">
            <a href="{$news.f_url}" title="{$news.f_subject}"><h2>{$news.f_subject}</h2></a>
            <p class="flex"><span>{$news.f_addTime}</span><a href="{$news.f_url}" title="{$news.f_subject}">详情<i class="arrow"></i></a></p>
          </div>
        </li>
        {/foreach}
      </ul>
      <div class="pages">{$pages}</div>

    </div>
  </div>
<div class="blank"></div>

{include file="./footer.tpl"}