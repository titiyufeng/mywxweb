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

  //获取用户输入的密码
  getdata: function (e) {
    console.log(this.data.searchtext);
  },

  ceshi: function () {
    dbconn.collection('goods_types').where({
      cate_id: 0
    })
      .get({
        success: function (res) {
          // res.data 是包含以上定义的两条记录的数组
          console.log(res.data[0]["cate_name"])
          var aaa = res.data[0]["cate_name"]
          this.setData({
            aaa :"123"
          })
        
        }
      })
  }
})