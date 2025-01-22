{include file="./header.tpl"}

  <script src="./template/js/swiper-bundle.min.js"></script>
  <link rel="stylesheet" href="./template/css/swiper-bundle.min.css" />
  <div class="swiper banner-swiper banner-full">
    <div class="swiper-wrapper">
      {foreach from=$bannerFocus item=ads}
      <div class="flex swiper-slide" style="background-image: url('{$ads.ad_pic}')" data-wap="{$ads.ad_pic_wap}">
        <div class="w">
          <div class="text"><i class="ico ico-guohui"></i> <h1>全国电子印章</h1>管理与服务平台省级平台 </div>
          <p class="slogan"><span>公安备案</span><span>全国互认</span><span>一键核验</span></p>
          <a href="/service/" class="btn btn-free none">立即申领</a>
        </div>
      </div>
      {/foreach}
    </div>
    <div class="swiper-pagination"></div>
  </div>

  <div class="w part1">
    <div class="flex main">
      <ul class="tabs-menu">
        <li class="active"><i class="ico ico-tbas1"></i>公安备案</li>
        <li><i class="ico ico-tbas2"></i>全国互认</li>
        <li><i class="ico ico-tbas3"></i>一键核验</li>
        <li><i class="ico ico-tbas4"></i>安全管理</li>
        <li><i class="ico ico-tbas5"></i>安全签署</li>
      </ul>
      <div class="tabs-con">
        <div class="content">
          <div class="img"><img src="./template/images/gaba.png"></div>
          <dl>
            <dt>公安备案</dt>
            <dd><p><a href="https://www.ciceseal.com/">全国电子印章管理与服务平台省级平台</a>制发的电子印章具备公安部第三研究所开具的唯一电子印章备案证明，具备权威性和公信力。</p></dd>
            <dd class="links"><span class="tc">即刻申领</span><span class="tc">全国备案</span><span class="tc">安全应用</span></dd>
          </dl>
        </div>
        <div class="content" style="display: none;">
          <div class="img"><img src="./template/images/qghr.png"></div>
          <dl>
            <dt>全国互认</dt>
            <dd><p><a href="https://www.ciceseal.com/">全国电子印章管理与服务平台省级平台</a>制发的电子印章，签署的电子签章文件，能在全国32个省级平台进行统一验证，全国互通互认。</p></dd>
            <dd class="links"><span class="tc">签署保密</span><span class="tc">统一验证</span><span class="tc">全国互认</span></dd>
          </dl>
        </div>
        <div class="content" style="display: none;">
          <div class="img"><img src="./template/images/yzty.png"></div>
          <dl>
            <dt>一键核验</dt>
            <dd><p><a href="https://www.ciceseal.com/">全国电子印章管理与服务平台省级平台</a>规范电子印章制作、备案及用章流程，实现电子印章跨区域、跨部门、跨平台应用。</p></dd>
            <dd class="links"><span class="tc">多端互通</span><span class="tc">一键核验</span><span class="tc">便捷高效</span></dd>
          </dl>
        </div>
        <div class="content" style="display: none;">
          <div class="img"><img src="./template/images/aqgl.png"></div>
          <dl>
            <dt>安全管理</dt>
            <dd><p>基于商用密码技术和完善的电子印章安全防护能力和密钥管理机制，实现密钥全生命周期的安全管理，保障用印安全。</p></dd>
            <dd class="links"><span class="tc">密钥管理系统</span><span class="tc">专用智能密码钥匙</span></dd>
          </dl>
        </div>
        <div class="content" style="display: none;">
          <div class="img"><img src="./template/images/aqqs.png"></div>
          <dl>
            <dt>安全签署</dt>
            <dd><p><a href="https://www.ciceseal.com/">电子印章</a>的应用，通过身份认证、意愿认证、商用密码技术、可信时间戳等能力，为用户提供安全、可靠的用印服务。</p></dd>
            <dd class="links"><span class="tc">全链路存证</span><span class="tc">可信时间戳</span></dd>
          </dl>
        </div>
      </div>
    </div>
  </div>

  <div class="part2">
    <div class="w">
      <div class="tc head">
        <h2>智能解决方案</h2>
        <p>构建场景化电子签章应用，依照业务需求提供丰富的行业及场景的签字签章应用选项，满足多样化签署需求，围绕政务服务、能源、医疗、金融、教育、电商、快消等行业，输出细分领域解决方案，提供全面市场支持服务。</p>
      </div>
      <ul class="flex case-tabs">
        <li class="active"><div class="item"><i class="ico ico-case1"></i><strong>政务服务</strong></div></li>
        <li><div class="item"><i class="ico ico-case2"></i><strong>能源行业</strong></div></li>
        <li><div class="item"><i class="ico ico-case3"></i><strong>医疗行业</strong></div></li>
        <li><div class="item"><i class="ico ico-case4"></i><strong>金融行业</strong></div></li>
        <li><div class="item"><i class="ico ico-case5"></i><strong>教育行业</strong></div></li>
        <li><div class="item"><i class="ico ico-case6"></i><strong>电商行业</strong></div></li>
        <li><div class="item"><i class="ico ico-case7"></i><strong>快消行业</strong></div></li>
      </ul>
      <div class="case-con">
        <div class="content">
          <div class="flex">
            <div class="info">
                <h2>政务服务</h2>
                <p>实现<a href="https://www.ciceseal.com/">电子印章</a>在政务服务中的应用，推动行政审批和许可证件的电子化管理，提高政务服务的效率，助力政府数字化转型和智慧政务建设。</p>
            </div>
            <div class="img"><img src="./template/images/zwfw.jpg" alt="政务服务" /></div>
          </div>
        </div>
        <div class="content none">
          <div class="flex">
            <div class="info">
              <h2>能源行业</h2>
              <p>适用于庞大组织架构下的印控管理，实现用印权限精准分配，确保每一项操作都在授权范围内。</p>
            </div>
            <div class="img"><img src="./template/images/nyhy.jpg" alt="能源行业" /></div>
          </div>
        </div>
        <div class="content none">
          <div class="flex">
            <div class="info">
              <h2>医疗行业</h2>
              <p>提供通过手写板采集身份证信息、手绘签名的电子签署方案，帮助患者快速签署医疗文书。</p>
            </div>
            <div class="img"><img src="./template/images/ylhy.jpg" alt="医疗行业" /></div>
          </div>
        </div>
        <div class="content none">
          <div class="flex">
            <div class="info">
              <h2>金融行业</h2>
              <p>提供人脸、音频等多种意愿认证签署方式，让金融业务更加安全、合规。</p>
            </div>
            <div class="img"><img src="./template/images/jrhy.jpg" alt="金融行业" /></div>
          </div>
        </div>
        <div class="content none">
          <div class="flex">
            <div class="info">
              <h2>教育行业</h2>
              <p>集成学校教务管理系统，推动电子成绩单、电子学籍证明在线签发、学信网验真。</p>
            </div>
            <div class="img"><img src="./template/images/jyhy.jpg" alt="教育行业" /></div>
          </div>
        </div>
        <div class="content none">
          <div class="flex">
            <div class="info">
              <h2>电商行业</h2>
              <p>为电商交易提供合规的签署和认证，服务包括订单、物流、供应链管理、售后、交易纠纷等各环节，提高交易的安全性、便捷性，为买卖双方提供更好的交易体验。</p>
            </div>
            <div class="img"><img src="./template/images/dshy.jpg" alt="电商行业" /></div>
          </div>
        </div>
        <div class="content none">
          <div class="flex">
            <div class="info">
              <h2>快消行业</h2>
              <p>实现不受时间地域限制的在线签署功能，助力快消企业高效地整合行业优质资源，提升购销流程效率，保障生产经营秩序的正常运行。</p>
            </div>
            <div class="img"><img src="./template/images/kxhy.jpg" alt="快消行业" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="part3">
    <div class="w">
      <div class="tc head">
        <h2>多场景 全平台</h2>
        <p>满足不同的签署场景，用户可直接登录<a href="https://www.ciceseal.com/">全国电子印章管理与服务平台</a>进行在线签署和管理，也可通过SAAS API接入第三方系统完成合同签署</p>
      </div>
      <ul class="flex scene">
        <li class="transform-img">
          <img src="./template/images/scene1.png" alt="App/H5/小程序">
          <h2>App/H5/小程序</h2>
          <p>移动端</p>
        </li>
        <li class="transform-img">
          <img src="./template/images/scene2.png" alt="服务门户/本地签章客户端">
          <h2>服务门户/本地签章客户端</h2>
          <div class="ico icoukeyimg"></div>
          <p>PC端</p>
        </li>
        <li class="transform-img">
          <img src="./template/images/scene3.png" alt="Saas API接口">
          <h2>Saas API接口</h2>
          <p>第三方接口</p>
        </li>
      </ul>
    </div>
  </div>

  <div class="part4">
    <div class="w">
      <div class="tc head">
        <h2>资讯动态</h2>
      </div>
      <ul class="flex top-news">
        {foreach from=$rec_pic_news item=news}
        <li>
          <a href="{$news.f_url}" class="img transform-img"><img src="{$news.f_pic}" alt="{$news.f_subject}"></a>
          <div class="con">
            <a href="{$news.f_url}" title="{$news.f_subject}"><h2>{$news.f_subject}</h2></a>
            <p class="flex"><span>{$news.f_addTime}</span><a href="{$news.f_url}" title="{$news.f_subject}">详情 <i class="arrow"></i></a></p>
          </div>
        </li>
        {/foreach}
      </ul>
    </div>
  </div>

{include file="./footer.tpl"}
