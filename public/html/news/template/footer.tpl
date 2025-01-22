  <div class="tc footer">
    <div class="links">
      <dl class="flex">
        <dt>友情链接：</dt>
        <dd><a href="https://www.gaskmp.cn/" target="_blank"><img src="./template/images/links1.png" alt="公安部第三研究所"></a></dd>
        <dd>|</dd>
        <dd><a href="https://www.gaskmp.cn/" target="_blank"><img src="./template/images/links2.png" alt="全国印章综合服务平台"></a></dd>
      </dl>
    </div>
    <div class="copyright">{$siteCopyright} <a href="https://beian.miit.gov.cn/" target="_blank">{$siteBeianIcp}</a> <a class="sitemap" href="/sitemap.html" target="_blank">网站地图</a></div>
  </div>
  <nav id="mmenu"><ul></ul></nav>
  <div class="sidebar">
        <ul>
            <li><a href="/feedback"><img src="./template/images/icofeedback.png" class="ico" /><span>建议反馈</span></a></li>
        </ul>
  </div>
  <div class="none toTop"><a href="#" class="flex"><i class="ico ico-top"></i><span>返回顶部</span></a></div>
  <div class="popup">
      <i class="ico ico-close"></i>
      <h2>商务合作</h2>
      <div class="flex">
          <dl>
              <dt>合作电话</dt>
              <dd><img src="./template/images/icophonebig.png" /> <p><b>{$site.siteContactTel}</b></p></dd>
          </dl>
          {if $kf_qrcode}
          <dl>
              <dt>客服微信</dt>
              <dd><img src="{$kf_qrcode.ad_pic}" alt="{$kf_qrcode.ad_notes}"> <p>微信扫一扫</p></dd>
          </dl>
          {/if}
      </div>
  </div>
</body>
</html>
