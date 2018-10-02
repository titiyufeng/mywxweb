// miniprogram/pages/my/my.js
var util = require("../../utils/util.js");
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    menuitems: [
      { text: '个人信息', url: './userinfo/userinfo', icon: '../../resouce/my/userinfo.png', tips: '' },
      { text: '我的订单', url: './order/order', icon: '../../resouce/my/oder.png', tips: '' },
      { text: '收货地址', url: './address/address', icon: '../../resouce/my/address.png', tips: '' }
      // { text: '待归还', url: '../borrowbook/borrowbook?status=Y', icon: '../../images/usermenu/huan.png', tips: '' },
      // { text: '个人喜好', url: '../favorcate/favorcate', icon: '../../images/usermenu/favor.png', tips: '' },
    ],
    userinfo: wx.getStorageSync("userinfo")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 获取用户信息
   */
  bindGetUserInfo: function (e) {
    var userinfo = e.detail.userInfo
    wx.setStorageSync("userinfo", userinfo)
    this.setData({
      userinfo: userinfo
    })
  }
})