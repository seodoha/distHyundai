"use strict";

var uiCommon = function (uiCommon, $window) {
  uiCommon.init = function () {
    uiCommon.gnb.init(); // GNB

    uiCommon.component.init(); // 컴포넌트

    uiCommon.mc.init(); // 개인용
  };

  uiCommon.gnb = {
    init: function init() {
      uiCommon.gnb.pc();
      uiCommon.gnb.mobile();
    },
    pc: function pc() {
      var $wrap = $("#wrap"),
          $depth1 = $(".depth1 > li"),
          $btnLang = $(".btnLang"),
          $hdUtil = $(".hdUtil");
      $depth1.find("> a").on("focusin", function () {
        $depth1.removeClass("active");
        $(this).parent().addClass("active");
        $wrap.addClass("isHover");
      });
      $depth1.on("mouseenter", function () {
        $(this).addClass("active");
        $wrap.addClass("isHover");
      }).on("mouseleave", function () {
        $(this).removeClass("active");
        $wrap.removeClass("isHover");
      });
      $btnLang.on("focusin", function () {
        $depth1.removeClass("active");
        $wrap.removeClass("isHover");
      });
      $hdUtil.find("a").on("focusin", function () {
        $depth1.removeClass("active");
        $wrap.removeClass("isHover");
      });
    },
    mobile: function mobile() {
      var $moBtn = $(".btnGnb"),
          $moClose = $(".moClose"),
          $moEl = $(".moMenu"),
          $moGnb = $("#moGnb"),
          $dep1 = $moGnb.find("> li > button");
      $moBtn.on("click", function () {
        $('body').css({
          'overflow': 'hidden'
        });
        $moEl.addClass("open");
        uiCommon.component.dim.show('moMenu');
        uiCommon.component.lnb.destroy();
      });
      $moClose.on("click", function () {
        $('body').css({
          'overflow': 'auto'
        });
        $moEl.removeClass("open");
        uiCommon.component.dim.hide('moMenu');
        uiCommon.component.topMove.init();

        if ($(".mainWrap").length == 0) {
          uiCommon.component.lnb.init();
          $('header').removeClass('fixed');
          $('.lnb').show();
        } else {
          uiMain.gnb.init();
        }
      });
      $dep1.on("click", function () {
        var $dep2 = $(this).siblings(".dep2");

        if ($(this).hasClass("on")) {
          $dep1.removeClass("on");
          $dep2.stop().slideUp("400");
        } else {
          $dep1.removeClass("on");
          $(".dep2").stop().slideUp("400");
          $(this).addClass("on");
          $dep2.stop().slideDown("400");
        }
      });
      $window.on("resize", function () {
        var winWidth = $(this).width();

        if (winWidth > 768) {
          $(".moMenu").removeClass("open");
          $("body").css({
            overflow: "auto"
          });
        }
      });
    }
  };
  uiCommon.component = {
    init: function init() {
      // Header 관련 이벤트
      $(".langBox").length > 0 && uiCommon.component.headLang.init(); // 헤더 언어선택 이벤트

      $(".hdSearch").length > 0 && uiCommon.component.headSearch.init(); // PC 헤더 검색 이벤트

      $(".mainWrap").length == 0 && uiCommon.component.lnb.init(); // lnb관련 이벤트
      // Footer 관련 이벤트

      $(".familyBox").length > 0 && uiCommon.component.familySite.init(); // FamilySite

      $(".btnTop").length > 0 && uiCommon.component.topMove.init(); // topMove
      // 공통 컴포넌트

      $('[target-layer-open]').length > 0 && uiCommon.component.layer.init(); // layer

      $('.tab').length > 0 && uiCommon.component.tab.init(); // tab

      $('.dropMenuBox').length > 0 && uiCommon.component.niceSelect.init(); // niceSelect

      $('.tableWrap').length > 0 && uiCommon.component.tableAccessibility.init(); // 테이블 summary, caption 관리

      $('#slider').length > 0 && uiCommon.component.rangeSlider.init(); // rangeSlider

      $('.mCsutomScroll').length > 0 && uiCommon.component.mCustomScrollBar.init(); // mCustombarScrollbar

      $('.searchBox').length > 0 && uiCommon.component.searchForm.init(); // 검색입력 폼 이벤트 관리

      $('.countUp').length > 0 && uiCommon.component.countUp.init(); // countup.js 플러그인

      $('.newsWrap').length > 0 && uiCommon.component.scrollNews.init(); // news list scroll

      $('.contentsPopUp').length > 0 && uiCommon.component.popUp.init(); // 컨텐츠 팝업

      $('.swiper').length > 0 && uiCommon.component.swiperSlide.init(); // swiper

      $('.mainPop').length > 0 && uiCommon.component.mainPop.init(); // 메인 팝업

      $('.mediaVideo').length > 0 && uiCommon.component.mediaYoutube.init(); // 미디어 파트 유튜브 이동
    },
    arrFiltering: function arrFiltering(v) {
      return v = v.filter(function (item) {
        return item !== null && item !== undefined && item !== "";
      });
    },
    layer: {
      obj: null,
      init: function init() {
        $(".layer").attr({
          role: "dialog",
          "aria-hidden": "true"
        });
        $("[target-layer-open]").on("click", function () {
          var t = $(this).attr("target-layer-open").split(";");
          t = uiCommon.component.arrFiltering(t);
          uiCommon.component.layer.open(t[0], t[1]);
          uiCommon.component.layer.obj = $(this);
        });
        $("[target-layer-close]").on("click", function () {
          var t = $(this).attr("target-layer-close");
          uiCommon.component.layer.close(t);
        });
      },
      open: function open(t, d) {
        // $('body').css({'overflow':'hidden'});
        $("." + t).attr({
          tabindex: 0,
          "aria-hidden": "false"
        }).stop().fadeIn("fast").focus();
        d == "dim" && uiCommon.component.dim.show(t);
        $('.dim').css('z-index', '101');
        $('body').css({
          'overflow': 'hidden'
        });
      },
      close: function close(t) {
        // 레이어 팝업이 한개 띄워져 있을 경우에만 body scroll 가능하도록 설정
        // $('.layer[tabindex="0"]').length == 1 && $('body').css({'overflow':'auto'});
        uiCommon.component.dim.hide(t);
        $("." + t).attr({
          tabindex: "",
          "aria-hidden": "true"
        }).stop().fadeOut("fast");
        uiCommon.component.layer.obj && uiCommon.component.layer.obj.focus();
        $('body').css({
          'overflow': 'auto'
        });
      }
    },
    dim: {
      show: function show(t) {
        $("body").append('<div class="dim" name="' + t + '"></div>');
        $(".dim").stop().fadeIn(400);
      },
      hide: function hide(t) {
        $('.dim[name="' + t + '"]').stop().fadeOut(400);
        setTimeout(function () {
          $('.dim[name="' + t + '"]').remove();
        }, 400);
      }
    },
    tab: {
      init: function init() {
        $(".tab li").eq(0).find("a").attr({
          title: "현재 탭",
          "aria-selected": "true",
          role: "tab"
        });
        $(".tabContent").children("div").eq(0).attr("aria-hidden", "false").siblings("div").attr("aria-hidden", "true");
        uiCommon.component.tab.event();
      },
      event: function event() {
        $(".tabCtrl .tab li a").on("focusin click", function () {
          var i = $(this).closest("li").index();
          $(this).addClass("on").attr({
            title: "현재 탭",
            "aria-selected": "true"
          }).closest("li").siblings("li").find("a").removeClass("on").attr({
            title: "",
            "aria-selected": "false"
          });
          $(this).closest(".tab").next(".tabContent").children("div").attr("aria-hidden", "false").eq(i).show().siblings("div").hide().attr("aria-hidden", "true");
        });
      }
    },
    familySite: {
      init: function init() {
        var $box = $(".familyBox"),
            $button = $(".familyBox button"),
            $list = $('.familyList');
        $button.on("click", function () {
          if ($box.hasClass('on')) {
            $box.removeClass('on');
            $list.stop().slideUp('fast');
          } else {
            $box.addClass('on');
            $list.stop().slideDown('fast');
          }
        });
      }
    },
    scrollNews: {
      init: function init() {
        if ($window.width() < 769) {
          var $newsWrap = $('.newsWrap');
          $newsWrap.each(function () {
            var $scrollBody = $(this).find('.newsVideoLayout'),
                $items = $scrollBody.find('> li'),
                width = $items.width(),
                margin = parseInt($items.css('margin-right')),
                length = $items.length,
                result = width * length + margin * length + 5;
            $('> ul', this).width(result);
          });
        }

        ; // $window.resize(function(){
        //     uiCommon.component.scrollNews.init();
        // });
      },
      scroll: function scroll() {}
    },
    niceSelect: {
      init: function init() {
        $(".dropMenuBox").niceSelect();
      }
    },
    topMove: {
      init: function init() {
        uiCommon.component.topMove.onEv();
        uiCommon.component.topMove.clickEv();
      },
      onEv: function onEv() {
        $(window).on("scroll", function () {
          $(this).scrollTop() > 300 ? $(".btnTop").addClass("on") : $(".btnTop").removeClass("on");

          if ($(this).scrollTop() > $("footer").offset().top - 1000) {
            $('#container').hasClass('efficiency') ? $(".btnTop").css({
              bottom: "548px"
            }) : $(".btnTop").css({
              bottom: "348px"
            });
          } else {
            $(".btnTop").css({
              bottom: "100px"
            });
          } // 2021.09.30 sb 수정요청사항 반영
          // $(".btnTop").css({ bottom: "348px" });

        });
      },
      clickEv: function clickEv() {
        $(".btnTop").on("click", function () {
          $("html,body").animate({
            scrollTop: 0
          }, 200);
        });
      }
    },
    tableAccessibility: {
      strArr: [],
      init: function init() {
        uiCommon.component.tableAccessibility.set();
      },
      set: function set() {
        var _str = uiCommon.component.tableAccessibility.strArr;
        $(".tableWrap").each(function (i) {
          $(".tableWrap").eq(i).find("th").each(function (n, items) {
            _str.push($(this).text());

            if ($(".tableWrap").eq(i).find("th").length - 1 == n) {
              _str = uiCommon.component.arrFiltering(_str);
              $(".tableWrap").eq(i).find("table").attr("summary", _str + "으로 구성").prepend("<caption></caption>").find("caption").text(_str + "으로 구성");
              _str = [];
            }
          });
        });
      }
    },
    rangeSlider: {
      init: function init() {
        var minValue = $(".minValue").text(),
            maxValue = $(".maxValue").text(),
            minComma = uiCommon.component.rangeSlider.numberCommas(parseInt(minValue)),
            maxComma = uiCommon.component.rangeSlider.numberCommas(parseInt(maxValue));
        $(".minValue").text(minComma);
        $(".maxValue").text(maxComma);
        $(".sliderValue > span").text(minComma);
        $("#slider").slider({
          max: Number(maxValue),
          min: Number(minValue),
          range: "min",
          slide: function slide(event, ui) {
            var v = $(".ui-slider-handle").css("left");
            $(".sliderValue > span").text(uiCommon.component.rangeSlider.numberCommas(parseInt(ui.value)));
            $(".sliderValue").css({
              left: v
            });
          },
          change: function change(event, ui) {
            var v = $(".ui-slider-handle").css("left");
            $(".sliderValue > span").text(uiCommon.component.rangeSlider.numberCommas(parseInt(ui.value)));
            $(".sliderValue").css({
              left: v
            });
          }
        });
      },
      numberCommas: function numberCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
    mCustomScrollBar: {
      init: function init() {
        $(".mCsutomScroll").mCustomScrollbar();
      }
    },
    countUp: {
      init: function init() {
        uiCommon.component.countUp.energyOverview();
      },
      energyOverview: function energyOverview() {
        var countUp1 = new countUp.CountUp('over', 2100),
            countUp2 = new countUp.CountUp('total', 6000),
            countUp3 = new countUp.CountUp('worldW', 60),
            secTop = $('section.countUp').offset().top;
        var area = $('.countNum'),
            isCount = true;
        $(window).on('scroll', function (e) {
          var sT = $(this).scrollTop();

          if (sT > secTop - 800 && isCount) {
            isCount = false;

            for (var i = 0; i < area.length; i++) {
              area[i].classList.add('active');
            }

            countUp1.reset();
            countUp1.start();
            setTimeout(function () {
              countUp2.reset();
              countUp2.start();
            }, 1000);
            setTimeout(function () {
              countUp3.reset();
              countUp3.start();
            }, 1200);
          }
        });
      }
    },
    headSearch: {
      init: function init() {
        uiCommon.component.headSearch.showSearch();
        uiCommon.component.headSearch.closeSearch();
      },
      showSearch: function showSearch() {
        $window.width() <= 768 ? $(".hdSearch > .btnSearch").addClass("moSearch") : $(".hdSearch > .btnSearch").removeClass("moSearch");
        $window.on("resize", function () {
          var winWidth = $(this).width();
          winWidth <= 768 ? $(".hdSearch > .btnSearch").addClass("moSearch") : $(".hdSearch > .btnSearch").removeClass("moSearch");
        });
        $(".hdSearch > .btnSearch").on("click", function () {
          var winWidth = $(this).width();
          uiCommon.component.lnb.destroy();
          $('.lnb').hide();

          if ($(this).closest('.hdSearch').hasClass('open')) {
            uiCommon.component.dim.hide('search');
            $('.searchArea').stop().slideUp(400);
            $(this).closest('.hdSearch').removeClass('open');
            uiCommon.component.lnb.init();
            $('header').removeClass('fixed');
            $('.lnb').show();
            return;
          }

          setTimeout(function () {
            $('.hdBottom').css({
              'z-index': '2'
            });
          }, 200);
          uiCommon.component.dim.show("search");
          $(".searchArea").stop().slideDown(400);
          $(this).closest(".hdSearch").addClass("open");
        });
      },
      closeSearch: function closeSearch() {
        $('.searchArea .btnClose').on('click', function () {
          uiCommon.component.topMove.init();

          if ($(".mainWrap").length == 0) {
            uiCommon.component.lnb.init();
            $('header').removeClass('fixed');
            $('.lnb').show();
          } else {
            uiMain.gnb.init();
          }

          uiCommon.component.dim.hide('search');
          $('.searchArea').stop().slideUp(400);
          setTimeout(function () {
            $('.hdBottom').css({
              'z-index': '1'
            });
          }, 200);
          $(this).closest(".hdSearch").removeClass("open");
          $(".hdSearch > .btnSearch").removeClass("moSearch");
        });
      }
    },
    searchForm: {
      init: function init() {
        uiCommon.component.searchForm.txtInput(); // 검색입력내용시 delete 버튼 show

        uiCommon.component.searchForm.btnTxtDelete(); // 검색입력내용 clear
      },
      txtInput: function txtInput() {
        var $inputForm = $(".searchBox input");
        $inputForm.on("propertychange change keyup paste input", function () {
          $inputForm.val() == "" ? $(this).parent().removeClass("keyup") : $(this).parent().addClass("keyup");
        });
      },
      btnTxtDelete: function btnTxtDelete() {
        $(".btnTxtDelete").on("click", function () {
          var $input = $(this).siblings("input"),
              $val = $input.val();

          if ($val != "") {
            $input.val("");
            $(this).parent().removeClass("keyup");
          }
        });
      }
    },
    headLang: {
      init: function init() {
        $(".langBox").on("click", function () {
          $(this).children().toggleClass("on");
        });
        $("body").on("click", function (e) {
          if (!$(e.target).hasClass("btnLang")) {
            $(".langBox ul").removeClass("on");
            $(".btnLang").removeClass("on");
          }
        });
      }
    },
    lnb: {
      init: function init() {
        uiCommon.component.lnb.pc();
        uiCommon.component.lnb.mobile();
      },
      pc: function pc() {
        var $header = $("header");
        var oldScroll = $window.scrollTop(),
            scrollY; // window.addEventListener('mousewheel', function(e) {
        //     if ( !$('header').hasClass('fixed') ) {
        //         if(e.wheelDelta > 0 ||  e.detail < 0){
        //             $header.addClass('upScrolling');
        //         }
        //         else if(e.wheelDelta < 0 ||  e.detail > 0){
        //             $header.removeClass('upScrolling');
        //         }
        //     }
        // }, true);

        $window.on('wheel scroll', function (e) {
          scrollY = $(this).scrollTop();
          scrollY > 0 ? $header.addClass('scrolling') : $header.removeClass('scrolling');

          if (oldScroll > scrollY) {
            $header.addClass('upScrolling');
          } else if (oldScroll < scrollY) {
            $header.removeClass('upScrolling');
          }

          oldScroll = scrollY; // if ( !$('header').hasClass('fixed') ) {
          //     if(e.originalEvent.wheelDelta > 0 ||  e.originalEvent.detail < 0){
          //         $header.addClass('upScrolling');
          //     }
          //     else if(e.originalEvent.wheelDelta < 0 ||  e.originalEvent.detail > 0){
          //         $header.removeClass('upScrolling');
          //     }
          // }
        });
      },
      mobile: function mobile() {
        var $button = $('.lnb .moView button');
        $button.on('click', function () {
          $(this).parent().toggleClass("on");
        });
      },
      destroy: function destroy() {
        $window.off();
        $('header').addClass('fixed');
      }
    },
    popUp: {
      init: function init() {
        uiCommon.component.popUp.energyCityPop();
        uiCommon.component.popUp.closePopUp();
      },
      energyCityPop: function energyCityPop() {
        $('.clickCity>li').on('click', function (e) {
          e.preventDefault();
          var city = $(this).attr('data-city');
          $('.popUpCity>li').each(function (index) {
            if ($(this).attr('data-city') == city) {
              $('.popUpCity').addClass('show');
              $('.popUpCity>li').eq(index).fadeIn();
            }

            ;
          });
          uiCommon.component.scrollCommand.scrollDisable();
        });
      },
      closePopUp: function closePopUp() {
        $('.popUpClose').on('click', function () {
          $('.popUpCity>li').fadeOut();
          setTimeout(function () {
            $('.popUpCity').removeClass('show');
          }, 500);
          uiCommon.component.scrollCommand.scrollEnable();
        });
      }
    },
    scrollCommand: {
      scrollDisable: function scrollDisable() {
        $('body').css({
          'overflow-y': 'scroll'
        });
        $('#wrap').css({
          'position': 'fixed',
          'top': -$(window).scrollTop(),
          'left': 0,
          'width': '100%'
        });
      },
      scrollEnable: function scrollEnable() {
        var scrollPosition = Math.abs($('#wrap').css('top').split('px')[0]);
        $('#wrap').removeAttr('style').attr('style', 'opacity: 1; visibility: visible; height: auto; overflow-y: auto;');
        $(window).scrollTop(scrollPosition);
        $('body').removeAttr('style');
      }
    },
    swiperSlide: {
      init: function init() {
        uiCommon.component.swiperSlide.energyPart();
      },
      energyPart: function energyPart() {
        var energyOverview = new Swiper('.energyKv', {
          loop: true,
          slidesPerView: 1,
          pagination: {
            el: '.swiper-pagination.energyUtil',
            clickable: true
          },
          speed: 1000,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false
          },
          allowTouchMove: true
        });
        $(".energyKv .btnPause").click(function () {
          energyOverview.autoplay.stop();
          $(".energyKv .btnPause").css('display', 'none');
          $(".energyKv .btnPlay").css('display', 'inline-block');
        });
        $(".energyKv .btnPlay").click(function () {
          energyOverview.autoplay.start();
          $(".energyKv .btnPlay").css('display', 'none');
          $(".energyKv .btnPause").css('display', 'inline-block');
        });
        var refSlider = new Swiper('.refSlider', {
          loop: true,
          slidesPerView: 1,
          pagination: {
            el: '.swiper-pagination'
          },
          autoplay: {
            delay: 2000
          },
          observer: true,
          observeParents: true
        });
      }
    },
    mainPop: {
      init: function init() {
        var $mainPop = $('.mainPop'),
            $close = $('.mainClose');
        var hideYn;
        hideYn = get_cookie('mainPop');
        !hideYn ? uiCommon.component.layer.open('mainPop', 'dim') : uiCommon.component.layer.close('mainPop');
        $close.on('click', function (e) {
          $mainPop.find('input').is(':checked') && set_cookie('mainPop', 'Y', 1);
          uiCommon.component.layer.close('mainPop');
        });

        function set_cookie(cookieName, value, exdays) {
          var exdate = new Date(),
              cookieValue;
          exdate.setDate(exdate.getDate() + exdays);
          cookieValue = escape(value) + (exdays == null ? "" : "; expires=" + exdate.toGMTString());
          document.cookie = cookieName + "=" + cookieValue;
        }

        function get_cookie(cookieName) {
          cookieName = cookieName + '=';
          var cookieData = document.cookie,
              start = cookieData.indexOf(cookieName),
              cookieValue = '';

          if (start != -1) {
            start += cookieName.length;
            var end = cookieData.indexOf(';', start);
            if (end == -1) end = cookieData.length;
            cookieValue = cookieData.substring(start, end);
          }

          return unescape(cookieValue);
        }
      }
    },
    mediaYoutube: {
      init: function init() {
        var mainVidTop = $(".iframeWrap").offset().top;
        var lnbH = $(".lnb").height();
        $(".mediaVideo").on("click", function () {
          $("html,body").animate({
            scrollTop: mainVidTop - lnbH //스크롤탑 수치 넣기

          }, 200);
        }); // 위로 올라가서 '클릭되는 클래스' 넣기
      }
    }
  };
  uiCommon.mc = {
    init: function init() {
      if ($(".detail").length > 0) {
        uiCommon.mc.evt();
        uiCommon.mc.swipe();
      }

      ;
      $(".productList").length > 0 && uiCommon.mc.productList();
    },
    evt: function evt() {
      var $obj = $('.detail .btnBox .btnDownload');
      $obj.on('click', function () {
        uiCommon.mc.toggle($(this).next('ul'));
      });
    },
    toggle: function toggle($obj) {
      $obj.fadeToggle(300);
    },
    swipe: function swipe() {
      var $indi = $('.indicator li'),
          $items = $indi.find('button');
      var detailSlider = new Swiper('.swipeWrap .list', {
        loop: true,
        slidesPerView: 1,
        observer: true,
        observeParents: true,
        navigation: {
          prevEl: ".prevEl",
          nextEl: ".nextEl"
        },
        on: {
          slideChange: function slideChange() {
            $indi.eq(this.realIndex).find('button').addClass('on').closest('li').siblings('li').find('button').removeClass('on');
          }
        }
      });
      $indi.eq(0).find('button').addClass('on');
      $items.on('click', function () {
        $(this).addClass('on').closest('li').siblings('li').find('button').removeClass('on');
        detailSlider.slideTo($(this).parent('li').index() + 1);
      });
    },
    productList: function productList() {
      var $obj = $('.productList a img');
      $obj.wrap('<em></em>');
    }
  };
  uiCommon.init();
  return uiCommon;
}(window.uiCommon || {}, $(window));