{include file="./header.tpl"}

  <div class="flex banner" style="background-image: url('/template/images/banner-price.jpg')">
    <div class="w">
      <div class="text">产品定价 </div>
      <p>多种套餐满足不同的使用需求</p>
    </div>
  </div>

  <div class="tc saas-tabs saas-tabs-price">
    <div class="item active" data-type="price">
      <i class="ico ico-sealunit"></i>
      <p>单位公章</p>
    </div>
    <div class="item" data-type="price">
      <i class="ico ico-sealperson"></i>
      <p>个人私章</p>
    </div>
  </div>

  <div class="w price-box">

    <div class="saas-con">
      <div class="swiper unitSealPrice-swiper">
        <div class="swiper-wrapper">
          <!--
          <div class="flex swiper-slide">
            <div class="flex item">
              <span class="free-tags">申领免费</span>
              <div class="name">30天免费签署权益</div>
              <div class="price"><b>0</b><span>元</span></div>
              <a class="btn btn-apply" href="/service/">立即申领</a>
              <i class="ico"></i>
            </div>
          </div>
          -->
          <div class="flex swiper-slide">
            <div class="flex item">
              <span class="recommend-tags">年服务费</span>
              <div class="name">不限份数签署</div>
              <div class="price"><b>298</b><span>元/年</span></div>
              <a class="btn btn-apply" href="/service/">立即申领</a>
              <i class="ico"></i>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>

    <div class="saas-con" style="display: none;">
      <div class="swiper personSealPrice-swiper">
        <div class="swiper-wrapper">
          <!--
          <div class="flex swiper-slide">
            <div class="flex item">
              <span class="free-tags">申领免费</span>
              <div class="name">2份免费签署权益</div>
              <div class="price"><b>0</b><span>元</span></div>
              <a class="btn btn-apply" href="/service/">立即申领</a>
              <i class="ico"></i>
            </div>
          </div>
          -->
          <div class="flex swiper-slide">
            <div class="flex item">
              <span class="recommend-tags">年服务费</span>
              <div class="name">不限份数签署</div>
              <div class="price"><b>50</b><span>元/年</span></div>
              <a class="btn btn-apply" href="/service/">立即申领</a>
              <i class="ico"></i>
            </div>
          </div>
          <div class="flex swiper-slide">
            <div class="flex item">
              <div class="name">20份签署权益</div>
              <div class="price"><b>10</b><span>元</span></div>
              <a class="btn btn-apply" href="/service/">立即申领</a>
              <i class="ico"></i>
            </div>
          </div>
          <div class="flex swiper-slide">
            <div class="flex item">
              <div class="name">1份签署权益</div>
              <div class="price"><b>1</b><span>元</span></div>
              <a class="btn btn-apply" href="/service/">立即申领</a>
              <i class="ico"></i>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </div>

  <script src="/template/js/swiper-bundle.min.js"></script>
  <link rel="stylesheet" href="/template/css/swiper-bundle.min.css" />

{include file="./footer.tpl"}