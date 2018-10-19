// miniprogram/pages/orderlist/orderlist.js

var util = require("../../utils/util.js");
var app = getApp()

Page({
  data: {
    listData: [],
    pagenum: 1
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
    var tmp_listData
    var pagenum = that.data.pagenum

    app.dbconn.collection('order').where({
      openid: openid
    }).skip(pagenum * 20).limit(20).get({
      success: function(res) {
        if (res.data.length > 0) {
          var tmp_listData = res.data
          for (var i = 0; i < tmp_listData.length; i++) {
            tmp_listData[i].create_time = util.formatTime(tmp_listData[i].create_time, 'Y-M-D h:m:s')
            tmp_listData[i].status = status[tmp_listData[i].status]

            //根据订单状态判断是否显示撤销
            if (tmp_listData[i].status == '已提交') {
              tmp_listData[i].commond = true
            } else {
              tmp_listData[i].commond = false
            }

            //根据订单状态判断是否显示应付金额
            if (tmp_listData[i].status != '已发货' && tmp_listData[i].status != '已结款') {
              tmp_listData[i].total_amout = "--"
            } else {
              tmp_listData[i].total_amout = tmp_listData[i].amout + tmp_listData[i].logistics_fee
            }
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
    wx.hideLoading()
  }
})