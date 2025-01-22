$(function() {
    showMmenu();
    fixed_menu(".header");
    banner_swiper();
    unitSealPrice_swiper();
    $(window).on('resize', function() {
        //showMmenu();
        banner_swiper();
        unitSealPrice_swiper();
        personSealPrice_swiper();
    });
    $(document).scroll(function() {
        let scrollPosition = $(document).scrollTop();
        if (scrollPosition > 100) {
            $('.toTop').fadeIn();
        } else {
            $('.toTop').fadeOut();
        }
    })
    //返回顶部
    $('.toTop a').click(function() {
        $('body,html').animate({ scrollTop: 0 }, 500); // 点击按钮后，页面滚动到顶部，动画时间为500毫秒
    });

    $(".tabs-menu li").hover(function(){
        let index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $(".tabs-con .content").hide();
        $(".tabs-con .content").eq(index).show();
    })
    $(".case-tabs li").hover(function(){
        var index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $(".case-con .content").hide();
        $(".case-con .content").eq(index).show();
    })
    $(".faq-tabs li").click(function(){
        var index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $(".faq-con").hide();
        $(".faq-con").eq(index).show();
    })
    $(".faq-con dt").click(function() {
        $(this).parent().toggleClass('active');
        $(this).parent().siblings().removeClass('active');
    });
    $(".video-tabs .tab").click(function() {
        var index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $(".video-list .user-guide").hide();
        $(".video-list .user-guide").eq(index).show();
    });
    $(".saas-tabs .item").click(function(){
        let index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $(".saas-con").hide();
        $(".saas-con").eq(index).show();
        if($(this).data('type') == 'price'){
            if(index == 0){
                unitSealPrice_swiper();
            }else if(index == 1){
                personSealPrice_swiper();
            }
        }
    })
    $(".sidebar ul").hover(function(){
        $(this).find('.item').stop(true).css("right", "64px");
    },function(){
        $(this).find('.item').stop(true).css("right", "-300px");
    })
    if($("body").width() <= 768) {
        $('.sidebar .b, .popup .flex').click(function () {
            let phone = $(this).find("b").text();
            window.location.href = "tel:" + phone;
        })
        $('.contact .no').click(function () {
            let phone = $(this).text();
            window.location.href = "tel:" + phone;
        })
    }
    $('.btn-search').click(function(){
        let keywords = $('.search .input').val();
        console.log(keywords);
        if(keywords == ''){
            $('.faq-con li').each(function(){
                let html = $(this).find('dt').html();
                let text =  $(this).find('dt').find('.f0').html();
                html  = html.replace('<font class="f0">' + text + '</font>', text);
                $(this).find('dt').html(html);
                $(this).show();
            })
        }else{
            keywords = keywords.replace(/\s/g, '');
            //keywords = specialStr(keywords);
            $('.faq-con li').each(function(){
                let html = $(this).find('dt').text();
                if (html.includes(keywords)) {
                    html  = html.replace(keywords, '<font class="f0">' + keywords + '</font>');
                    $(this).find('dt').html(html);
                    $(this).show();
                } else {
                    $(this).hide();
                }
            })
        }
    })
    $('.apply-to-use .btn').click(function() {
        layer_tks();
    });
})

function layer_tks(){
    let index = layer.open({
        type: 1,
        title: false,
        closeBtn: 0,
        shadeClose: true,
        skin: 'layer-tks',
        content:  $('.popup')
    });
    $('.popup .ico-close').click(function(){
        layer.close(index);
    })
}

//首页轮播大图
function banner_swiper(){
    let contentHeight = $(window).innerHeight();
    if($(".banner-swiper").length > 0){
        if($("body").width() <= 768){
            $(".banner-full .swiper-slide").each(function(){
                $(this).css("background-image", "url('"+$(this).data('wap')+"')");
            })
        }
        let swiper = new Swiper(".banner-swiper", {
            spaceBetween: 30,
            effect: "fade",
            loop:true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
        $(".banner-full").height(contentHeight);
    }
    if($(".product-banner").length > 0){
        $(".product-banner").height(contentHeight);
        if($("body").width() <= 768) {
            $(".product-banner").css("background-image", "url('" + $(".product-banner").data('wap') + "')");
        }
    }
    if($(".banner-about").length > 0){
        if($("body").width() <= 768) {
            $(".banner-about").css("background-image", "url('" + $(".banner-about").data('wap') + "')");
        }
    }
}


//私章切换
function unitSealPrice_swiper(){
    if($(".unitSealPrice-swiper").length > 0){
        if($("body").width() > 768) {
            let swiper = new Swiper(".unitSealPrice-swiper", {
                slidesPerView: 1,
                spaceBetween: 0,
                pagination: {
                    el: ".unitSealPrice-swiper .swiper-pagination",
                    clickable: true,
                },
            });
        }else{
            let swiper = new Swiper(".unitSealPrice-swiper", {
                slidesPerView: 1,
                spaceBetween: 0,
                pagination: {
                    el: ".unitSealPrice-swiper .swiper-pagination",
                    clickable: true,
                },
            });
        }
    }
}
//公章切换
function personSealPrice_swiper(){
    if($(".personSealPrice-swiper").length > 0){
        if($("body").width() > 768) {
            let swiper = new Swiper(".personSealPrice-swiper", {
                slidesPerView: 3,
                spaceBetween: 0,
                pagination: {
                    el: ".personSealPrice-swiper .swiper-pagination",
                    clickable: true,
                },
            });
        }else{
            let swiper = new Swiper(".personSealPrice-swiper", {
                slidesPerView: 1,
                spaceBetween: 0,
                pagination: {
                    el: ".personSealPrice-swiper .swiper-pagination",
                    clickable: true,
                },
            });
        }
    }
}

//固定头部
function fixed_menu(obj){
	$(window).scroll(function () {
		if ($(window).scrollTop() > 0) {
			$(obj).addClass("stick");
            $("body .logo").find('img').attr('src', 'https://www.ciceseal.com/template/images/logo.png');
		}else{
			$(obj).removeClass("stick");
            $("body.home .logo").find('img').attr('src', 'https://www.ciceseal.com/template/images/logo_white.png');
		}
	});	
};

//移动端菜单
function showMmenu(){
    const winWidth = $("body").width();
    let navHtml = $(".header .nav").html();
    if(winWidth > 768){
        $(".header .nav").show();
    }else{
        $(".header .nav").hide();
        $('#mmenu ul').html(  navHtml );//'<i class="ico ico-close" id="close-menu"></i>' +
        $('#mmenu').mmenu({
            position	: 'right',
            classes		: 'mm-white',
            counters	: false,
            searchfield	: false,
            labels		: {
                fixed	: !$.mmenu.support.touch
            },
            header		: {
                add	    : true,
                update	: true,
                title   : "<h1>网站标题</h1>",
            }
        });
    }
    $(".jq-mmenu").on('click', function() {
        $(".header").css('position', 'inherit');
    });
    $("#mmenu").on("closed.mm", function() {
        $(".header").css('position', 'fixed');
    });
    $('#close-menu').on('click', function() {
        // 关闭当前打开的菜单
        $(".mm-opened").trigger("close.mm");
    });
}


//特殊字符
function specialStr(s)
{
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs+s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}