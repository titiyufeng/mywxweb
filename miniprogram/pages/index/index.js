
var util = require("../../utils/util.js");
var app = getApp()

Page({
  data: {
    topNum: 0,
    cateItems: [], //左侧导航
    cateItems_goods_list: [], //右侧商品列表
    curNav: 0,
    curIndex: 0
  },

  /*
   获取右侧商品列表、微信信息
   */
  get_right_goodslist: function(id) { 
    const _ = app.dbconn.command
    var that = this;

    //判断是否是热门tab，如是过热门tab则不需要过滤商品类型，如果不是热门tab需要过滤商品类型
    if (id != 0) {
      app.dbconn.collection('goods_datas').where({
        cate_id: id,
        is_display: 1,
        stock_quantity: _.gt(0)
      }).limit(50).get({
        success: function(res) {
          var right_goodslist = res.data
          that.setData({
            right_goodslist: right_goodslist
          })
        }
      })
    } else {
      app.dbconn.collection('goods_datas').where({
        is_hot: 1,
        is_display: 1,
        stock_quantity: _.gt(0)
      }).limit(50).get({
        success: function(res) {
          var right_goodslist = res.data
          that.setData({
            right_goodslist: right_goodslist
          })
        }
      })
    }
  },

  onLoad: function(options) {
    var cateItems_db = new Array()
    var that = this;
    app.dbconn.collection('goods_types').limit(50).get({
      success: function(res) {
        var rs_data = res.data
        cateItems_db = rs_data
        that.setData({
          cateItems: cateItems_db
        })
      }
    })
    this.get_right_goodslist(0)
  },

  //事件处理函数
  switchRightTab: function(e) {
    // 获取item项的id，和数组的下标值
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index
    this.setData({
      curNav: id,
      curIndex: index,
      topNum: this.data.topNum = 0,
      right_goodslist: [] //先将右侧列表清空，然后重新加载
    })
    this.get_right_goodslist(id)
  }
})