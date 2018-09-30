// pages/owner/owner.js
var util = require("../../utils/util.js");

var app = getApp()

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
    //获取微信id、微信昵称、卖家信息

    this.setData({
      wechat_id: app.globalData.wechat_id,
      wechat_name: app.globalData.wechat_name,
      final_text: app.globalData.final_text
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