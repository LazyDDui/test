{include file="./header.tpl"}

  <div class="ur-here">
    <div class="w">
      <a href="/">首页</a> <span class="arrow"></span> <a href="/service/">服务与支持</a> <span class="arrow"></span> <a href="/service/guide.html">使用手册</a> <span class="arrow"></span> <span>{$guide.c_name}</span>  <a href="javascript:history.go(-1);" class="back"><i class="ico"></i> 返回</a>
    </div>
  </div>

  <div class="detail">
    <div class="w">
      <div class="tc news-title" style="padding-bottom: 15px;">{$guide.c_name}</div>
      <div class="news-con">
        {$guide.c_description}
      </div>
      <!--
      <div class="tags">
        <span>标签：</span><a href="#">电子印章</a><a href="#">一章通用</a><a href="#">全国备案</a>
      </div>
      -->
    </div>
    <div class="help-center" style="padding-top: 30px;">
      <div  class="w">
        <h2 class="tc title">使用手册</h2>
        <ul class="user-guide">
          {foreach from=$dramaclub_list item=guide}
            <li class="flex">
              <i class="ico"></i>
              <a href="{$guide.f_url}" title="{$guide.c_name}">{$guide.c_name}</a>
              <span class="arrow"></span>
            </li>
          {/foreach}
        </ul>
      </div>
    </div>
  </div>
<div class="blank"></div>

{include file="./footer.tpl"}