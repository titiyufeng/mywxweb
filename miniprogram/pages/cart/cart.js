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
    totalPrice: 0, // 总价，初始为0
    selectAllStatus: true, // 全选状态，默认全选
    obj: {
      name: "hello"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function(options) {
      var cart
      var that = this
      //从缓存中获取购物车信息
      wx.getStorage({
        key: 'cart',
        success: function (res) {
          cart = res.data
          console.log("缓存中的购物车数据如下：")
          console.log(cart)
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
              success: function (res) {
                for (var t = 0; t < cart.length; t++) {
                  if (res.result.data[0].goods_no == cart[t].goods_no){
                    cart[t].title = res.result.data[0].goods_name
                    cart[t].price = res.result.data[0].goods_price
                  }
                }
                that.setData({
                  cart: cart,
                  hasList: true
                })
              },
              fail: console.error
            })
          }
        },
        fail: function (res) {
          cart = []
          that.setData({
            hasList: false,
            cart: cart
          })
        }
      })
    this.getTotalPrice();
  },
  // onShow() {
  //   this.setData({
  //     hasList: true,
  //     cart: [{
  //         id: 1,
  //         title: '新鲜法第三方士大夫所发生的发师傅水电费芹菜 半斤',
  //         image: 'cloud://mywxweb-e946c5.6d79-mywxweb-e946c5/goods_images/1/10000001/10000001.jpg',
  //         totalNum: 4,
  //         price: 0.01,
  //         selected: true
  //       },
  //       {
  //         id: 2,
  //         title: '素米 500g',
  //         image: 'cloud://mywxweb-e946c5.6d79-mywxweb-e946c5/goods_images/1/10000001/10000001.jpg',
  //         totalNum: 1,
  //         price: 0.03,
  //         selected: true
  //       }
  //     ]
  //   });
  //   this.getTotalPrice();
  // },
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
    const index = e.currentTarget.dataset.index;
    let cart = this.data.cart;
    let totalNum = cart[index].totalNum;
    totalNum = totalNum + 1;
    cart[index].totalNum = totalNum;
    this.setData({
      cart: cart
    });
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
   * 计算总价
   */
  getTotalPrice() {
    let cart = this.data.cart; // 获取购物车列表
    let total = 0;
    for (let i = 0; i < cart.length; i++) { // 循环列表得到每个数据
      if (cart[i].selected) { // 判断选中才会计算价格
        total += cart[i].totalNum * cart[i].price; // 所有价格加起来
      }
    }
    this.setData({ // 最后赋值到data中渲染到页面
      cart: cart,
      totalPrice: total.toFixed(2)
    });
  }

})