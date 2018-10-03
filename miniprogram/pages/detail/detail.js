// pages/detail/detail.js 
var util = require("../../utils/util.js");
var app = getApp()
Page({
  data: {
    detail_images: [],
    interval: 3000,
    duration: 800,
    goods_infos: {
      goods_no: 1,
      goods_name: '',
      goods_price: 0.00,
      goods_stock: '',
      goods_detail: '',
      parameter: '125g/个',
      service: '不支持退货'
    },
    num: 1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false
  },

  onLoad: function(options) {

    var goods_no = options.goods_no * 1
    var cate_id = parseInt(goods_no / 10000000)

    var detail_images = []
    for (var i = 1; i < 6; i++) {
      detail_images.push("cloud://mywxweb-e946c5.6d79-mywxweb-e946c5/goods_images/" + cate_id + "/" + goods_no + "/" + goods_no + "0" + i + ".jpg")
    }

    var that = this
    app.dbconn.collection('goods_datas').where({
      goods_no: goods_no,
      is_display: true
    }).get({
      success: function(res) {
        console.log(res.data.length)
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
          var goods_infos = {
            goods_no: res.data[0].goods_no,
            goods_name: res.data[0].goods_name,
            goods_price: res.data[0].goods_price,
            goods_stock: '有货',
            goods_detail: res.data[0].goods_detail
          }
          that.setData({
            goods_infos: goods_infos,
            detail_images: detail_images
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
   * 添加至购物车
   */
  addToCart() {
    const self = this;
    const num = this.data.num;
    let total = this.data.totalNum;

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
          hasCarts: true,
          totalNum: num + total
        })
      }, 200)
    }, 300)

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
    console.log(event.currentTarget.dataset.index);
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