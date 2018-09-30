// pages/search/search.js
var util = require("../../utils/util.js");

var app = getApp()

Page({
  data: {
    searchtext: '',
    searchlist: [],
    wechat_id: "",
    wechat_name: "",
    page_text: "" //搜索结果为空白时候显示的内容，首次进入显示为空，无结果时候显示为“没有找到对应的商品”
  },
  //获取用户输入关键字
  searchtextInput: function(e) {
    this.setData({
      searchtext: e.detail.value
    })
  },
  onLoad: function(options) {
    this.setData({
      wechat_name: app.globalData.wechat_id,
      wechat_id: app.globalData.wechat_id
    })
  },

  //搜索商品
  getdata: function(e) {
    this.setData({
      result_list: [], //先将列表清空，然后重新加载
      page_text: "" //先将页面文案置空，然后重新加载
    })
    var searchtext = this.data.searchtext //获取用户输入
    if (searchtext.length == 0) { //获取用户输入，如果为空则返回空列表，如果不为空则正常查找结果并返回
      this.setData({
        result_list: [],
        page_text: ""
      })
    } else {
      const _ = app.dbconn.command
      var that = this;
      var result_list = new Array();
      app.dbconn.collection('goods_datas').where({
        is_display: true,
        cate_id: _.gt(0)
      }).get({
        success: function(res) {
          var goodslist = res.data
          for (var i = 0; i < goodslist.length; i++) {
            if (goodslist[i]["goods_name"].indexOf(searchtext) != -1) {
              result_list.push(goodslist[i])
            }
          }
          if (result_list.length == 0) {
            that.setData({
              page_text: "没有找到对应的商品"
            })
          }
          that.setData({
            result_list: result_list
          })
        }
      })
    }
  }
})