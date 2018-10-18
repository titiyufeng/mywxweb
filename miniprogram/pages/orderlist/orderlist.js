// miniprogram/pages/orderlist/orderlist.js

var util = require("../../utils/util.js");
var app = getApp()

Page({
  data: {
    listData: []
  },
  onLoad: function() {
    var status = {
      "0": "已提交",
      "1": "已确认",
      "2": "已发货",
      "3": "已结款",
      "9": "已撤销"
    }
    var openid = app.globalData.openid
    var listData
    var that = this
    app.dbconn.collection('order').where({
      openid: openid
    }).get({
      success: function(res) {
        if (res.data.length > 0) {
          console.log(res.data[0])
          console.log(res.data[1])
          var listData = res.data
          for (var i = 0; i < listData.length; i++) {
            listData[i].create_time = util.formatTime(listData[i].create_time, 'Y-M-D h:m:s')
            listData[i].status = status[listData[i].status]

            //根据订单状态判断是否显示撤销
            if (listData[i].status == '已提交') {
              listData[i].commond = true
            } else {
              listData[i].commond = false
            }

            //根据订单状态判断是否显示应付金额
            if (listData[i].status != '已发货' && listData[i].status != '已结款') {
              listData[i].total_amout = "--"
            } else {
              listData[i].total_amout = listData[i].amout + listData[i].logistics_fee
            }
          }
        } else {
          listData = []
        }
        that.setData({
          listData: listData
        })
      },
      fail: console.error
    })
  },

  /**
   * 撤销订单
   */
  cancel: function(e) {
    var that = this
    wx.showModal({
      // title: '撤销',
      content: '确定要撤销吗？',
      success: function(res) {
        if (res.confirm) {
          app.dbconn.collection('order').doc(e.target.id).update({
            data: {
              status: 9
            },
            success: function(res) {
              console.log("订单撤销成功")
              wx.showModal({
                content: '撤销成功',
                showCancel: false,
                success: function() {
                  that.onLoad() //调用onload方法重新加载页面数据
                }
              })
            },
            fail: console.error
          })
        } else {
          console.log("用户点击了取消")
        }
      }
    })
  },

  /**
   *上拉触底事件：加载第二页 
   */
  onReachBottom() {
    console.log(123123123123)
    wx.showLoading({
      title: '加载中',
    })
    wx.hideLoading()
  }
})