// miniprogram/pages/orderdetail/orderdetail.js
var util = require("../../utils/util.js");
var app = getApp()

Page({
  data: {
    hasAddress: true,
    total: 0,
    orders: [],
    logistics_fee: 0,
    amout: 0,
    status: ''
  },
  onLoad: function(options) {
    var that = this
    var order_id = parseInt(options.order_id)
    var logistics_fee = options.logistics_fee
    var amout = options.amout
    var status = options.status
    app.dbconn.collection('orderdetail').where({
      order_id: order_id,
      delete_time: 0
    }).limit(50).get({
      success: function(res) {
        var orders = res.data
        that.setData({
          orders: orders,
          logistics_fee: logistics_fee,
          amout: amout,
          status: status
        })
      },
      fail: console.error
    })
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    var that = this
    var orders = that.data.orders;
    console.log('----------------')
    console.log(orders)
    console.log('----------------')
    let total = 2;
    for (let i = 0; i < orders.length; i++) {
      total += orders[i].totalNum * orders[i].goods_price;
    }
    that.setData({
      total: total
    })
  }
})