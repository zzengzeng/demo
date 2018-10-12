var API = require('./index');
var axios = require('axios');
const friendlyTime = require('../util/friendlyTime.js');
const fs = require('fs');
const FormData = require('form-data')
exports.Login = async (user) => {

    try {
        const res = await axios.post(API.APIHOST + 'user/login', user);
        return await res;

    } catch (err) {

        return {
            code: 400,
            data: null,
            msg: err
        };
    }
};
exports.UserInfo = async (token) => {

    try {
        const res = await axios.get(API.APIHOST + 'user/userInfo', {
            headers: {
                "Authorization": 'bearer ' + token,
                "client": "pc"
            }
        });
        return await res;

    } catch (err) {

        return {
            code: 400,
            data: null,
            msg: err
        };
    }
};
exports.Register = async (Register) => {
    try {
        const res = await axios.post(API.APIHOST + 'user/register', Register);
        return await res;

    } catch (err) {

        return {
            code: 400,
            data: null,
            msg: err
        };
    }
}
exports.RegisterCaptcha = async (setup) => {
    try {
        const res = await axios.post(API.APIHOST + 'user/generateCaptcha', setup);
        return await res;

    } catch (err) {

        return {
            code: 400,
            data: null,
            msg: err
        };
    }
}

/**
 * 传递的  captcha 对象 
 * @param {string 图片验证码的ID}        Id
 * @param {string 图片验证码的值}        VerifyValue
 * @param {string 手机号}               phone
 */
exports.SendSMSCode = async (captcha,sign) => {
    try {
        const res = await axios.post(API.APIHOST + 'user/getSMSCode', captcha,{
            headers: {
                "Sign": sign,
                "Content-Type": "application/json"
            }
        });
        return await res;

    } catch (err) {

        return {
            code: 400,
            data: null,
            msg: err
        };
    }
}
/**
 * 上传用户头像
 * @param {* Object file里面的图片对象} Avatar 
 * @param {string 用户访问令牌} token 
 */
exports.UploadAvatar = async (Avatar, token) => {
    let data = fs.createReadStream(Avatar);
    let form = new FormData();
    form.append('file', data, 'test.png');
    let headers = Object.assign({
            "authorization": 'bearer ' + token,
        },
        form.getHeaders());
    return await axios.post(API.APIHOST + 'user/userUpload',
            form, {
                headers: headers
            }).then((response) => {
            return response.data;
        })
        .catch((e) => {
            const err = {
                "code": 400,
                "data": null,
                "msg": "上传失败"
            }
            return err;
        })
}
/**
 * 上传用户身份证
 * @param {*} IDCard 
 * @param {*} token 
 */
exports.UploadIDCard = async (IDCard, token) => {
    let data = fs.createReadStream(IDCard);
    let form = new FormData();
    form.append('file', data);
    form.append("bucketName","id-card-bitbee");
    let headers = Object.assign({
            "authorization": 'bearer ' + token,
        },
        form.getHeaders());
        
    return await axios.post(API.APIHOST + 'user/uploadImage',
            form, {
                headers: headers
            }).then((response) => {
            return response.data;
        })
        .catch((e) => {
            const err = {
                "code": 400,
                "data": null,
                "msg": "上传失败"
            }
            return err;
        })
}
exports.UserEdit = async (obj, token) => {
    try {
        const res = await axios.post(API.APIHOST + 'user/userEdit', obj, {
            headers: {
                "Authorization": 'bearer ' + token,
                "Content-Type": "application/json"
            }

        });
        return res;
    } catch (e) {
        const err = {
            "code": 400,
            "data": null,
            "msg": "修改失败"
        }
        return err;
    }

}

/**
 * 找回密码  
 * @param {string 手机号}               phone
 * @param {string 短信验证码的值}        SMSCode
 * @param {string 新密码}               NewPassword
 */
exports.FindPwd = async (data) => {
    try {
        const res = await axios.post(API.APIHOST + 'user/findPwd', data);
        return await res;
    } catch (err) {
        return {
            err: err
        };
    }
}
/**
 * 获取用户中心信息 
 * @param {string 昵称}               NickName
 */
exports.UserCenter = async (NickName) => {
    try {
        const res = await axios.get(API.APIHOST + 'user/userCenter/' + NickName);
        return await res.data;
    } catch (err) {
        return {
            code: 400,
            data: null,
            msg: err
        };
    }
}
/**
 * 该文章是否收藏 
 * @param {string 令牌}                 token
 * @param {string 文章id}               articleId
 */
exports.FavoritesIsCollect = async (articleId, token) => {
    try {
        const res = await axios.get(API.APIHOST + 'favorite/isCollection/' + articleId, {
            headers: {
                "Authorization": 'bearer ' + token
            }
        });
        return await res;
    } catch (err) {
        return {
            code: 400,
            data: null,
            msg: err
        };
    }
}
/**
 * 取消收藏 
 * @param {string 令牌}                 token
 * @param {string 文章id}               articleId
 */
exports.FavoritesCancle = async (articleId, token) => {
    try {
        const res = await axios.post(API.APIHOST + 'favorite/cancel/' + articleId, {}, {
            headers: {
                "Authorization": 'bearer ' + token,
                "Content-Type": "application/json"
            }
        });
        return await res;
    } catch (e) {
        const err = {
            "code": 400,
            "data": null,
            "msg": "修改失败"
        }
        return err;
    }
}
/**
 * 获取收藏夹列表  
 * @param {string 令牌}                 token 
 */
exports.Favorites = async (token) => {
    try {
        const res = await axios.get(API.APIHOST + 'collection/list', {
            headers: {
                "Authorization": 'bearer ' + token
            }
        });
        return await res;

    } catch (err) {

        return {
            code: 400,
            data: null,
            msg: err
        };
    }
};
/**
 * 删除收藏夹  
 * @param {string 令牌}                 token 
 * @param {string 收藏夹id}              id 
 */
exports.delFavorites = async (id,token) => {
    try {
        const res = await axios.post(API.APIHOST + 'collection/del/'+id, {} , {
            headers: {
                "Authorization": 'bearer ' + token
            }
        });
        if (res.status == 200 && res.data) {
            return await res.data;
        } else {
            return {
                code: 400,
                data: null,
                msg: err
            };
        }
    } catch (err) {

        return {
            code: 400,
            data: null,
            msg: err
        };
    }
};
/**
 * 添加收藏夹名字 
 * @param {string 令牌}                 token
 * @param {string 收藏夹名字}            name
 */
exports.AddFavorites = async (obj, token) => {
    try {
        const res = await axios.post(API.APIHOST + 'collection/add', obj, {
            headers: {
                "Authorization": 'bearer ' + token
            }
        });
        return await res;

    } catch (err) {

        return {
            code: 400,
            data: null,
            msg: err
        };
    }
};
/**
 * 添加文章到收藏夹 
 * @param {string 令牌}                 token
 * @param {string 收藏id}               collectionId
 * @param {string 文章id}               articleID
 */
exports.AddArticleToFav = async (obj, token) => {
    try {
        const res = await axios.post(API.APIHOST + 'favorite/add', obj, {
            headers: {
                "Authorization": 'bearer ' + token
            }
        });
        return await res;
    } catch (err) {
        return {
            code: 400,
            data: null,
            msg: err
        };
    }
}
/**
 * 获取某个收藏夹的内容
 * @param {string 令牌}                 token
 * @param {string 收藏id}               collectionId
 */
exports.getFavoriteList = async (collectionId, token) => {
    try {
        const res = await axios.get(API.APIHOST + 'favorite/list/' + collectionId, {
            headers: {
                "Authorization": 'bearer ' + token,
                "Content-Type": "application/json"
            }
        });
        return await res;

    } catch (err) {

        return {
            code: 400,
            data: null,
            msg: err
        };
    }
}
/**
 * 获取关注列表 || 粉丝列表
 * @param {string 令牌}                 token
 */
exports.getAttentionList = async (name, token) => {
    try {
        if (name == 'attention') {
            const res = await axios.get(API.APIHOST + 'user/myFollow', {
                headers: {
                    "Authorization": 'bearer ' + token
                }
            });
            res.data.attentionStatus = 1; //关注列表 展示已关注状态    
            return await res.data;
        } else {
            const res = await axios.get(API.APIHOST + 'user/myFans', {
                headers: {
                    "Authorization": 'bearer ' + token
                }
            });
            res.data.attentionStatus = 0; //粉丝列表 展示未关注状态
            return await res.data;
        }
    } catch (err) {

        return {
            code: 400,
            data: null,
            msg: err
        };
    }
}
/**
 * 关注
 * @param {string 令牌}                 token
 * @param {NickName 昵称}               NickName
 */
exports.AttentionFollow = async (obj, token) => {
    try {
        const res = await axios.post(API.APIHOST + 'user/userFollow', obj, {
            headers: {
                "Authorization": 'bearer ' + token
            }
        });
        return await res.data;

    } catch (err) {

        return {
            code: 400,
            data: null,
            msg: err
        };
    }
}
/**
 * 取消关注
 * @param {string 令牌}                 token
 * @param {NickName 昵称}               NickName
 */
exports.AttentionUnFollow = async (obj, token) => {
    try {
        const res = await axios.post(API.APIHOST + 'user/userUnFollow', obj, {
            headers: {
                "Authorization": 'bearer ' + token
            }
        });
        return await res.data;

    } catch (err) {

        return {
            code: 400,
            data: null,
            msg: err
        };
    }
}
/**
 * 是否关注
 * @param { string 令牌 }                   token
 * @param { string 昵称 }                   NickName
 */
exports.AttentionIsFollow = async (obj, token) => {
    try {
        const res = await axios.post(API.APIHOST + 'user/isFollow', obj, {
            headers: {
                "Authorization": 'bearer ' + token
            }
        });
        return await res.data;

    } catch (err) {

        return {
            code: 400,
            data: null,
            msg: err
        };
    }
}
/**
 * 修改密码 
 * @param { string 令牌 }                     token
 * @param { string 旧密码 }                   oldPassword
 * @param { string 新密码 }                   newPassword
 */
exports.UpdatePwd = async (token,obj) => {

    try {
        const res = await axios.post(API.APIHOST + 'user/updatePwd', obj ,{
            headers: {
                "Authorization": 'bearer ' + token,
                "Content-Type": "application/json"
            }
        });
        return await res;

    } catch (err) {

        return {
            code: 400,
            data: null,
            msg: err
        };
    }
}
/**
 * 我的文章 
 * @param {number,pageSize}          每页数目
 * @param {number,page}              当前页
 */
exports.myArticleList = async (pageSize = 20, page = 1, token) => {
    try {
        const res = await axios.get(API.APIHOST + 'article/myArticles/' + pageSize + '/' + page, {
            headers: {
                "Authorization": 'bearer ' + token
            }
        });
        return await res.data;
    } catch (err) {
        return {
            code: 400,
            data: null,
            msg: err
        };
    }
}
/**
 * 用户写的文章列表 
 * @param {string,nickName}          昵称
 * @param {number,pageSize}          每页数目
 * @param {number,page}              当前页
 */
exports.allWriteArticles = async (nickName, pageSize = 20, page = 1, ) => {
    try {
        const res = await axios.get(API.APIHOST + 'article/hisArticles/' + nickName + '/' + pageSize + '/' + page);
        return await res.data;
    } catch (err) {
        return {
            code: 400,
            data: null,
            msg: err
        };
    }
}
/**
 * 原创用户列表 
 */
exports.getOriginalUser = async () => {
    try {
        const res = await axios.get(API.APIHOST + 'user/originalUserList');
        if (res.status == 200 && res.data.code == 200) {
            return res.data;
        } else {
            return {
                code: 400,
                data: null,
                msg: '没有数据'
            }
        }
    } catch (err) {
        return {
            code: 400,
            data: null,
            msg: err
        };
    }
}
/**
 * 用户消息设为已读
 * @param {id}                          消息id
 * @param {token}                       令牌
 */
exports.readMessage = async (id,token) => {
    try {
        const res = await axios.post(API.APIHOST + 'user/readMessage/' + id, {}, {
            headers: {
                "Authorization": 'bearer ' + token
            }
        });
        if (res.status == 200 && res.data.code == 200) {
            return res.data;
        } else {
            return {
                code: 400,
                data: null,
                msg: 'err'
            };
        }
    } catch (err) {
        return {
            code: 400,
            data: null,
            msg: err
        };
    }
}
/**
 * 判断昵称是否存在
 * @param {string} nickname 
 */
exports.isNickName = async (nickname) => {
    try {
        nickname = encodeURIComponent(nickname);
        const res = await axios.get(API.APIHOST + 'user/checkNickname?nickname=' + nickname);
        if (res.status == 200 && res.data.code == 200) {
            return res.data;
        } else {
            return {
                code: 400,
                data: null,
                msg: 'err'
            };
        }
    } catch (err) {
        return {
            code: 400,
            data: null,
            msg: err
        };
    }
}
/**
 * 提交实名认证资料
 * @param {*} token 
 * @param {*} option 
 */
exports.doCertificate = async (token,option) => {
    /** option 对象
     * {
        "IDCard":"340202199211113456",
        "name":"111",
        "frontOfIDCard":"66b7b73c62e781ca7f137a44b0656bac.jpg",
        "backOfIDCard":"15c8bce22eb117d0a6c8054e14a1b6a5.jpg"
       }
     */
    try {
        const res = await axios.post(API.APIHOST + 'user/certification', option, {
            headers: {
                "Authorization": 'bearer ' + token
            }
        });
        if (res.status == 200 && res.data.code == 200) {
            return res.data;
        } else {
            return {
                code: 400,
                data: null,
                msg: res.data.msg
            };
        }
    } catch (err) {
        return {
            code: 400,
            data: null,
            msg: err
        };
    }
}
/**
 * 实名认证状态
 * @param {*} token 
 */
exports.getUserCertificate = async (token)=> {
    try {
        const res = await axios.get(API.APIHOST + 'user/certificationStatus',{
            headers: {
                "Authorization": 'bearer ' + token
            }
        });
        if (res.status == 200 && res.data.code == 200) {
            return res.data;
        } else {
            return {
                code: 400,
                data: null,
                msg: 'err'
            };
        }
    } catch (err) {
        return {
            code: 400,
            data: null,
            msg: err
        };
    }
}
/**
 * 收益记录
 * @param {*} token 访问令牌
 * @param {*} pageSize 获取多少条
 * @param {*} page 当前第几页
 */
exports.getUserIncome = async (token,pageSize,page=1)=> {
    try {
        let incomeall=0
        const res = await axios.get(API.APIHOST + 'user/balanceModifyLogs/'+pageSize.toString()+'/'+page.toString(),{
            headers: {
                "Authorization": 'bearer ' + token
            }
        });
        if (res.status == 200 && res.data.code == 200) {
            //处理日期字段
            if(res.data.data.data.length>0){
                res.data.data.data.forEach((item,i)=>{
                    const localdate = new Date(item.createTime);
                    item.createTime = friendlyTime.getDateDiff(localdate.toLocaleString());
                });
                incomeall = res.data.data.data[0].lastOperateMoney
            }
            return {
                code:200,
                data:res.data.data.data,
                count:res.data.data.count,
                msg:'成功',
                incomeall:incomeall
            };
        } else {
            return {
                code: 400,
                data: null,
                msg: 'err',
                count:0,
                incomeall:incomeall
            };
        }
    } catch (err) {
        return {
            code: 400,
            data: null,
            msg: err,
            count:0,
            incomeall:incomeall
        };
    }
}
/**
 * 用户生成邀请码
 * @param {*} token 
 */
exports.GetUserInviteQRcode = async (token)=> {
    try {
        const res = await axios.get(API.APIHOST + 'user/generateInvitationCode',{
            headers: {
                "Authorization": 'bearer ' + token
            }
        });
        if (res.status == 200 && res.data.code == 200) {
            return {
                code: 200,
                data: res.data.data,
                msg: '成功'
            };
        } else {
            return {
                code: 400,
                data: null,
                msg: '失败'
            };
        }
    } catch (err) {
        return {
            code: 400,
            data: null,
            msg: err
        };
    }
}