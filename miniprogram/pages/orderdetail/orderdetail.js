// miniprogram/pages/orderdetail/orderdetail.js
var util = require("../../utils/util.js");
var app = getApp()

Page({
  data: {
    hasAddress: true,
    total: 0,
    orders: []
  },
  onLoad: function (options) {
    var that = this
    var order_id = parseInt(options.order_id)
    console.log("***********")
    console.log(order_id)
    console.log("***********")
    app.dbconn.collection('orderdetail').where({
      order_id: order_id,
      delete_time: 0
    }).limit(50).get({
      success: function(res) {
        console.log(res.data)
        var orders = res.data
        that.setData({
          orders:orders
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