{include file="./header.tpl"}

  <div class="flex banner" style="background-image: url('./template/images/banner-service.jpg')">
    <div class="w">
      <div class="text">省级门户</div>
      <p>全国电子印章管理与服务平台省级服务门户，提供面向各省用户的统一服务入口，所有通过公安备案的电子印章签署的文件支持在任何时间、任何省级平台进行统一验证，实现电子印章全国互通互认。</p>
    </div>
  </div>

  <div class="site-box">
    <div class="w">
      <div class="tc head">
        <h2>全国电子印章管理与服务平台省级服务门户</h2>
      </div>
      <div class="sites flex">
        {foreach from=$friendlinks_list item=links}
          <a href="{$links.links_url}" target="_blank" class="flex"><i class="ico ico-guohui2"></i><p>{$links.links_name}</p><span class="arrow-right"></span></a>
        {/foreach}
      </div>
    </div>
  </div>

  <div class="service">
    <div class="w">
      <ul class="flex">
        <li>
          <div class="item">
            <i class="ico ico-ser1"></i>
            <div class="name">常见问题</div>
            <p class="desc">高效、贴心、专业的服务体验</p>
            <a href="/service/faq.html" class="btn btn-detail">查看详情</a>
          </div>
        </li>
        <li>
          <div class="item">
            <i class="ico ico-ser2"></i>
            <div class="name">操作视频</div>
            <p class="desc">丰富全面的操作视频</p>
            <a href="/service/video.html" class="btn btn-detail">查看详情</a>
          </div>
        </li>
        <li>
          <div class="item">
            <i class="ico ico-ser3"></i>
            <div class="name">使用手册</div>
            <p class="desc">迅速上手电子印章</p>
            <a href="/service/guide.html" class="btn btn-detail">查看详情</a>
          </div>
        </li>
        <li>
          <div class="item">
            <i class="ico ico-ser4"></i>
            <div class="name">在线客服</div>
            <p class="desc">高效、贴心、专业的服务体验</p>
            <a href="/contact/" class="btn btn-detail">查看详情</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
{if $com.com_id eq 84}
  <div class="help-center">
    <div  class="w">
      <h2 class="tc title">常见问题</h2>
      <div class="flex search">
        <input type="text" placeholder="请输入问题的关键词搜索" class="input" />
        <button class="btn btn-search">立即查询</button>
      </div>
      <ul class="flex faq-tabs">
        {foreach from=$photo_cat_list item=cat name=i}
          <li{if $smarty.foreach.i.first} class="active"{/if}><div class="item">{$cat.cat_name}</div> </li>
        {/foreach}
      </ul>
      {foreach from=$photo_cat_list item=cat name=i}
      <div class="faq-con" {if !$smarty.foreach.i.first} style="display: none;"{/if}>
        <ul>
          {foreach from=$cat.child item=photo}
          <li>
            <dt><i class="arrow fr"></i> <span>{$photo.p_name}</span></dt>
            <dd class="con">
              {$photo.p_content}
            </dd>
          </li>
          {/foreach}
        </ul>
      </div>
      {/foreach}
    </div>
  </div>
  <div class="blank"></div>
{/if}
{if $com.com_id eq 87}
  <div class="help-center">
    <div  class="w">
      <h2 class="tc title">在线客服</h2>
      <div class="ad"><img src="./template/images/contact.jpg"> </div>
    </div>
  </div>
  <div class="blank"></div>
{/if}
{if $com.com_id eq 86}
  <div class="help-center">
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
  <div class="blank"></div>
{/if}
{if $com.com_id eq 85}
  <div class="help-center">
    <div  class="w">
      <h2 class="tc title">操作视频</h2>
      <div class="video-tabs">
        <div class="tab active">
          <img src="./template/images/icoXcx.png"><span>国信公链电子印章小程序</span>
        </div>
        <div class="tab">
          <img src="./template/images/icoClient.png"><span>国信公链电子印章签章客户端</span>
        </div>
      </div>
      <div class="video-list">
        <ul class="user-guide">
          {foreach from=$xcx_video_list item=video}
          <li class="flex">
            <i class="ico icovideo"></i>
            <a href="{$video.f_url}" title="{$video.s_title}">{$video.s_title}</a>
            <span class="arrow"></span>
          </li>
          {/foreach}
        </ul>
        <ul class="user-guide" style="display: none">
          {foreach from=$client_video_list item=video}
            <li class="flex">
              <i class="ico icovideo"></i>
              <a href="{$video.f_url}" title="{$video.s_title}">{$video.s_title}</a>
              <span class="arrow"></span>
            </li>
          {/foreach}
        </ul>
      </div>
    </div>
  </div>
  <div class="blank"></div>
{/if}

<script>
  $(function(){
    if($('.help-center').length > 0) {
      $('html, body').animate({
        scrollTop: $('.help-center').offset().top
      }, 'slow');
    }
  });
</script>

{include file="./footer.tpl"}
