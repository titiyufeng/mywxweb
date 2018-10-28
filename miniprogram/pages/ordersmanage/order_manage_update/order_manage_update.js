// miniprogram/pages/ordersmanage/order_manage_update/order_manage_update.js
var util = require("../../../utils/util.js");
var app = getApp()
Page({
  data: {
    satuts: ["已提交", "已确认", "已发货", "已结款", "已撤销"],
    satutsIndex: 0,
    order: {}
  },
  onLoad: function(options) {
    var status = {
      "0": "已提交",
      "1": "已确认",
      "2": "已发货",
      "3": "已结款",
      "9": "已撤销"
    }
    var that = this
    var _id = options.id
    app.dbconn.collection('order').doc(_id).get({
      success: function(res) {
        var order
        order = res.data
        order.create_time = util.formatTime(order.create_time, 'Y-M-D h:m:s')
        order.status = status[order.status]
        that.setData({
          order: order
        })
      },
      fail: console.error
    })
  },
  satutsChange: function(e) {
    this.setData({
      satutsIndex: e.detail.value
    })
  },
  /**
 * 以下两个方法，是选择省与城市的方法
 */
  handleClick: function () {
    this.setData({
      isActive: true
    });
  },
  handleSelect: function (event) {
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