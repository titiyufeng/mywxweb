// pages/search/search.js
var goodsdata = require("../../resouce/goodsdata.js");
var get_db_conn = require("../../utils/util.js");

//获取数据库连接
var dbconn = get_db_conn.get_db_conn();

Page({
  data: {
    searchtext: '',
    searchlist:[],
    aaa:"234234"
  },
  //获取用户输入关键字
  searchtextInput: function (e) {
    this.setData({
      searchtext: e.detail.value
    })
  },

  //搜索商品
  getdata: function (e) {

    this.setData({
      result_list: []//先将列表清空，然后重新加载
    })

    var searchtext = this.data.searchtext //获取用户输入
    const _ = dbconn.command
    var that = this;
    var result_list = new Array();
    dbconn.collection('goods_datas').where({
      is_display: true,
      cate_id: _.gt(0)
    }).get({
      success: function (res) {
        var goodslist = res.data
        for (var i = 0; i < goodslist.length;i++){
          if (goodslist[i]["goods_name"].indexOf(searchtext) != -1){
            result_list.push(goodslist[i])
          }
        }
        that.setData({
          result_list: result_list
        }
        )
      }
    })
  }
})