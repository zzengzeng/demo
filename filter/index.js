const map = require('../public/dist/fry.map.json');
const User = require('../api/user');
exports.loadmap = async (req, res, next) => {
	req.loadmap=map;
	const num = Math.floor(Math.random()*10000+1);
	req.randomnum = num;
	if(req.cookies['access']) {
		const user = await User.UserInfo(req.cookies["access"]);
		//console.log(user)
		if(user.status==200 && user.data.code==200) {
			req.user = user.data.data;
			if(req.user.userMessages){
				res.cookie('messagedata',JSON.stringify(req.user.userMessages),{ expires: new Date(Date.now() + (1000*60*60*24*7)), httpOnly: false});
			}
			res.cookie('nickname',req.user.nickName,{ expires: new Date(Date.now() + (1000*60*60*24*7)), httpOnly: false});
			next();
		} else {
			res.clearCookie("access");
			res.redirect('/login')
		}
	} else {
		next();
	}
	
	
}
exports.access=function (req, res, next) {
	if( req.cookies['access']){

		next();
	} else {
		if(req.xhr) {
			res.json({
				code:403,
				msg:"拒绝访问"
			})
		} else {
			res.redirect('/login');
		}
		
	}
	
}
//用户认证状态
exports.certificateStatus = async (req, res, next) => {
	
	const userCertificateResult = await User.getUserCertificate(req.cookies['access']);	

	if(userCertificateResult.code == 200 && userCertificateResult.data){
		req.certificateStatus = userCertificateResult.data.status;
		if(req.certificateStatus==0 || req.certificateStatus==3) {
			res.redirect('/user/'+req.user.nickName+'/certification');
		} else {
			next();
		}
		
	}else{
		req.certificateStatus = 0;
		res.render('404');
	}

	
}