// pages/detail/detail.js 
var util = require("../../utils/util.js");
var app = getApp()
Page({
  data: {
    detail_images_head: [],
    detail_images: [],
    interval: 3000,
    duration: 500,
    goods_infos: {
      goods_no: 1,
      goods_name: '',
      goods_price: 0.00,
      goods_limit_num: '',
      goods_detail: '',
      parameter: '125g/个',
      service: '不支持退货'
    },
    num: 1,
    totalNum: 0,
    cart_index: '', //该商品在购物车缓存数组中的下标
    curIndex: 0,
    show: false,
    scaleCart: false
  },

  onLoad: function(options) {
    var that = this
    var goods_no = options.goods_no * 1 //将前端传递过来的商品编号改成数字
    var cate_id = parseInt(goods_no / 10000000)
    var detail_images = [] //定义明细图片列表
    var detail_images_head = [] //明细页面头部图片
    var goods_infos //商品信息
    var cart //购物车
    var cart_index = '' //商品在购物车缓存中的下标
    var totalNum = 0 //购买数量

    //获取商品明细图片
    for (var i = 1; i < 6; i++) {
      detail_images.push("cloud://mywxweb-e946c5.6d79-mywxweb-e946c5/goods_images/" + cate_id + "/" + goods_no + "/" + goods_no + "0" + i + ".jpg")
    }
    detail_images_head.push(detail_images[0])

    //获取商品信息
    app.dbconn.collection('goods_datas').where({
      goods_no: goods_no,
      is_display: true
    }).get({
      success: function(res) {
        if (res.data.length == 0) { //如果没有找到商品，提示商品已经下架
          wx.showModal({
            content: '商品已经下架！',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                wx.navigateBack({
                  // delta: 2
                })
              }
            }
          })
        } else {
          that.setData({
            goods_infos: goods_infos,
            detail_images: detail_images,
            detail_images_head: detail_images_head
          })
          
          goods_infos = {
            goods_no: res.data[0].goods_no,
            goods_name: res.data[0].goods_name,
            goods_price: res.data[0].goods_price,
            goods_limit_num: res.data[0].goods_limit_num,
            goods_detail: res.data[0].goods_detail
          }

          //从缓存中获取购物车信息
          wx.getStorage({
            key: 'cart',
            success: function(res) {
              cart = res.data
              cart_index = ''
              totalNum = 0
              for (var i = 0; i < cart.length; i++) {
                if (cart[i].goods_no == goods_infos.goods_no) {
                  cart_index = i
                  totalNum = cart[i].totalNum
                }
              }
              that.setData({
                cart: cart,
                cart_index: cart_index,
                totalNum: totalNum
              })
            },
            fail: function(res) {
              cart = []
              that.setData({
                cart: cart
              })
            }
          })
        }
      }
    })

  },

  /**
   * 点击加号增加数量
   */
  addCount() {
    let num = this.data.num;
    num++;
    this.setData({
      num: num
    })

  },

  /**
   * 点击减号减少数量
   */
  subCount() {
    let num = this.data.num;
    if (num > 1) {
      num--;
      this.setData({
        num: num
      })
    }
  },

  /**
   * 添加至购物车
   */
  addToCart() {
    const self = this;
    const num = this.data.num;
    let total = this.data.totalNum;
    let totalNum = num + total
    let goods_infos = self.data.goods_infos
    let cart = self.data.cart

    //即将加入的数量与限购数量比较，如果大于限购数量，且限购数量不是0，则提示不能在加了，如果小于限购数量则可以继续加，如果限购数量为0则表示不限购
    if (totalNum > self.data.goods_infos.goods_limit_num && self.data.goods_infos.goods_limit_num != 0) {
      wx.showModal({
        content: '购买数量不能超过限购数量！',
        showCancel: false,
        success: function(res) {
          console.log()
        }
      })
    } else {
      //如果该商品在购物车缓存中有数据，则将最新的数量更新到cart中，如果没有数据则将数据推至cart中
      if (self.data.cart_index == '') {
        cart.push({
          goods_no: goods_infos.goods_no,
          totalNum: totalNum
        })
      } else {
        cart[self.data.cart_index].totalNum = totalNum
      }

      //将最新的购物车数据重新写入缓存
      wx.setStorageSync('cart', cart)

      self.setData({
        show: true
      })
      setTimeout(function() {
        self.setData({
          show: false,
          scaleCart: true
        })
        setTimeout(function() {
          self.setData({
            scaleCart: false,
            totalNum: totalNum
          })
        }, 200)
      }, 300)
    }
  },

  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  },

  /**
   * 预览明细页图片
   */
  imgYu: function(event) {
    var index = event.currentTarget.dataset.index;
    var detail_images = this.data.detail_images;
    wx.previewImage({
      current: detail_images[index], //当前图片地址
      urls: detail_images, //所有要预览的图片的地址集合 数组形式
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 使swiper中的图片自适应
   */
  imgHeight: function(e) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var imgh = e.detail.height; //图片高度
    var imgw = e.detail.width; //图片宽度
    var swiperH = winWid * imgh / imgw + "px" //等比设置swiper的高度。 即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度  ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    this.setData({
      Height: swiperH //设置高度
    })
  }

})