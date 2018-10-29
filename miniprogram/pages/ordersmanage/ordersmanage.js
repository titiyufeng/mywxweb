// miniprogram/pages/ordersmanage/ordersmanage.js

var util = require("../../utils/util.js");
var app = getApp()

Page({
  data: {
    listData: [],
    pagenum: 1,
    show: true
  },
  onShow: function() {
    var status = {
      "0": "已提交",
      "1": "已确认",
      "2": "已发货",
      "3": "已结款",
      "9": "已撤销"
    }
    var openid = app.globalData.openid
    var manager_openid = wx.getStorageSync('manager_openid')
    var listData = []
    var that = this

    for (var i = 0; i < manager_openid.length; i++) {
      if (openid == manager_openid[i]) {
        app.dbconn.collection('order').where({
          delete_time: 0
        }).get({
          success: function(res) {
            if (res.data.length > 0) {
              var listData = res.data
              for (var i = 0; i < listData.length; i++) {
                listData[i].create_time = util.formatTime(listData[i].create_time, 'Y-M-D h:m:s')
                listData[i].status = status[listData[i].status]
              }
            }
            that.setData({
              listData: listData
            })
          },
          fail: console.error
        })
        break
      }
    }
  },
  /**
   *上拉触底事件：加载第二页 
   */
  onReachBottom() {
    wx.showLoading({
      title: '加载中',
    })
    var status = {
      "0": "已提交",
      "1": "已确认",
      "2": "已发货",
      "3": "已结款",
      "9": "已撤销"
    }
    var that = this
    var openid = app.globalData.openid
    var manager_openid = wx.getStorageSync('manager_openid')
    var tmp_listData
    var pagenum = that.data.pagenum

    for (var i = 0; i < manager_openid.length; i++) {
      if (openid == manager_openid[i]) {
        app.dbconn.collection('order').where({
          delete_time: 0
        }).skip(pagenum * 20).limit(20).get({
          success: function(res) {
            if (res.data.length > 0) {
              var tmp_listData = res.data
              for (var i = 0; i < tmp_listData.length; i++) {
                tmp_listData[i].create_time = util.formatTime(tmp_listData[i].create_time, 'Y-M-D h:m:s')
                tmp_listData[i].status = status[tmp_listData[i].status]
              }
              var listData = that.data.listData
              var total_listData = []
              for (var i in listData) {
                total_listData.push(listData[i])
              }
              var total_listData = total_listData.concat(tmp_listData)
              that.setData({
                listData: total_listData,
                pagenum: pagenum + 1
              })
            } else {
              wx.showToast({
                icon: 'none',
                title: '没有更多数据啦！'
              })
            }
          },
          fail: console.error
        })
        break
      }
    }
    wx.hideLoading()
  },

  /***
   *跳转修改订单 
   */
  update_order: function(e) {
    var url = '/pages/ordersmanage/order_manage_update/order_manage_update?_id=' + e.target.id
    wx.navigateTo({
      url: url
    })
  },
  /***
   *跳转修改订单详情
   */
  update_orderdetail: function(e) {
    var url = '/pages/ordersmanage/orderdetail_manage_update/orderdetail_manage_update?_id=' + e.target.id
    wx.navigateTo({
      url: url
    })
  },

  filter: function(e) { //点击筛选事件
    var animation = wx.createAnimation({ //创建动画
      duration: 1000,
      timingFunction: 'ease',
      width: 300,
      height: 800,
      top: 0,
      bottom: 0,
      right: 0,
      backgroundColor: '#fff',
      opcity: 0.5
    })

    this.animation = animation

    animation.translateX(-100 + 'vh').step() //动画效果向右滑动100vh

    this.setData({
      animationData: animation.export(),
      show: true
    })
  }
})