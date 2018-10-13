// miniprogram/pages/orders/orders.js
var util = require("../../utils/util.js");
var app = getApp()

Page({
  data: {
    address: {},
    hasAddress: false,
    total: 0,
    orders: []
  },

  onReady() {
    this.getTotalPrice();
  },

  onShow: function() {
    var cart = wx.getStorageSync('cart')
    var orders = cart
    this.setData({
      orders: orders
    })
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let orders = this.data.orders;
    let total = 0;
    for (let i = 0; i < orders.length; i++) {
      total += orders[i].totalNum * orders[i].price;
    }
    this.setData({
      total: total
    })
  },

  confirm() {
    //将订单写入订单表及订单明细表
    var order_id = wx.getStorageSync('openid') + Date.parse(new Date()) / 1000
    //开始插入订单表
    app.dbconn.collection('order').add({
      data: {
        order_id: order_id,
        logistics_id: '',
        amout: this.data.total,
        logistics_fee: 0,
        status: 0,
        create_time: Date.parse(new Date()) / 1000,
        delete_time: 0,
        udpate_time: Date.parse(new Date()) / 1000
      },
      success: function(res) {
        console.log("订单添加成功!")
        //开始插入订单详情表
        var order = wx.getStorageSync('cart')
        console.log(order)
        for (var i = 0; i < order.length; i++) {
          app.dbconn.collection('orderdetail').add({
            data: {
              order_detail_id: order_id + '--' + i,
              order_id: order_id,
              goods_no: order[i].goods_no,
              totalNum: order[i].totalNum,
              goods_price: order[i].price,
              real_totalNum: order[i].totalNum,
              real_goods_price: order[i].price,
              create_time: Date.parse(new Date()) / 1000,
              delete_time: 0,
              udpate_time: Date.parse(new Date()) / 1000
            },
            success: function(res) {
              console.log(res)
              console.log("订单详情添加成功!")

              //订单表插入成功，订单明细表插入成功后，弹窗，点击确定跳转我的订单页面
              wx.showModal({
                title: '',
                content: '提交成功，等待卖家确认，卖家确认后将不能撤销！',
                text: 'center',
                showCancel: false,
                success: function(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    wx.navigateTo({
                      url: '../orderlist/orderlist'
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            },
            fail: function(res) {
              console.log("订单详情插入失败！")
              console.error
            }
          })
        }
      },
      fail: function(res) {
        console.log("订单表插入失败！")
        console.error
      }
    })
  }
})