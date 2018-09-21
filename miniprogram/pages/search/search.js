// pages/search/search.js
var goodsdata = require("../../resouce/goodsdata.js");

Page({
  data: {
    searchtext: '',
    searchlist:[]
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
  }
})