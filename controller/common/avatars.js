var API = require('../../api/index');
const axios = require('axios');
/**
 * avatar get 访问头像
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.index = async (req, res, next) => {
	//console.log(req.query)
	if(req.query.url) {
		const reURL = /^(https?|http)+/;
		if(!reURL.test(req.query.url)) {
			let imgurl = req.query.url.replace(/^\//, '');
			const avatars = await axios.get(API.APIHOST + imgurl, {
				responseType: 'arraybuffer'
			})
			res.writeHead(200, Object.assign({},
				avatars.headers
			));
			res.end(avatars.data, 'binary');

		} else {
			return res.redirect(req.query.url);
		}
	} else {
		res.send(404, '非法请求');
	}
	
	// if (req.user) {
	// 	const user = req.user;

	// 	let img = user.profileImageUrl.replace(/^\//, '');
	// 	const avatar = await axios.get(API.APIHOST + img, {
	// 		responseType: 'arraybuffer'
	// 	})
	// 	res.writeHead(200, Object.assign({},
	// 		avatar.headers
	// 	));
	// 	res.end(avatar.data, 'binary');


	// } else {
	// 	res.send(403, "你无权访问")
	// }
}