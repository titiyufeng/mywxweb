// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  code = event.code


  var http = require('http');
  //get 请求外网
  http.get('http://my.futu5.com/message/unread-msg', function (req, res) {
    var html = '';
    req.on('data', function (data) {
      html += data;
      return 12;
    });
    return 13;
    req.on('end', function () {
      console.info(html);
    });
  });

}