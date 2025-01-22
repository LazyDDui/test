{include file="./header.tpl"}

<div class="ur-here">
  <div class="w">
    <a href="/">首页</a> <span class="arrow"></span> <a href="/service/">服务与支持</a> <span class="arrow"></span> <a href="/service/video.html">操作视频</a> <span class="arrow"></span> <span>{$video.s_title}</span>  <a href="javascript:history.go(-1);" class="back"><i class="ico"></i> 返回</a>
  </div>
</div>

<div class="detail">
  <div class="w">
    <div class="tc news-title" style="padding-bottom: 15px;">{$video.s_title}</div>
    <div class="news-con">
      <video class="cicvideo" src="{$video.s_videourl}" controls poster="" webkit-playsinline="" playsinline="" type="video/mp4" style="object-fit: contain;"></video>
    </div>
    <!--
    <div class="tags">
      <span>标签：</span><a href="#">电子印章</a><a href="#">一章通用</a><a href="#">全国备案</a>
    </div>
    -->
  </div>
  <div class="help-center" style="padding-top: 30px;">
    <div  class="w">
      <h2 class="tc title">操作视频</h2>
      <div class="video-tabs">
        <div class="tab{if $video.s_type eq 1} active{/if}">
          <img src="/template/images/icoXcx.png"><span>国信公链电子印章小程序</span>
        </div>
        <div class="tab{if $video.s_type eq 2} active{/if}">
          <img src="/template/images/icoClient.png"><span>国信公链电子印章签章客户端</span>
        </div>
      </div>
      <div class="video-list">
        <ul class="user-guide"{if $video.s_type eq 2} style="display: none"{/if}>
          {foreach from=$xcx_video_list item=item}
            <li class="flex{if $video.s_id eq $item.s_id} active{/if}">
              <i class="ico icovideo"></i>
              <a href="{$item.f_url}" title="{$item.s_title}">{$item.s_title}</a>
              <span class="arrow"></span>
            </li>
          {/foreach}
        </ul>
        <ul class="user-guide"{if $video.s_type eq 1} style="display: none"{/if}>
          {foreach from=$client_video_list item=item}
            <li class="flex{if $video.s_id eq $item.s_id} active{/if}">
              <i class="ico icovideo"></i>
              <a href="{$item.f_url}" title="{$item.s_title}">{$item.s_title}</a>
              <span class="arrow"></span>
            </li>
          {/foreach}
        </ul>
      </div>
    </div>
  </div>
</div>
<div class="blank"></div>

{include file="./footer.tpl"}