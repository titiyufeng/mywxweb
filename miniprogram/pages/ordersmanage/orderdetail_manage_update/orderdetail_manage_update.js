// miniprogram/pages/ordersmanage/orderdetail_manage_update/orderdetail_manage_update.js
var util = require("../../../utils/util.js");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderdetail: [], // 购物车列表
    hasList: false, // 列表是否有数据
    totalPrice: 0.00, // 总价，初始为0
    selectAllStatus: false, // 全选状态，默认全选
    is_display_order: true, //是否显示订单跳转链接图标
    order_id: '',
    order_id_id: ''
  },

  onLoad(options) {
    var openid = app.globalData.openid
    var order_id = parseInt(options.order_id)
    var order_id_id = options._id
    var that = this
    var orderdetail
    var totalPrice = 0
    app.dbconn.collection('orderdetail').where({
      order_id: order_id,
      _openid: openid,
      delete_time: 0
    }).limit(40).get({
      success: function(res) {
        if (res.data.length > 0) {
          var orderdetail = res.data

          for (let i = 0; i < orderdetail.length; i++) { // 循环列表得到每个数据
            totalPrice += orderdetail[i].real_totalNum * orderdetail[i].real_goods_price; // 所有价格加起来
          }

          that.setData({
            orderdetail: orderdetail,
            hasList: true,
            selectAllStatus: false,
            totalPrice: totalPrice,
            is_display_order: true,
            order_id: order_id,
            order_id_id: order_id_id
          })
        } else {}
      },
      fail: console.error
    })
    this.getTotalPrice();
  },
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let orderdetail = this.data.orderdetail;
    const selected = orderdetail[index].selected;
    orderdetail[index].selected = !selected;
    this.setData({
      orderdetail: orderdetail
    });
    this.getTotalPrice();
  },
  /**
   * 全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let orderdetail = this.data.orderdetail;

    for (let i = 0; i < orderdetail.length; i++) {
      orderdetail[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      orderdetail: orderdetail
    });
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let orderdetail = this.data.orderdetail;
    let real_totalNum = orderdetail[index].real_totalNum;
    real_totalNum = real_totalNum + 1;
    orderdetail[index].real_totalNum = real_totalNum;
    this.setData({
      orderdetail: orderdetail
    });
    this.getTotalPrice();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let orderdetail = this.data.orderdetail;
    let real_totalNum = orderdetail[index].real_totalNum;
    if (real_totalNum <= 0) {
      return false;
    }
    real_totalNum = real_totalNum - 1;
    orderdetail[index].real_totalNum = real_totalNum;
    this.setData({
      orderdetail: orderdetail
    });
    this.getTotalPrice();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let orderdetail = this.data.orderdetail; // 获取订单列表
    let total = 0;
    let is_display_order = this.data.is_display_order
    for (let i = 0; i < orderdetail.length; i++) { // 循环列表得到每个数据
      // if (orderdetail[i].selected) { // 判断选中才会计算价格
      //   total += orderdetail[i].real_totalNum * orderdetail[i].real_goods_price; // 所有价格加起来
      // }
      total += orderdetail[i].real_totalNum * orderdetail[i].real_goods_price; // 所有价格加起来
    }

    //根据订单合计金额判断是否展示订单链接图标
    if (total > 0) {
      is_display_order = false
    } else {
      is_display_order = true
    }


    this.setData({ // 最后赋值到data中渲染到页面
      orderdetail: orderdetail,
      totalPrice: total,
      is_display_order: is_display_order
    });
  },
  /**
   * 更新订单表
   */
  order_updata: function(e) {
    var that = this
    var openid = app.globalData.openid
    var order_id_id = that.data.order_id_id
    var real_amout = that.data.totalPrice
    var orderdetail = that.data.orderdetail
    console.log(this.data.order_id_id)
    console.log(this.data.totalPrice)

    for (let i = 0; i < orderdetail.length; i++) {
      console.log(orderdetail[i].status)
      if (orderdetail[i].status == '0') {
        wx.showModal({
          content: '第' + (i+1) + '条订单明细未确认！',
          showCancel: false,
        })
        break
      } else {
        app.dbconn.collection('order').doc(order_id_id).update({
          data: {
            real_amout: real_amout
          },
          success: function(res) {
            wx.showModal({
              content: '修改成功，确认订单明细表更新成功！',
              showCancel: false,
            })
          },
          fail: console.error
        })
      }
    }

  },
  /**
   * 更新订单明细表
   */
  orderdetail_updata: function(e) {
    var _id = e.currentTarget.dataset._id
    var real_totalnum = e.currentTarget.dataset.real_totalnum
    app.dbconn.collection('orderdetail').doc(_id).update({
      data: {
        real_totalNum: real_totalnum
      },
      success: function(res) {
        wx.showModal({
          content: '修改成功，确认订单表更新成功！',
          showCancel: false,
        })
      },
      fail: console.error
    })
  },
  /**
   * 确认订单明细表
   */
  orderdetail_confirm: function(e) {
    var _id = e.currentTarget.dataset._id
    var real_totalnum = e.currentTarget.dataset.real_totalnum
    app.dbconn.collection('orderdetail').doc(_id).update({
      data: {
        status: '1'
      },
      success: function(res) {
        wx.showModal({
          content: '订单明细确认成功！',
          showCancel: false,
        })
      },
      fail: console.error
    })
  }
})