
### 安装依赖包
        npm install

### 开发启动
	npm run start

### 开发启动
	需要新建.env文件 
        APIHOST=http://api.bitbee.io/

### 演示地址
        http://localhost:5000

### 目录结构

    ├── api
    │   ├── article.js              //文章接口
    │   ├── express.js              //快讯接口
    │   └── user.js                 //用户接口
    ├── bin                         //bin
    │   └── www                     
    ├── controller                  //控制器 调用接口获取数据
    │   ├── common                  //公用
    │   │   └── avatar.js           //头像转发    
    │   └── home                    //首页
    │       └── index.js
    ├── filter                      //过滤器
    ├── public                      //资源文件
    │   ├── fonts                   //字体文件
    │   ├── img                     //图片文件夹
    │   ├── js                      //js
    │   └── less                    //样式文件
    ├── routes                      //路由
    │   └── index.js
    ├── temp                        //临时文件
    ├── util                        //工具类
    │   └── friendlyTime.js         //友好时间转换
    ├── views                       //页面
    │   ├── global                  //全局
    │   │   ├── footer.html         //底部
    │   │   ├── header.html         //头部
    │   │   ├── header-top.html     //头部导航
    │   │   └── subcat.html         //学院分类
    │   ├── home
    │   │   ├── block               //公用
    │   │   │   ├── new-sort.html   //新闻排序
    │   │   │   ├── new-tab.html    //新闻tab
    │   │   │   ├── tech-sort.html  //技术排序
    │   │   │   └── tech-tab.html   //技术tab
    │   │   └── index.html          //首页
    │   └── layout                  //基础布局
    │       └──  layout.html      
    ├── app.js                      //入口文件
    ├── package.json                //包配置文件
    ├── postcss.config.js           //CSS 处理
    ├── webpack.config.js           //webpack配置文件
    └── webpack.package.js          //webpack配置文件




### 部分功能截图
        <img src="https://github.com/zzengzeng/demo/blob/master/public/screenshots/screenshots.png" />

### 说明
        此demo依据express搭建，仅供学习参考。



