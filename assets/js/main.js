"use strict";var uiMain=function(n,i){return n.init=function(){n.gnb.init()},n.gnb={init:function(){n.gnb.scroll(),n.gnb.hover()},scroll:function(){var n=$("#wrap");i.on("scroll mousewheel",function(){80<$(this).scrollTop()?n.addClass("isScrolling"):n.removeClass("isScrolling")})},hover:function(){var n=$("#wrap"),i=$(".depth1 > li"),o=$(".btnLang"),l=$(".hdUtil");i.find("> a").on("focusin",function(){n.removeClass("isScrolling")}),i.on("mouseenter",function(){n.removeClass("isScrolling")}).on("mouseleave",function(){0<$(window).scrollTop()&&n.addClass("isScrolling")}),o.on("focusin",function(){n.addClass("isScrolling")}),l.find("a").on("focusin",function(){n.addClass("isScrolling")})}},n.init(),n}(window.uiMain||{},$(window));