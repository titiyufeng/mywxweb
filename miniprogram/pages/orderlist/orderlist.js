// miniprogram/pages/orderlist/orderlist.js

var util = require("../../utils/util.js");
var app = getApp()

Page({
  data: {
    listData: []
  },
  onLoad: function() {
    var status = {"0": "已提交","1": "已确认","2": "已发货","3": "已结款","9": "已撤销"}
    var openid = wx.getStorageSync("openid")
    var listData
    var that = this
    app.dbconn.collection('order').where({
      openid: openid
    }).get({
      success: function(res) {
        if (res.data.length > 0) {
          console.log(res.data)
          var listData = res.data
          for (var i = 0; i < listData.length; i++) {
            listData[i].create_time = util.formatTime(listData[i].create_time, 'Y-M-D')
            listData[i].status = status[listData[i].status.toString()]
            listData[i].commond = "撤销"
          }
        }else{
          listData = []
        }
        that.setData({
          listData: listData
        })
      },
      fail: console.error
    })
  }
})