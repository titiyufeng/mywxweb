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
    var that = this

    app.dbconn.collection('user').where({
      openid: app.globalData.openid
    }).get({
      success: function(res) {
        if (res.data.length == 1) {
          if (res.data[0].mobile) {
            that.setData({
              username: res.data[0].username,
              mobile: res.data[0].mobile,
              province: res.data[0].province,
              city: res.data[0].city,
              detail_address: res.data[0].detail_address,
            })
          } else {
            wx.showModal({
              title: '',
              content: '您尚未设置收货地址，请前往“我的-个人信息”页面进行设置！',
              confirmText: '去设置',
              text: 'center',
              showCancel: false,
              success: function(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.reLaunch({
                    url: '../my/userinfo/userinfo'
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        } else {
          console.log("用户信息不存在！")
        }

      },
      fail: console.error
    })

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
    var order_id = Date.parse(new Date()) / 1000
    var order = wx.getStorageSync('cart')
    wx.removeStorageSync('cart') //提交后将购物车清空
    //开始插入订单表
    app.dbconn.collection('order').add({
      data: {
        openid: app.globalData.openid,
        username: this.data.username,
        mobile: this.data.mobile,
        province: this.data.province,
        city: this.data.city,
        detail_address: this.data.detail_address,
        order_id: order_id,
        logistics_id: '', //运单号
        amout: this.data.total,
        real_amout: this.data.total,
        logistics_fee: 0, //运费
        status: '0',
        create_time: Date.parse(new Date()) / 1000,
        delete_time: 0,
        udpate_time: Date.parse(new Date()) / 1000
      },
      success: function(res) {
        console.log("订单添加成功!")
        //开始插入订单详情表
        // var order = wx.getStorageSync('cart')
        console.log(order)
        for (var i = 0; i < order.length; i++) {
          app.dbconn.collection('orderdetail').add({
            data: {
              order_detail_id: order_id + '--' + i,
              order_id: order_id,
              detail_images_head: order[i].detail_images_head,
              goods_name: order[i].goods_name,
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
            },
            fail: function(res) {
              console.log("订单详情插入失败！")
              console.error
            }
          })
        }
        //订单表插入成功，订单明细表插入成功后，弹窗，点击确定跳转我的订单页面
        wx.showModal({
          title: '',
          content: '提交成功，等待卖家确认，卖家确认后将不能撤销！',
          text: 'center',
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.reLaunch({
                url: '../index/index'
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      fail: function(res) {
        console.log("订单表插入失败！")
        console.error
      }
    })
  }
})