{include file="./header.tpl"}

  <div class="ur-here">
    <div class="w">
      <a href="/">首页</a> <span class="arrow"></span> <a href="/news/">资讯动态</a> <span class="arrow"></span> <span>{$news.f_subject}</span>  <a href="javascript:history.go(-1);" class="back"><i class="ico"></i> 返回</a>
    </div>
  </div>

  <div class="detail">
    <div class="w">
      <div class="tc news-title">{$news.f_subject}</div>
      <div class="tc news-other">
        <span></span>
        <span>日期：{$news.f_addTime}</span>
      </div>
      <div class="news-con">
        {$news.f_content}
        {if $news.f_upfile}<div class="download"><a href="/{$news.f_upfile}"><i class="ico ico-download"></i>点击下载附件</a></div>{/if}
        <div class="from">{if $news.f_from}来源:{$news.f_from}{/if}</div>
      </div>
      <div class="flex page-up-down">
        <p>上一篇：{$perv_article} </p>
        <p>下一篇：{$next_article} </p>
      </div>
      {if $news.f_tags_id}
      <div class="tags">
        <span>标签：</span>{foreach from=$news.tags_list item=tags}{if $tags.checked}<a href="{$tags.url}" title="{$tags.tags_name}">{$tags.tags_name}</a>{/if}{/foreach}
      </div>
      {/if}
    </div>
  </div>
<div class="blank"></div>

{include file="./footer.tpl"}