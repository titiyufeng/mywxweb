// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spu_no: "",
    goods_detail : "",
    goods_name:"",
    detail_images:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var imgs;
    imgs = options.detail_images.split(",");//将传递过来的detail_images（字符串）转成数组
    this.setData({
      spu_no: options.spu_no,
      goods_detail: options.goods_detail,
      goods_name: options.goods_name,
      detail_images:imgs
    })

  },

   /**
   * 预览明细页图片
   */
  imgYu: function (event) {
    console.log(event.currentTarget.dataset.index);
    var index = event.currentTarget.dataset.index;
    var detail_images = this.data.detail_images;
    wx.previewImage({
      current: detail_images[index],     //当前图片地址
      urls: detail_images,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})