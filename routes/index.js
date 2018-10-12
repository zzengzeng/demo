const express = require('express');
const router = express.Router();
const home = require('../controller/home/index');
const filter = require('../filter/index');
const avatars = require('../controller/common/avatars');
/* GET home page. */
router.get('/',filter.loadmap, home.index);
router.post('/checktabxhr', home.checktabxhr);
/* 用户 */
router.get('/avatars', avatars.index); //头像转发
module.exports = router;