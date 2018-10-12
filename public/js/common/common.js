import Toastr from 'toastr';
import Cookies from 'js-cookie';
import "toastr/build/toastr.css";
module.exports = {
	ShowBlockNav : function(){
		let _data;
		if($("[js-nav-hover]").length>0) {
			var src_target = $("[js-nav-hover]");
			var target = src_target.attr("js-nav-hover");
			var top = src_target.offset().top;
			var height = src_target.outerHeight();
			$(target).css({"top":(top+height+2).toString()+"px"});
		}
		var that = this;
		_data = Cookies.getJSON('messagedata');
		console.log(_data)
		if(_data){
			that.informData(_data);
		}
		that.websocket(function(data){
			if(typeof data === 'object' && !isNaN(data.length)){ 						//数组
				Cookies.remove('messagedata');
				Cookies.set('messagedata',data);
				_data = Cookies.getJSON('messagedata');
				if(_data){
					that.informData(_data);
				}
			}else{																		//对象									
				var time = that.getDateDiff(data.releaseTime);
				Toastr.info(time+"|"+data.title);
				Toastr.options.timeOut= 10000;
				Toastr.options.onclick =function() {
					window.open('/express', '_blank');
				}
			}
		});
		
	},
	UploadImg: function(upload_obj,attr){
		var formData = new FormData();
		var file = upload_obj[0].files[0];
		var target = $(attr);
		formData.append("files",file);
		$.ajax({
			type:"POST",
			url:"/putimg",
			enctype:"multipart/form-data",
			success:function(data){
				if(data && data.data) {
					target.val(data.data)
				} else {
					target.val('');
					alert(data.msg);
				}
			},
			error:function(err){
				alert('上传失败!系统错误');
			},
			async:false,
			data:formData,
			cache:false,
			contentType:false,
			processData:false,
			timeout:60000
		})
	},
	websocket:function(cb){
		var wsuri = "ws://67.218.156.174:12345/ws";
		var token = "newsFlash";
		var e = "evt";
    var sock = new WebSocket(wsuri);
		sock.onopen = function () {
			sock.send("{\"token\": \"" + token + "\", \"event\": \"" + e + "\"}");
			if(Cookies.get('nickname')){
				sock.send("{\"token\": \"" + 'user' + "\", \"event\": \"" + 'evt-' + Cookies.get('nickname') + "\"}");
			}
		};
		sock.onclose = function (e) {
			console.log("connection closed (" + e.code + ")");
		
		};
		sock.onmessage = function (e) {
			cb(JSON.parse(e.data));
		};
	},
	getDateDiff :function(dateStr)  {
		
		var getDateTimeStamp = function(dateStr)  {
			var real = new Date(dateStr);
			return  Date.parse(real);
		}　
		
		var publishTime = getDateTimeStamp(dateStr) / 1000,
		d_seconds,
		d_minutes,
		d_hours,
		d_days,
		timeNow = parseInt(new Date().getTime() / 1000),
		d,
	
		date = new Date(publishTime * 1000),
		Y = date.getFullYear(),
		M = date.getMonth() + 1,
		D = date.getDate(),
		H = date.getHours(),
		m = date.getMinutes(),
		s = date.getSeconds();
		//小于10的在前面补0
		if (M < 10) {
			M = '0' + M;
		}
		if (D < 10) {
			D = '0' + D;
		}
		if (H < 10) {
			H = '0' + H;
		}
		if (m < 10) {
			m = '0' + m;
		}
		if (s < 10) {
			s = '0' + s;
		}
		d = timeNow - publishTime;
		d_days = parseInt(d / 86400);
		d_hours = parseInt(d / 3600);
		d_minutes = parseInt(d / 60);
		d_seconds = parseInt(d);
	
		if (d_days > 0 && d_days < 3) {
			return d_days + ' 天前';
		} else if (d_days <= 0 && d_hours > 0) {
			return d_hours + ' 小时前';
		} else if (d_hours <= 0 && d_minutes > 0) {
			return d_minutes + ' 分钟前';
		} else if (d_seconds < 60) {
			if (d_seconds <= 0) {
					return '刚刚';
			} else {
					return d_seconds + ' 秒前';
			}
		} else if (d_days >= 3 && d_days < 30) {
			return M + '-' + D + ' ' + H + ':' + m;
		} else if (d_days >= 30) {
			return Y + '-' + M + '-' + D + ' ' + H + ':' + m;
		}    
	},
	teachSubCat: function(){
		$('#nav-block').load('/technology/subcat');
	},
	informData: function(data){
		var arr = [];
		if(data.length>0){
			$('#messageNum').html('<span>'+data.length+'</span>')
		}
		for(let i=0;i<data.length;i++){
			data[i].redirect = JSON.parse(data[i].redirect);
			arr.push('<li>');	
			if(data[i].type == '1'){   			//有新粉丝
				arr.push('	<a href="javascript:;" data-id="'+data[i].id+'" data-type="'+data[i].type+'">'+ data[i].msg +'</a>');
			}else if(data[i].type == '2'){		//有新评论
				arr.push('	<a href="javascript:;" data-articleid="'+data[i].redirect.aid+'" data-id="'+data[i].id+'" data-type="'+data[i].type+'">'+ data[i].msg +'</a>');
			}else if(data[i].type == '3'){		//新回复
				arr.push('	<a href="javascript:;" data-articleid="'+data[i].redirect.aid+'" data-commentid="'+data[i].redirect.cid+'" data-id="'+data[i].id+'" data-type="'+data[i].type+'">'+ data[i].msg +'</a>');
			}else if(data[i].type == '5' || data[i].type == '7'){		//有文章被点赞 || 被踩
				arr.push('	<a href="javascript:;" data-id="'+data[i].id+'" data-type="'+data[i].type+'">'+ data[i].msg +'</a>');
			}else if(data[i].type == '6' || data[i].type == '8'){ //评论点赞 || 评论被踩
				arr.push('	<a href="javascript:;" data-id="'+data[i].id+'" data-type="'+data[i].type+'">'+ data[i].msg +'</a>');	
			}else{ //新奖励
				arr.push('	<a href="javascript:;" data-id="'+data[i].id+'" data-type="'+data[i].type+'">'+ data[i].msg +'</a>');	
			}	
			arr.push('</li>');
		}
		$('#informList').html(arr.join(''));
		$('#informList').delegate('li','click',function(){
			var _type = $(this).find('a').attr('data-type');
			var _id = $(this).find('a').attr('data-id');
			var _articleid = $(this).find('a').attr('data-articleid');
			var _commentid;
			$.post('/user/readmessage',{id:_id},function(data){
				if(data.code == 200){
					if(_type == '1'){ 		//有新粉丝
						$(this).remove();
						window.location.href = '/user/'+Cookies.get('nickname')+'/fans';
					}else if(_type == '2' || _type == '3'){ 					//有新评论||有新回复	
						window.location.href = '/d/'+_articleid+'#comment';;
					}else if(_type == '5' || _type == '7'){					//有文章被点赞 || 被踩	
						window.location.href = '/d/'+_articleid;
					}else if(_type == '6' || _type == '8'){					//评论被赞 || 被踩
						window.location.href = '/d/'+_articleid+'#comment';;
					}else if(_type == '4'){									//新奖励
						window.location.href = '/user/'+Cookies.get('nickname')+'/certification';	
					}else{
						console.log('其他')
					}
				}else{
					console.log('失败')
				}
			});
		})
	}
};

