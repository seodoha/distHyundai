'use strict';

;

var uiCommon = function (uiCommon, $window) {
  uiCommon.init = function () {
    uiCommon.gnb.init(); // GNB

    uiCommon.component.init(); // 컴포넌트
  };

  uiCommon.gnb = {
    init: function init() {
      uiCommon.gnb.pc();
      uiCommon.gnb.mobile();
    },
    pc: function pc() {
      var $wrap = $('#wrap'),
          $subWrap = $wrap.hasClass('mainWrap'),
          $depth1 = $('.depth1 > li'),
          $btnLang = $('.btnLang'),
          $hdUtil = $('.hdUtil');
      $depth1.find('> a').on('focusin', function () {
        $depth1.removeClass('active');
        $(this).parent().addClass('active');
        !$subWrap && $wrap.addClass('isHover');
      });
      $depth1.on('mouseenter', function () {
        $(this).addClass('active');
        !$subWrap && $wrap.addClass('isHover');
      }).on('mouseleave', function () {
        $(this).removeClass('active');
        !$subWrap && $wrap.removeClass('isHover');
      });
      $btnLang.on('focusin', function () {
        $depth1.removeClass('active');
        !$subWrap && $wrap.removeClass('isHover');
      });
      $hdUtil.find('a').on('focusin', function () {
        $depth1.removeClass('active');
        !$subWrap && $wrap.removeClass('isHover');
      });
    },
    mobile: function mobile() {
      var $moBtn = $('.btnGnb'),
          $moClose = $('.moClose'),
          $moEl = $('.moMenu'),
          $moGnb = $('#moGnb'),
          $dep1 = $moGnb.find('> li > button');
      $moBtn.on('click', function () {
        $moEl.addClass('open');
        $('body').css({
          'overflow': 'hidden'
        });
      });
      $moClose.on('click', function () {
        $moEl.removeClass('open');
        $('body').css({
          'overflow': 'auto'
        });
      });
      $dep1.on('click', function () {
        var $dep2 = $(this).siblings('.dep2');

        if ($(this).hasClass('on')) {
          $dep1.removeClass('on');
          $dep2.stop().slideUp('400');
        } else {
          $dep1.removeClass('on');
          $('.dep2').stop().slideUp('400');
          $(this).addClass('on');
          $dep2.stop().slideDown('400');
        }
      });
      $window.on('resize', function () {
        var winWidth = $(this).width();

        if (winWidth > 768) {
          $('.moMenu').removeClass('open');
          $('body').css({
            'overflow': 'auto'
          });
        }
      });
    }
  };
  uiCommon.component = {
    init: function init() {
      // Header 관련 이벤트
      $('.langBox').length > 0 && uiCommon.component.headLang.init(); // 헤더 언어선택 이벤트

      $('.hdSearch').length > 0 && uiCommon.component.headSearch.init(); // PC 헤더 검색 이벤트

      $('.mainWrap').length == 0 && uiCommon.component.lnb.init(); // lnb관련 이벤트
      // Footer 관련 이벤트

      $('.familyBox').length > 0 && uiCommon.component.familySite.init(); // FamilySite

      $('.btnTop').length > 0 && uiCommon.component.topMove.init(); // topMove
      // 공통 컴포넌트

      $('[target-layer-open]').length > 0 && uiCommon.component.layer.init(); // layer

      $('.tab').length > 0 && uiCommon.component.tab.init(); // tab

      $('.dropMenuBox').length > 0 && uiCommon.component.niceSelect.init(); // niceSelect

      $('.tableWrap').length > 0 && uiCommon.component.tableAccessibility.init(); // 테이블 summary, caption 관리

      $('#slider').length > 0 && uiCommon.component.rangeSlider.init(); // rangeSlider

      $('.mCsutomScroll').length > 0 && uiCommon.component.mCustomScrollBar.init(); // mCustombarScrollbar

      $('.searchBox').length > 0 && uiCommon.component.searchForm.init(); // 검색입력 폼 이벤트 관리
    },
    arrFiltering: function arrFiltering(v) {
      return v = v.filter(function (item) {
        return item !== null && item !== undefined && item !== '';
      });
    },
    layer: {
      obj: null,
      init: function init() {
        $('.layer').attr({
          'role': 'dialog',
          'aria-hidden': 'true'
        });
        $('[target-layer-open]').on('click', function () {
          var t = $(this).attr('target-layer-open').split(';');
          t = uiCommon.component.arrFiltering(t);
          uiCommon.component.layer.open(t[0], t[1]);
          uiCommon.component.layer.obj = $(this);
        });
        $('[target-layer-close]').on('click', function () {
          var t = $(this).attr('target-layer-close');
          uiCommon.component.layer.close(t);
        });
      },
      open: function open(t, d) {
        // $('body').css({'overflow':'hidden'});
        $('.' + t).attr({
          'tabindex': 0,
          'aria-hidden': 'false'
        }).stop().fadeIn('fast').focus();
        d == 'dim' && uiCommon.component.dim.show(t);
      },
      close: function close(t) {
        // 레이어 팝업이 한개 띄워져 있을 경우에만 body scroll 가능하도록 설정
        // $('.layer[tabindex="0"]').length == 1 && $('body').css({'overflow':'auto'}); 
        uiCommon.component.dim.hide(t);
        $('.' + t).attr({
          'tabindex': '',
          'aria-hidden': 'true'
        }).stop().fadeOut('fast');
        uiCommon.component.layer.obj && uiCommon.component.layer.obj.focus();
      }
    },
    dim: {
      show: function show(t) {
        $('body').append('<div class="dim" name="' + t + '"></div>');
        $('.dim').stop().fadeIn(400);
      },
      hide: function hide(t) {
        $('.dim').stop().fadeOut(400);
        setTimeout(function () {
          $('.dim[name="' + t + '"]').remove();
        }, 400);
      }
    },
    tab: {
      init: function init() {
        $('.tab li').eq(0).find('a').attr({
          'title': '현재 탭',
          'aria-selected': 'true',
          'role': 'tab'
        });
        $('.tabContent').children('div').eq(0).attr('aria-hidden', 'false').siblings('div').attr('aria-hidden', 'true');
        uiCommon.component.tab.event();
      },
      event: function event() {
        $('.tab li a').on('focusin click', function () {
          var i = $(this).closest('li').index();
          $(this).addClass('on').attr({
            'title': '현재 탭',
            'aria-selected': 'true'
          }).closest('li').siblings('li').find('a').removeClass('on').attr({
            'title': '',
            'aria-selected': 'false'
          });
          $(this).closest('.tab').next('.tabContent').children('div').attr('aria-hidden', 'false').eq(i).show().siblings('div').hide().attr('aria-hidden', 'true');
        });
      }
    },
    familySite: {
      init: function init() {
        $('.familyBox button').on('click', function () {
          $(this).parent().toggleClass('on');
        });
      }
    },
    niceSelect: {
      init: function init() {
        $('.dropMenuBox').niceSelect();
      }
    },
    topMove: {
      init: function init() {
        uiCommon.component.topMove.onEv();
        uiCommon.component.topMove.clickEv();
      },
      onEv: function onEv() {
        $(window).on('scroll', function () {
          $(this).scrollTop() > 300 ? $('.btnTop').addClass('on') : $('.btnTop').removeClass('on');
          $(this).scrollTop() > $('footer').offset().top - 1000 ? $('.btnTop').css({
            'bottom': '348px'
          }) : $('.btnTop').css({
            'bottom': '100px'
          });
        });
      },
      clickEv: function clickEv() {
        $('.btnTop').on('click', function () {
          $('html,body').animate({
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
        $('.tableWrap').each(function (i) {
          $('.tableWrap').eq(i).find('th').each(function (n, items) {
            _str.push($(this).text());

            if ($('.tableWrap').eq(i).find('th').length - 1 == n) {
              _str = uiCommon.component.arrFiltering(_str);
              console.log($('.tableWrap').eq(i).find('table').attr('summary', _str + '으로 구성'));
              $('.tableWrap').eq(i).find('table').attr('summary', _str + '으로 구성').prepend('<caption></caption>').find('caption').text(_str + '으로 구성');
              _str = [];
            }

            ;
          });
        });
      }
    },
    rangeSlider: {
      init: function init() {
        var minValue = $('.minValue').text(),
            maxValue = $('.maxValue').text(),
            minComma = uiCommon.component.rangeSlider.numberCommas(parseInt(minValue)),
            maxComma = uiCommon.component.rangeSlider.numberCommas(parseInt(maxValue));
        $('.minValue').text(minComma);
        $('.maxValue').text(maxComma);
        $('.sliderValue > span').text(minComma);
        $('#slider').slider({
          max: Number(maxValue),
          min: Number(minValue),
          range: "min",
          slide: function slide(event, ui) {
            var v = $('.ui-slider-handle').css('left');
            $('.sliderValue > span').text(uiCommon.component.rangeSlider.numberCommas(parseInt(ui.value)));
            $('.sliderValue').css({
              'left': v
            });
          },
          change: function change(event, ui) {
            var v = $('.ui-slider-handle').css('left');
            $('.sliderValue > span').text(uiCommon.component.rangeSlider.numberCommas(parseInt(ui.value)));
            $('.sliderValue').css({
              'left': v
            });
          }
        });
      },
      numberCommas: function numberCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    },
    mCustomScrollBar: {
      init: function init() {
        $('.mCsutomScroll').mCustomScrollbar();
      }
    },
    headSearch: {
      init: function init() {
        uiCommon.component.headSearch.showSearch();
        uiCommon.component.headSearch.closeSearch();
      },
      showSearch: function showSearch() {
        $(window).width() <= 768 ? $('.hdSearch > .btnSearch').addClass('moSearch') : $('.hdSearch > .btnSearch').removeClass('moSearch');
        $window.on('resize', function () {
          var winWidth = $(this).width();
          winWidth <= 768 ? $('.hdSearch > .btnSearch').addClass('moSearch') : $('.hdSearch > .btnSearch').removeClass('moSearch');
        });
        $('.hdSearch > .btnSearch').on('click', function () {
          var winWidth = $(this).width();
          $window.off('mousewheel');

          if ($(this).closest('.hdSearch').hasClass('open')) {
            uiCommon.component.dim.hide('search');
            $('.searchArea').stop().slideUp(400);
            $(this).closest('.hdSearch').removeClass('open');
            return;
          }

          $('.lnb').hide();
          setTimeout(function () {
            $('.hdBottom').css({
              'z-index': '2'
            });
          }, 200);
          uiCommon.component.dim.show('search');
          $('.searchArea').stop().slideDown(400);
          $(this).closest('.hdSearch').addClass('open');
        });
      },
      closeSearch: function closeSearch() {
        $('.searchArea .btnClose').on('click', function () {
          uiCommon.component.lnb.init();
          $('.lnb').show();
          uiCommon.component.dim.hide('search');
          $('.searchArea').stop().slideUp(400);
          setTimeout(function () {
            $('.hdBottom').css({
              'z-index': '1'
            });
          }, 200);
          $(this).closest('.hdSearch').removeClass('open');
          $('.hdSearch > .btnSearch').removeClass('moSearch');
        });
      }
    },
    searchForm: {
      init: function init() {
        uiCommon.component.searchForm.txtInput(); // 검색입력내용시 delete 버튼 show

        uiCommon.component.searchForm.btnTxtDelete(); // 검색입력내용 clear
      },
      txtInput: function txtInput() {
        var $inputForm = $('.searchBox input');
        $inputForm.on("propertychange change keyup paste input", function () {
          $inputForm.val() == '' ? $(this).parent().removeClass('keyup') : $(this).parent().addClass('keyup');
        });
      },
      btnTxtDelete: function btnTxtDelete() {
        $('.btnTxtDelete').on('click', function () {
          var $input = $(this).siblings('input'),
              $val = $input.val();

          if ($val != '') {
            $input.val('');
            $(this).parent().removeClass('keyup');
          }
        });
      }
    },
    headLang: {
      init: function init() {
        $('.langBox').on('click', function () {
          $(this).children().toggleClass('on');
        });
        $('body').on('click', function (e) {
          if (!$(e.target).hasClass('btnLang')) {
            $('.langBox ul').removeClass('on');
            $('.btnLang').removeClass('on');
          }
        });
      }
    },
    lnb: {
      init: function init() {
        var $header = $('header');
        var oldScroll, scrollY;
        window.addEventListener('mousewheel', function (e) {
          if (e.wheelDelta > 0 || e.detail < 0) {
            $header.addClass('upScrolling');
          } else if (e.wheelDelta < 0 || e.detail > 0) {
            $header.removeClass('upScrolling');
          }
        });
        $window.on('scroll', function (e) {
          scrollY = $(this).scrollTop();
          scrollY > 0 ? $header.addClass('scrolling') : $header.removeClass('scrolling');
        });
      }
    }
  };
  uiCommon.init();
  return uiCommon;
}(window.uiCommon || {}, $(window));