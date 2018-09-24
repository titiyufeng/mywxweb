// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_no: "",
    goods_detail : "",
    goods_name:"",
    detail_images:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var imgs = new Array()
    imgs.push("cloud://mywxweb-e946c5.6d79-mywxweb-e946c5/others/wechat.jpg")//加入微信联系图片
    if (imgs.length < 3){
      var cate_id = 0;
      cate_id = parseInt(options.goods_no / 10000000)
      for (var i = 1; i < 6; i++) {
        imgs.push("cloud://mywxweb-e946c5.6d79-mywxweb-e946c5/goods_images/" + cate_id + "/" + options.goods_no + "/" + options.goods_no + "0" + i + ".jpg")
      }  
    }
    this.setData({
      goods_no: options.goods_no,
      goods_detail: options.goods_detail,
      goods_name: options.goods_name,
      detail_images:imgs,
      wechat_name: options.wechat_name,
      wechat_id: options.wechat_id
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