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
      { text: '我的订单', url: '../orderlist/orderlist', icon: '../../resouce/my/oder.png', tips: '' }
      // { text: '收货地址', url: './address/address', icon: '../../resouce/my/address.png', tips: '' }
      // { text: '待归还', url: '../borrowbook/borrowbook?status=Y', icon: '../../images/usermenu/huan.png', tips: '' },
      // { text: '个人喜好', url: '../favorcate/favorcate', icon: '../../images/usermenu/favor.png', tips: '' },
    ],
    menuitems_manager: { text: '订单管理', url: '../ordersmanage/ordersmanage', icon: '../../resouce/my/oder.png', tips: '' },
    userinfo: wx.getStorageSync("userinfo"),
    is_manager:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openid = app.globalData.openid
    var that = this
    app.dbconn.collection('config').get({
      success: function (res) {
        var manager_openid = res.data[0].manager_openid
        wx.setStorageSync('manager_openid', manager_openid)
        //判断是否是管理员，如果是则展示“订单管理”菜单，如果不是则不展示
        for(var i = 0;i<manager_openid.length;i++){
          if (openid == manager_openid[i]) {
            that.setData({
              is_manager:true
            })
          }
        }
      },
      fail: console.error
    })
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