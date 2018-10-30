// miniprogram/pages/ordersmanage/order_manage_update/order_manage_update.js
var util = require("../../../utils/util.js");
var app = getApp()
Page({
  data: {
    status_list: ["已提交", "已确认", "已发货", "已结款", "已撤销"],
    statusIndex: 0,
    order: {},
    province: '', //省
    city: '' //市
  },
  onLoad: function(options) {
    var status = {
      "0": "已提交",
      "1": "已确认",
      "2": "已发货",
      "3": "已结款",
      "4": "已撤销"
    }
    var that = this
    var _id = options._id
    app.dbconn.collection('order').doc(_id).get({
      success: function(res) {
        var order
        order = res.data
        order.create_time = util.formatTime(order.create_time, 'Y-M-D h:m:s')
        var statusIndex = parseInt(order.status)
        order.status = status[order.status]
        that.setData({
          order: order,
          province: order.province, //省
          city: order.city,//市
          statusIndex:statusIndex
        })
      },
      fail: console.error
    })
  },

  /**
   *切换订单状态 
   */
  statusChange: function(e) {
    this.setData({
      statusIndex: e.detail.value
    })
  },

  /**
   *修改订单 
   */
  formSubmit: function(e) {
    var _id = e.detail.value._id
    var status = String(this.data.statusIndex)
    var username = e.detail.value.username
    var mobile = e.detail.value.mobile
    var logistics_fee = parseFloat(e.detail.value.logistics_fee)
    var logistics_id = e.detail.value.logistics_id
    var province = this.data.province
    var city = this.data.city
    var detail_address = e.detail.value.detail_address

    app.dbconn.collection('order').doc(_id).update({
      data: {
        status: status,
        username: username,
        mobile: mobile,
        logistics_fee: logistics_fee,
        logistics_id: logistics_id,
        province: province,
        city: city,
        detail_address: detail_address,
        update_time: Date.parse(new Date()) / 1000
      },
      success: function(res) {
        console.log("修改订单成功，更新记录数为：" + res.stats.updated + "条！")
        wx.showModal({
          content: '提交成功！',
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.navigateBack({
                delta: 1
              })
              // wx.reLaunch({
              //   url: '../ordersmanage'
              // })
            }
          }
        })
      },
      fail: console.error
    })

  },

  /**
   * 以下两个方法，是选择省与城市的方法
   */
  handleClick: function() {
    this.setData({
      isActive: true
    });
  },
  handleSelect: function(event) {
    console.log(event.detail);
    var province = event.detail[0]
    var city = event.detail[1].fullname
    this.setData({
      isActive: false,
      province: province,
      city: city
    });
  }
})