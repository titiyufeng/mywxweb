// miniprogram/pages/orders/orders.js
Page({
  data: {
    address: {},
    hasAddress: false,
    total: 0,
    orders: [{
        goods_no: 1,
        goods_name: '新鲜芹werwerwe菜 半斤',
        detail_images_head: ['cloud://mywxweb-e946c5.6d79-mywxweb-e946c5/goods_images/1/10000001/10000001.jpg'],
        totalNum: 4,
      price: 0.01
      },
      {
        goods_no: 2,
        goods_name: '素werwerwerwe米 500g',
        detail_images_head: ['cloud://mywxweb-e946c5.6d79-mywxweb-e946c5/goods_images/1/10000001/10000001.jpg'],
        totalNum: 1,
        price: 0.03
      }
    ]
  },

  onReady() {
    this.getTotalPrice();
  },

  onShow: function() {
    var cart = wx.getStorageSync('cart')
    var orders = cart
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

  toPay() {
    wx.showModal({
      title: '',
      content: '订单提交成功，等待卖家确认，卖家确认后将不能撤销！',
      text: 'center',
      showCancel:false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})