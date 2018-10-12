$(function(){
	var GOTOP = {
		init(){
			this.bindEvent();	
		},
		bindEvent(){
			$('#gotop').on('click',function(){
				$('body,html').animate({
					scrollTop: 0
				});
			});
			$(document).scroll(function(){
				$(this).scrollTop() > 720 ? $('#gotop').removeClass('hidden') : $('#gotop').addClass('hidden')
			});
		}
	}
	GOTOP.init();
})