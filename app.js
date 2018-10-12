const express = require('express');
const ueditor = require("ueditor");
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const upload = require('./routes/upload');
const cons   = require('consolidate');
const expressValidator = require('express-validator');
const useragent = require('express-useragent');
const app = express();

const oss = require('./api/oss');
// 模版引擎 设定
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(expressValidator({
    customValidators: {
        isImage: function(value, filename) {
    
            var extension = (path.extname(filename)).toLowerCase();
            switch (extension) {
                case '.bmp':
                    return '.bmp';
                case '.jpg':
                    return '.jpg';
                case '.jpeg':
                    return '.jpeg';
                case  '.png':
                    return '.png';
                default:
                    return false;
            }
        },
        isEqual: function(value1, value2) {
            return value1 === value2
        }
    }}));
app.use(bodyParser.json({limit: '4mb'}));
app.use(bodyParser.urlencoded({limit: '4mb', extended: true}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {
//     //客户端上传文件设置
//     var imgDir = '/img/ueditor/'
//     var ActionType = req.query.action;
//     if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
//         var file_url = imgDir;//默认图片上传地址
//         //const file_url = 
//         /*其他上传格式的地址*/
//         if (ActionType === 'uploadfile') {
//             file_url = '/file/ueditor/'; //附件
//         }
//         if (ActionType === 'uploadvideo') {
//             file_url = '/video/ueditor/'; //视频
//         }
        
//         res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
//         //console.log(file)
//         res.setHeader('Content-Type', 'text/html');
//     }
//     //  客户端发起图片列表请求
//     else if (req.query.action === 'listimage') {
//         var dir_url = imgDir;
//         res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
//     }
//     // 客户端发起其它请求
//     else {
//         res.setHeader('Content-Type', 'application/json');
//         res.redirect('/ueditor/ueditor.config.json');
//     }
// }));

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(useragent.express());
app.use('/', routes);
app.use('/', upload);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    if(req.xhr) {
        res.status(200);
        res.json({
            code:400,
            msg:err.message
        });
    } else {
        res.status(200);
        res.render('error');
    }
   
});

module.exports = app;
