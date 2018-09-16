Page({
  data: {
    cateItems: [
      {
        cate_id: 0,
        cate_name: "热门",
        ishaveChild: true,
        children:
          [
            {
              spu_no: 10000001,
              goods_name: '洁面皂',
              price: 100,
              is_display:true,
              stock_quantity:9999,
              frozen_quantity:0,
              is_hot:false,
              goods_detail:"商品详细描述信息",
              image: "http://mz.djmall.xmisp.cn/files/logo/20161208/148117972563.jpg"
            },
            {
              spu_no: 10000002,
              goods_name: '卸妆',
              price: 100,
              is_display: true,
              stock_quantity: 9999,
              frozen_quantity: 0,
              is_hot: false,
              goods_detail: "商品详细描述信息",
              image: "../../resouce/10000002/10000002.png"
            }
          ]
      }, {
        cate_id: 1,
        cate_name: "洁面",
        ishaveChild: true,
        children:
          [
            {
              spu_no: 10000001,
              goods_name: '洁面皂',
              price: 100,
              is_display: true,
              stock_quantity: 9999,
              frozen_quantity: 0,
              is_hot: false,
              goods_detail: "商品详细描述信息",
              image: "../../resouce/10000001/10000001.png"
            },
            {
              spu_no: 10000002,
              goods_name: '卸妆',
              price: 100,
              is_display: true,
              stock_quantity: 9999,
              frozen_quantity: 0,
              is_hot: false,
              goods_detail: "商品详细描述信息",
              image: "../../resouce/10000002/10000002.png"
            }
          ]
      },
      {
        cate_id: 2,
        cate_name: "爽肤水",
        ishaveChild: true,
        children:
          [
            {
              spu_no: 20000001,
              goods_name: '气垫bb',
              price: 100,
              is_display: true,
              stock_quantity: 9999,
              frozen_quantity: 0,
              is_hot: false,
              goods_detail: "商品详细描述信息",
              image: "http://mz.djmall.xmisp.cn/files/logo/20161212/14815381301.jpg"
            },
            {
              spu_no: 20000002,
              goods_name: '修容/高光',
              price: 100,
              is_display: true,
              stock_quantity: 9999,
              frozen_quantity: 0,
              is_hot: false,
              goods_detail: "商品详细描述信息",
              image: "http://mz.djmall.xmisp.cn/files/logo/20161212/14815381411.jpg"
            }
          ]
      },
      {
        cate_id: 3,
        cate_name: "精华",
        ishaveChild: true,
        children:
          [
            {
              spu_no: 30000001,
              goods_name: '淡香水EDT',
              price: 100,
              is_display: true,
              stock_quantity: 9999,
              frozen_quantity: 0,
              is_hot: false,
              goods_detail: "商品详细描述信息",
              image: "http://mz.djmall.xmisp.cn/files/logo/20161213/14815978910.jpg"
            },
            {
              spu_no: 30000002,
              goods_name: '浓香水EDP',
              price: 100,
              is_display: true,
              stock_quantity: 9999,
              frozen_quantity: 0,
              is_hot: false,
              goods_detail: "商品详细描述信息",
              image: "http://mz.djmall.xmisp.cn/files/logo/20161213/148159789883.jpg"
            }
          ]
      },
      {
        cate_id: 4,
        cate_name: "乳液",
        ishaveChild: false,
        children: []
      },
      {
        cate_id: 5,
        cate_name: "面膜",
        ishaveChild: false,
        children: []
      },
      {
        cate_id: 6,
        cate_name: "面霜",
        ishaveChild: false,
        children: []
      },
      {
        cate_id: 7,
        cate_name: "眼霜",
        ishaveChild: false,
        children: []
      },
      {
        cate_id: 8,
        cate_name: "防晒",
        ishaveChild: false,
        children: []
      },
      {
        cate_id: 9,
        cate_name: "彩妆",
        ishaveChild: false,
        children: []
      },
      {
        cate_id: 10,
        cate_name: "套盒",
        ishaveChild: false,
        children: []
      },
      {
        cate_id: 11,
        cate_name: "日用",
        ishaveChild: false,
        children: []
      },
      {
        cate_id: 12,
        cate_name: "儿童",
        ishaveChild: false,
        children: []
      },
      {
        cate_id: 13,
        cate_name: "保健品",
        ishaveChild: false,
        children: []
      },
      {
        cate_id: 14,
        cate_name: "食品",
        ishaveChild: false,
        children: []
      },
      {
        cate_id: 15,
        cate_name: "其他",
        ishaveChild: false,
        children: []
      }
    ],
    curNav: 0,
    curIndex: 0
  },

  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  }
})  