// pages/owner/owner.js
var get_db_conn = require("../../utils/util.js");

//获取数据库连接
var dbconn = get_db_conn.get_db_conn();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wechat_name: "",
    wechat_id: "",
    final_text: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //获取微信id、微信昵称、卖家信息
    dbconn.collection('config').get({
      success: function(res) {
        var wechat_id = res.data[0]["wechat_id"]
        var wechat_name = res.data[0]["wechat_name"]
        var final_text = res.data[0]["final_text"]
        that.setData({
          wechat_id: wechat_id,
          wechat_name: wechat_name,
          final_text: final_text
        })
      }
    })
  },

  /**
   * 预览明细页图片
   */
  imgYu: function(event) {
    var src = event.target.dataset.src;
    console.log(src)
    wx.previewImage({
      current: src, //当前图片地址
      urls: [src], //所有要预览的图片的地址集合 数组形式
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})