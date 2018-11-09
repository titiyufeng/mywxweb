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
  },

  onLoad(options) {
    var openid = app.globalData.openid
    var order_id = parseInt(options.order_id)
    // var order_id = 1540428004
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
            totalPrice: totalPrice.toFixed(2),
            is_display_order: true
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
      totalPrice: total.toFixed(2),
      is_display_order: is_display_order
    });
  }
})