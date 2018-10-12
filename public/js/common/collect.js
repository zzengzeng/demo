$(function () {
	var COLLECT = {
		init: function () {
			this.bindEvent();
			var _id = $('#articleId').val();
			if (_id) {
				this.getCollectStatus(_id);
			}
		},
		bindEvent: function () {
			//收藏弹框
			$('#collectStatus').delegate('.j-e-collect', 'click', function () {
				let _detailId = $(this).attr('data-detailid');
				$.post('/user/favorites/creat', {
					detailId: _detailId
				}, function (data) {
					if (data && data.code == 200) {
						$('#creatCollect').load('/user/favorites/creat/' + data.data);
					} else {
						window.location.href = '/login';
					}
				});
				return false;
			});
			//关闭弹框
			$('#creatCollect').delegate('.j-collect-close', 'click', function () {
				$('#creatCollect').empty();
			});
			//创建收藏
			$('#creatCollect').delegate('.j-e-creat', 'click', function () {
				let _detailId = $('#detailId').val();
				let _collectId = $(this).attr('data-collectid');
				if (_collectId) {
					$('#creatCollect').load('/user/favorites/creatNew/' + _detailId + '/' + _collectId);
				} else {
					$('#creatCollect').load('/user/favorites/creatNew/' + _detailId);
				}
			});
			//返回到收藏列表
			$('#creatCollect').delegate('.j-e-back-collect', 'click', function () {
				let _detailId = $(this).attr('data-detailid');
				let _collectId = $('#collectId').val();
				$.post('/user/favorites/creat', {
					detailId: _detailId
				}, function (data) {
					if (data && data.code == 200) {
						if(_collectId){
							$('#creatCollect').load('/user/favorites/creat/' + data.data + '/' + _collectId);
						}else{
							$('#creatCollect').load('/user/favorites/creat/' + data.data);
						}
					} else {
						window.location.href = '/login';
					}
				});
			});
			//创建新收藏
			$('#creatCollect').delegate('.j-e-collect-new', 'click', function () {
				if ($('#collectName').val() == '') {
					if($('.err-txt')){
						$('.err-txt').remove();
					}
					$('#collectName').addClass('err');
					$('#collectName').after("<p class='err-txt'>名称不能为空</p>");
				} else {
					$('#collectName').removeClass('err');
					$('.err-txt').remove();
					let _detailId = $('#detailId').val();
					let _collectId = $('#collectId').val();
					$.post('/user/favorites/creatNew', {
						collectName: $('#collectName').val(),
						detailId: _detailId
					}, function (data) {
						if (data && data.code == 200) {
							if (_collectId) {
								$('#creatCollect').load('/user/favorites/creat/' + data.data + '/' + _collectId);
							} else {
								$('#creatCollect').load('/user/favorites/creat/' + data.data);
							}
						} else {
							$('#collectName').after("<p class='err-txt'>" + data.msg + "</p>");
						}
					});
				}
			});
			//失去焦点
			$('#creatCollect').delegate('#collectName','blur',function(){
				if($('#collectName').val() !== ''){
					if($('.err-txt')){
						$('#collectName').removeClass('err');
						$('.err-txt').remove();
					}
				}
			})
			//添加文章到收藏夹
			$('#creatCollect').delegate('.j-e-collect-article', 'click', function () {
				let _that = $(this);
				let _collectionId = parseInt($(this).attr('data-id'));
				let _articleID = $('#detailId').val();
				$.post('/user/favorites/addArticleToFav', {
					collectionId: _collectionId,
					articleID: _articleID
				}, function (data) {
					if (data && data.code == 200) {
						_that.addClass('selected');
						_that.text('已采集');
						_that.parents('dl').siblings().find('a').removeClass('j-e-collect-article').addClass('aaa');
						COLLECT.getCollectStatus(_articleID);
						$('#creatCollect').load('/user/favorites/creat/' + data.data.articleID + '/' + data.data.collectID);
					} else {
						if($('.err-txt')){
							$('.err-txt').remove();
						}
						$('#creatCollect .list-tit p').after("<p class='err-txt'>您已经采集过了</p>");
						return false;
					}
				});
			});
			//取消收藏
			$('#collectStatus').delegate('.j-e-collect-selected', 'click', function () {
				let _articleID = $(this).attr('data-detailid');
				$.post('/user/favorites/cancel', {
					articleID: _articleID
				}, function (data) {
					if (data && data.code == 200) {
						COLLECT.getCollectStatus(data.data.articleID);
					} else {
						console.log(data.msg);
					}
				});
			});
		},
		getCollectStatus: function (id) {
			$('#collectStatus').load('/user/favorites/isCollect/' + id);
		}
	}
	COLLECT.init();
});