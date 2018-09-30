// miniprogram/pages/my/my.js
var util = require("../../utils/util.js");
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    menuitems: [
      { text: '账号信息', url: '../userinfo/userinfo', icon: '../../resouce/my/my_19_19.png', tips: '' },
      { text: '我的订单', url: '../borrowbook/borrowbook?status=N', icon: '../../resouce/my/my_12_12.png', tips: '' },
      { text: '收货地址', url: '../borrowbook/borrowbook?status=F', icon: '../../resouce/my/my_25_25.png', tips: '' }
      // { text: '待归还', url: '../borrowbook/borrowbook?status=Y', icon: '../../images/usermenu/huan.png', tips: '' },
      // { text: '个人喜好', url: '../favorcate/favorcate', icon: '../../images/usermenu/favor.png', tips: '' },
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  }
})