// miniprogram/pages/cart/cart.js
var util = require("../../utils/util.js");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart: [], // 购物车列表
    hasList: false, // 列表是否有数据
    totalPrice: 0.00, // 总价，初始为0
    selectAllStatus: false, // 全选状态，默认全选
    is_display_order: true, //是否显示订单跳转链接图标
    obj: {
      name: "hello"
    }
  },

  // onShow() {
  //   var cart
  //   var that = this
  //   //从缓存中获取购物车信息
  //   wx.getStorage({
  //     key: 'cart',
  //     success: function(res) {
  //       cart = res.data
  //       console.log("show缓存中的购物车数据如下：")
  //       console.log(cart)
  //       for (var i = 0; i < cart.length; i++) {
  //         var index = i
  //         wx.cloud.callFunction({
  //           // 云函数名称
  //           name: 'get_goods_data',
  //           // 传给云函数的参数
  //           data: {
  //             env: app.globalData.env,
  //             goods_no: cart[i].goods_no,
  //           },
  //           success: function(res) {
  //             for (var t = 0; t < cart.length; t++) {
  //               if (res.result.data[0].goods_no == cart[t].goods_no) {
  //                 cart[t].goods_name = res.result.data[0].goods_name
  //                 cart[t].price = res.result.data[0].goods_price
  //                 cart[t].goods_limit_num = res.result.data[0].goods_limit_num
  //                 cart[t].selected = false
  //               }
  //             }
  //             //将最新的购物车数据重新写入缓存
  //             wx.setStorageSync('cart', cart)

  //             that.setData({
  //               cart: cart,
  //               hasList: true,
  //               selectAllStatus: false,
  //               totalPrice: 0.00,
  //               is_display_order: true
  //             })
  //           },
  //           fail: console.error
  //         })
  //       }
  //     },
  //     fail: function(res) {
  //       // cart = []
  //       that.setData({
  //         hasList: false
  //         // cart: cart
  //       })
  //     }
  //   })
  //   this.getTotalPrice();
  // },
  // /**
  //  * 当前商品选中事件
  //  */
  // selectList(e) {
  //   const index = e.currentTarget.dataset.index;
  //   let cart = this.data.cart;
  //   const selected = cart[index].selected;
  //   cart[index].selected = !selected;
  //   this.setData({
  //     cart: cart
  //   });
  //   this.getTotalPrice();
  // },

  // /**
  //  * 删除购物车当前商品
  //  */
  // deleteList(e) {
  //   const index = e.currentTarget.dataset.index;
  //   let cart = this.data.cart;
  //   cart.splice(index, 1);
  //   this.setData({
  //     cart: cart
  //   });
  //   if (!cart.length) {
  //     this.setData({
  //       hasList: false
  //     });
  //     //清空购物车的时候，同样需要将空cart写回缓存
  //     wx.setStorageSync('cart', cart)
  //   } else {
  //     this.getTotalPrice();
  //   }
  // },

  onShow() {
    var cart
    var that = this
    //从缓存中获取购物车信息
    cart = wx.getStorageSync("cart")
    console.log("show缓存中的购物车数据如下：")
    console.log(cart)

    if (cart != '' && cart != []) {
      for (var i = 0; i < cart.length; i++) {
        var index = i
        wx.cloud.callFunction({
          // 云函数名称
          name: 'get_goods_data',
          // 传给云函数的参数
          data: {
            env: app.globalData.env,
            goods_no: cart[i].goods_no,
          },
          success: function(res) {
            for (var t = 0; t < cart.length; t++) {
              if (res.result.data[0].goods_no == cart[t].goods_no) {
                cart[t].goods_name = res.result.data[0].goods_name
                cart[t].price = res.result.data[0].goods_price
                cart[t].goods_limit_num = res.result.data[0].goods_limit_num
                cart[t].selected = false
              }
            }
            //将最新的购物车数据重新写入缓存
            wx.setStorageSync('cart', cart)

            that.setData({
              cart: cart,
              hasList: true,
              selectAllStatus: false,
              totalPrice: 0.00,
              is_display_order: true
            })
          },
          fail: console.error
        })
      }
    } else {
      that.setData({
        hasList: false
        // cart: cart
      })
    }
    this.getTotalPrice();
  },
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let cart = this.data.cart;
    const selected = cart[index].selected;
    cart[index].selected = !selected;
    this.setData({
      cart: cart
    });
    this.getTotalPrice();
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let cart = this.data.cart;
    cart.splice(index, 1);
    this.setData({
      cart: cart
    });
    if (!cart.length) {
      this.setData({
        hasList: false
      });
      //清空购物车的时候，同样需要将空cart写回缓存
      wx.setStorageSync('cart', cart)
    } else {
      this.getTotalPrice();
    }
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let cart = this.data.cart;

    for (let i = 0; i < cart.length; i++) {
      cart[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      cart: cart
    });
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const goods_limit_num = e.currentTarget.dataset.goods_limit_num //限购数量
    const index = e.currentTarget.dataset.index;
    let cart = this.data.cart;
    let totalNum = cart[index].totalNum;

    if (totalNum < goods_limit_num || totalNum != 0) {
      totalNum = totalNum + 1;
      cart[index].totalNum = totalNum;
      this.setData({
        cart: cart
      });
    } else {
      wx.showModal({
        content: "该商品限购数量：" + goods_limit_num,
        showCancel: false,
        success: function(res) {
          console.log()
        }
      })
    }
    this.getTotalPrice();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let cart = this.data.cart;
    let totalNum = cart[index].totalNum;
    if (totalNum <= 1) {
      return false;
    }
    totalNum = totalNum - 1;
    cart[index].totalNum = totalNum;
    this.setData({
      cart: cart
    });
    this.getTotalPrice();
  },

  /**
   * 计算总价、并将最新的cart数据写入缓存
   */
  getTotalPrice() {
    let cart = this.data.cart; // 获取购物车列表
    let total = 0;
    let is_display_order = this.data.is_display_order
    for (let i = 0; i < cart.length; i++) { // 循环列表得到每个数据
      if (cart[i].selected) { // 判断选中才会计算价格
        total += cart[i].totalNum * cart[i].price; // 所有价格加起来
      }
    }

    //根据购物车合计金额判断是否展示订单链接图标
    if (total > 0) {
      is_display_order = false
    } else {
      is_display_order = true
    }

    //将最新的购物车数据重新写入缓存
    wx.setStorageSync('cart', cart)

    this.setData({ // 最后赋值到data中渲染到页面
      cart: cart,
      totalPrice: total.toFixed(2),
      is_display_order: is_display_order
    });
  }
})