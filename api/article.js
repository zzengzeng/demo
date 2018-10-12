const API = require('./index');
const axios = require('axios');
/**
 * 根据id获取文章分类
 * @param {int } id 文章的父级id
 */
exports.ArticleCategoryById = async (id) => {
    try {
        
        const res = await axios.get(API.APIHOST + 'articleCategory/getCategoriesById?id=' + id.toString());
        
        return res.data;
        
    } catch (err) {
        return {
            code: 400,
            data: null,
            msg: 'err'
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
exports.ArticleDetailById = async (req, id = '5b18fce46521913524c37b1c') => {

    try {
        //console.log(axios.defaults.headers)
        if (!req.cookies['access']) {
            const res = await axios.get(API.APIHOST + 'article/getArticleById?id=' + id);
            if (res.status == 200 && res.data.code == 200) {
                return res.data;
            } else {
                return {
                    code: 400,
                    data: null,
                    msg: '查不到该文章'
                }
            }
        } else {
            const res = await axios.get(API.APIHOST + 'article/getArticleByIdIsLogin?id=' + id, {
                headers: {
                    "Authorization": 'bearer ' + req.cookies['access'],
                    "client": "pc"
                }
            });
            if (res.status == 200 && res.data.code == 200) {
                return res.data;
            } else {
                return {
                    code: 400,
                    data: null,
                    msg: '查不到该文章'
                }
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
 * 根据文章的分类id获取文章列表
 * @param {Number} rank 文章主分类id 1:新闻 2：技术
 * @param {Number} cateId 文章子分类id
 * @param {Number} sort 排序方式 1:时间倒序 2:阅读量倒序
 * @param {Number} page 当前是第几页
 * @param {Number} pageNum 每页多少条
 * @param {Number} isOriginal 是原创传1 否则不用传
 */
exports.ArticleLists = async (rank, cateId, sort = 1, pageNum = 20, page = 1, isOriginal) => {
    try {
        if (isOriginal) {
            const res = await axios.get(API.APIHOST + 'articleCategory/getArticlesByCategoriesId/' +
                rank.toString() + '/' + cateId.toString() + '/' + sort.toString() + '/' + pageNum.toString() + '/' + page.toString() + '?isOriginal='+ isOriginal);
            if (res.status == 200 && res.data.code == 200) {
                return res.data;
            } else {
                return {
                    code: 400,
                    data: null,
                    msg: '没有数据'
                }
            }    
        } else {
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
/**
 * 用户添加提交文章
 * @param {Object} Article -- 提交的article对象
 */
exports.ArticleAdd = async (token, Article) => {
    try {
        const res = await axios.post(API.APIHOST + 'article/addArticle', Article, {
            headers: {
                "Authorization": 'bearer ' + token,
                "Content-Type": "application/json"
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
 * 获取所有的文章标签
 */
exports.ArticleAllTags = async () => {
    try {
        const res = await axios.get(API.APIHOST + 'article/allTags');
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
 * 文章编辑
 * @param { string 令牌 }                                       token
 * @param { string 文章id}                                      id
 * @param { number  一级分类 1: 新闻 2:技术 }                     Category1ID
 * @param { string category1 }                                 Category1
 * @param { number 二级分类 }                                   Category2ID
 * @param { string category2 }                                 Category2
 * @param { number 三级分类 }                                   Category3ID
 * @param { string category3 }                                 Category3
 * @param { string 标题 }                                       Title
 * @param { string 描述 }                                       Abstract
 * @param { array 标签 }                                        Tags
 * @param { string 文本 }                                       Text
 * @param { string 来源 }                                       TextOrigin
 * @param { string 封面 }                                       ArticleImageUrl
 */
exports.ArticleEdit = async (token, obj) => {
    try {
        const res = await axios.post(API.APIHOST + 'article/editArticle', obj, {
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
 * 文章删除
 * @param { string 令牌 }                                       token
 * @param { string 文章id}                                      id
 */
exports.ArticleDel = async (id, token) => {
    try {
        const res = await axios.post(API.APIHOST + 'article/delArticle/' + id, {}, {
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
 * 文章点赞
 * @param { string 令牌 }                                       token
 * @param { string 文章id}                                      id
 */
exports.ArticleLike = async (id, token) => {
    try {
        const res = await axios.post(API.APIHOST + 'article/like/' + id, {}, {
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
            msg: '失败'
        }
    }
}
/**
 * 文章取消点赞
 * @param { string 令牌 }                                       token
 * @param { string 文章id}                                      id
 */
exports.ArticleCancleLike = async (id, token) => {
    try {
        const res = await axios.post(API.APIHOST + 'article/cancelLike/' + id, {}, {
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
            msg: '失败'
        }
    }
}
/**
 * 文章踩
 * @param { string 令牌 }                                       token
 * @param { string 文章id}                                      id
 */
exports.ArticleDisLike = async (id, token) => {
    try {
        const res = await axios.post(API.APIHOST + 'article/dislike/' + id, {}, {
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
            msg: '失败'
        }
    }
}
/**
 * 文章取消踩
 * @param { string 令牌 }                                       token
 * @param { string 文章id}                                      id
 */
exports.ArticleCancleDisLike = async (id, token) => {
    try {
        const res = await axios.post(API.APIHOST + 'article/cancelDislike/' + id, {}, {
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
            msg: '失败'
        }
    }
}
/**
 * 获取标签下的文章
 * @param { name   标签名字 }                                        name
 * @param { Number 当前是第几页}                                     page         
 * @param { Number 每页多少条}                                       pageNum
 */
exports.ArticleTags = async (name, pageNum = 10, page = 1) => {
    try {
        const res = await axios.get(API.APIHOST + 'article/getArticlesByTag/' + name + '/' + pageNum + '/' + page);
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
            msg: '失败'
        }
    }
}
/**
 * 系列课程
 */
exports.ArticleSeries = async() =>{
    try {
        const res = await axios.get(API.APIHOST + 'article/series');
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
            msg: '失败'
        }
    }
}
/**
 * 根据id获取系列课程
 */
exports.ArticleSeriesList = async(id) =>{
    try {
        const res = await axios.get(API.APIHOST + 'article/seriesById/'+id);
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
            msg: '失败'
        }
    }
}