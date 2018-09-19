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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})