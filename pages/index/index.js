var goodsdata = require("../../resouce/goodsdata.js");
Page({
  data: { 
    topNum: 0,
    cateItems: goodsdata.cateItems,
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
      curIndex: index,
      topNum: this.data.topNum = 0
    })
  },
  goToSouSuo: function () {
    wx.navigateTo({
      url: '../search/search',
    })
  }
})  
