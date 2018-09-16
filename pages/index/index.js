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
              image: "../../resouce/type_select.png"
            }
          ]
      }, {
        cate_id: 1,
        cate_name: "护肤",
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
              image: "../../resouce/1/10000001.png"
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
              image: "../../resouce/type_select.png"
            }
          ]
      },
      {
        cate_id: 2,
        cate_name: "彩妆",
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
        cate_name: "香水/香氛",
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
        cate_name: "个人护理",
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