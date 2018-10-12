const co = require('co');
const OSS = require('ali-oss');
const fs = require('fs');
const client = new OSS({
    region: 'oss-cn-hangzhou',
    accessKeyId: 'LTAIGRbcWlAw771B',
    accessKeySecret: 'weCBTvjsxojNEHnvtebTCvtXT72OVQ',
    bucket: 'yunhome'
  });
  exports.AliyunPutFile = async (file_url,name)=>{
    return  co(function* () {
            // use 'chunked encoding'
                // const stream = fs.createReadStream(file_url);
                // const result = yield client.putStream('object-key', stream);
                // console.log(result);
                // don't use 'chunked encoding'
                const stream = fs.createReadStream(file_url);
                const size = fs.statSync(file_url).size;
                const result = yield client.putStream(
                        name, stream, {contentLength: size});
                    
                    return result;
                })
                .catch(function (err) {
                    return err;
                });
  }
exports.AliyunPutVideo = async (file_url,name) => {

}