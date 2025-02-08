{include file="./header.tpl"}

  <div class="flex banner banner-about" style="background-image: url('./template/images/banner-about.jpg')" data-wap="./template/images/banner-about-wap.jpg">
    <div class="w">
      <div class="text">关于我们 </div>
      <p>“<a href="https://www.ciceseal.com/">全国电子印章管理与服务平台</a>”基于国家发改委数字经济试点重大工程项目，在公安部第三研究所指导下遵循国家顶层规范和标准建成，“全国电子印章管理与服务平台32个省级平台”面向全国企事业单位、个体工商户、个人提供优质的电子印章服务，优化线上办事流程、创新政企服务模式，助力经济发展降本、提质、增效。</p>
    </div>
  </div>

  <div class="about">
    <div class="w flex">
      <div class="img"><img src="./template/images/about.jpg"></div>
      <div class="info">
          <h2>了解我们</h2>
          <div class="con">
            <p>平台提供电子印章申领、备案、签章、核验等全生命周期管理，实现电子印章跨地区、跨部门签章及核验。</p>
            <p>平台为每一枚电子印章提供由公安部第三研究所出具的具有司法效力的唯一备案证明，从源头上保证电子印章制作过程的合规性、印章数据的真实性及有效性。</p>
            <p>平台制发的电子印章，签署的电子签章文件，支持全国32个省级平台进行统一验证，全国互通互认。</p>
            <p>电子印章适用于电子公文、电子证照、电子票据、电子合同等众多场景，应用于金融、能源、交通、住建、教育、医疗等诸多行业。</p>
            <p><a href="https://www.ciceseal.com/">全国电子印章管理与服务平台省级平台</a>，打通应用层级、区域、部门壁垒，助力“高效办成一件事”，支撑政务服务“一网通办”为构建诚信社会夯实基础，为数字经济发展充盈动力。</p>
          </div>
      </div>
    </div>
  </div>

  <div class="office">
    <div class="w">
      <div class="tc head">
        <h2>办公地址</h2>
      </div>
      <ul class="flex">
        {foreach from=$address_list item=address}
        <li>
          <a rel="nofollow" title="{$address.add_name_text}" class="img transform-img"><img src="/{$address.add_pic}" alt="{$address.add_name_text}"></a>
          <a rel="nofollow" title="{$address.add_name_text}">
            <h2>{$address.add_name}</h2>
            <p><span class="a1">地址：</span><span class="a2">{$address.add_content}</span></p>
          </a>
        </li>
        {/foreach}
      </ul>
    </div>
  </div>

  <div class="contact">
    <div class="w">
      <div class="tc head">
        <h2>联系我们</h2>
      </div>
      <ul class="flex">
        <li>
          <div class="item">
            <div class="top"><i class="ico ico-c1"></i><strong>渠道合作</strong></div>
            <p class="desc">咨询商务、媒体、渠道、活动等市场合作</p>
            <div class="no">{$site.siteContactTel}</div>
          </div>
        </li>
        <li>
          <div class="item">
            <div class="top"><i class="ico ico-c2"></i><strong>产品服务</strong></div>
            <p class="desc">专业客户支持，极速解决技术难题</p>
            <div class="no">{$site.siteContactMobile}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <div class="attention">
    <div class="w">
      <div class="tc head">
        <h2>关注我们</h2>
      </div>
      <ul class="flex">
        <li class="flex">
          {if $sph_qrcode.ad_pic}
          <div class="img"><img src="{$sph_qrcode.ad_pic}" alt="{$sph_qrcode.ad_notes}"></div>
          <p>{$sph_qrcode.ad_name}</p>
          {/if}
        </li>
        <li class="flex">
          {if $dyh_qrcode.ad_pic}
          <div class="img"><img src="{$dyh_qrcode.ad_pic}" alt="{$dyh_qrcode.ad_notes}"></div>
          <p>{$dyh_qrcode.ad_name}</p>
          {/if}
        </li>
        <li class="flex">
          {if $gzh_qrcode.ad_pic}
          <div class="img"><img src="{$gzh_qrcode.ad_pic}" alt="{$gzh_qrcode.ad_notes}"></div>
          <p>{$gzh_qrcode.ad_name}</p>
          {/if}
        </li>
      </ul>
    </div>
  </div>

{include file="./footer.tpl"}
