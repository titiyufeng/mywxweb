// miniprogram/pages/my/userinfo/userinfo.js
Page({
  data: {
    showTopTips: false,
    date: "2016-01-01",
    isAgree: false,
    isActive: false,
    currentCity: ''
  },
  onLoad: function (options) {

  },
  showTopTips: function() {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function() {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },

  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  handleClick: function () {
    this.setData({
      isActive: true
    });
  },
  handleSelect: function (event) {
    console.log(event.detail);
    this.setData({
      isActive: false,
      currentCity: event.detail.fullname
    });
  }
})