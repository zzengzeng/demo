const API = require('./index');
const axios = require('axios');
/** 获取快讯列表
 * @param {Number} page 当前是第几页
 * @param {Number} pageNum 每页多少条
 */
exports.ExpressLists = async (pageNum = 10, page = 1) => {
    try {
        const res = await axios.get(API.APIHOST + 'newsFlash/news/' + pageNum.toString() + '/' + page.toString());
        return res.data;
    } catch (err) {
        return {
            code: 400,
            data: null,
            msg: err
        };
    }
}
/**
 * 获取所有文章分类
 */
exports.ArticleCategoryAll = async () => {
    try {
        const res = await axios.get(API.APIHOST + 'articleCategory/all');
        return res.data;
    } catch (err) {
        return {
            code: 400,
            data: null,
            msg: err
        };
    }
}
/**
 * 根据id获取某文章的详情
 * @param {string} id 文章的id
 */
exports.ArticleDetailById = async (id = '5b18fce46521913524c37b1c') => {

    try {
        const res = await axios.get(API.APIHOST + 'article/getArticleById?id=' + id);

        if (res.status == 200 && res.data.code == 200) {
            return res.data;
        } else {
            return {
                code: 400,
                data: null,
                msg: "查不到该文章"
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
 * 根据文章的分类id获取文章列表
 * @param {Number} rank 文章主分类id 1:新闻 2：技术
 * @param {Number} cateId 文章子分类id
 * @param {Number} sort 排序方式 1:时间倒序 2:阅读量倒序
 * @param {Number} page 当前是第几页
 * @param {Number} pageNum 每页多少条
 */
exports.ArticleLists = async (rank, cateId, sort = 1, pageNum = 20, page = 1) => {
    try {
        const res = await axios.get(API.APIHOST + 'articleCategory/getArticlesByCategoriesId/' +
            rank.toString() + '/' + cateId.toString() + '/' + sort.toString() + '/' + pageNum.toString() + '/' + page.toString());
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
        }
    }
}
/**
 * 将文章浏览记录入数据库
 * @param {string} token 访问令牌
 * @param {Object} article 文章对象,见新闻和文章详情页
 */
exports.ArticleLogInDb = async (token = '', article) => {
    try {
        if (token == '') {
            const res = await axios.post(API.APIHOST + 'article/addBrowseHistoryNoLogin', article);
            if (res.status == 200 && res.data.code == 200) {
                return res.data;
            } else {
                return {
                    code: 400,
                    data: null,
                    msg: '失败'
                }
            }
        } else {
            const res = await axios.post(API.APIHOST + 'article/addBrowseHistory', article, {
                headers: {
                    "Authorization": 'bearer ' + token,
                    "client": "pc"
                }
            });
            if (res.status == 200 && res.data.code == 200) {
                return res.data;
            } else {
                return {
                    code: 400,
                    data: null,
                    msg: '失败'
                }
            }
        }
    } catch (err) {
        return {
            code: 400,
            data: null,
            msg: '失败'
        }
    }
}
/**
 * 是否收藏过该文章 
 * @param {
 *   token:string, //令牌
 *   id: string    //文章id
 * }  
 */
exports.isCollection = async (id, token) => {

    try {
        const res = await axios.get(API.APIHOST + 'favorite/isCollection/' + id, {
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
exports.hots = async () => {
    try {
        const res = await axios.get(API.APIHOST + 'article/hottestArticles');

        if (res.status == 200 && res.data.code == 200) {
            return res.data;
        } else {
            return {
                code: 400,
                data: null,
                msg: '失败'
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
 * 搜索文章
 * @param {
 *   key,               //关键字
 *   pageindex         //第几页
 * }  
 */
exports.ArticleSearchList = async (req, key, pageindex) => {

    try {
        if (!req.cookies['access']) {
            const res = await axios.get(API.APIHOST + 'article/search/' + key + '/' + pageindex);
            return await res;
        } else {
            const res = await axios.get(API.APIHOST + 'article/searchIsLogin/' + key + '/' + pageindex, {
                headers: {
                    "Authorization": 'bearer ' + req.cookies['access'],
                    "client": "PC"
                }
            });
            return await res;
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
 * 搜索文章(未登录) 
 * @param {
 *   key,               //关键字
 *   pageindex         //第几页
 * }  
 */
exports.ArticleSearchListUnlogin = async (key, pageindex) => {

    try {
        const res = await axios.get(API.APIHOST + 'article/search/' + key + '/' + pageindex);
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
 * 相关文章 
 * @param {
 *   新闻传category2ID 技术传category3ID
 * }  
 */
exports.RelatedArticlesList = async (id) => {

    try {
        const res = await axios.get(API.APIHOST + 'article/relatedArticles/' + id);
        return await res;

    } catch (err) {

        return {
            code: 400,
            data: null,
            msg: err
        };
    }
};