import './home.less';
import Com from '../common/common';
import Swiper from 'swiper'
$(function () {
	var INDEX = {
		init() {
			var me = this;
			me.bindEvent();
			me.picPlay();
		},
		//轮播效果
		picPlay() {
			var swiper = new Swiper('.swiper-container1', {
				pagination: {
					el: '.swiper-pagination1',
					clickable: true,
				},
				autoplay: {
					delay: 5000,
					disableOnInteraction: false
				},
				speed: 600,
				spaceBetween: 10
			});
			var swiper2 = new Swiper('.swiper-container2', {
				pagination: {
					el: '.swiper-pagination2',
					clickable: true,
				},
				autoplay: {
					delay: 3000,
				},
				spaceBetween: 20
			});
		},
		bindEvent() {
			Com.ShowBlockNav();
			Com.teachSubCat();
			$('.info-list-w  .info-list-nav  li').each(function (n) {
				$(this).click(function () {
					$(this).addClass('cur').siblings().removeClass('cur');
					$('.info-list-cnt').find('.info-list').eq(n).show().siblings().hide();
				})
			});
			$('#tech-tabs').delegate('[js-tab-tech-check]', 'click', function (e) {
				e.preventDefault();
				var wrapper = $('#tech-tabs');
				var id = $(this).attr("js-tab-tech-check");
				wrapper.load("/checktabxhr", {
					type: 'tech',
					id: id
				});
			})
			$('#news-tabs').delegate('[js-tab-news-check]', 'click', function (e) {
				e.preventDefault();
				var wrapper = $('#news-tabs');
				var id = $(this).attr("js-tab-news-check");
				wrapper.load("/checktabxhr", {
					type: 'news',
					id: id
				});
			})
		},
	}
	INDEX.init();
	//快讯滚动
	setInterval(function(obj){
		$(obj).find('ul:first').animate({
			marginTop:'-45px'
		},500,function(){
			$(this).css({marginTop:'0px'}).find('li:first').appendTo(this);
		});
	},3000,('.quick-cnt'));
});