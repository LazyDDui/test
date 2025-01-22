{include file="./header.tpl"}

<div class="ur-here">
  <div class="w">
    <a href="/">首页</a> <span class="arrow"></span> <span>{$tags.tags_name}</span>  <a href="javascript:history.go(-1);" class="back"><i class="ico"></i> 返回</a>
  </div>
</div>

  <div class="news tags-main">
    <div class="w">
      <div class="tags">
        <span>全部标签：</span>{foreach from=$all_tags_list item=alltags}<a href="{$alltags.url}" title="{$alltags.tags_name}"{if $alltags.tags_id eq $tags.tags_id} class="active"{/if}>{$alltags.tags_name}</a>{/foreach}
      </div>
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