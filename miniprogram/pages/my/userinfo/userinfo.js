// miniprogram/pages/my/userinfo/userinfo.js
var util = require("../../../utils/util.js");
var app = getApp()

Page({
  data: {
    showTopTips: false,
    isAgree: false,
    isActive: false,
    err_msg: '信息提交错误，所有信息不能为空',
    is_disabled: '', //判断用户信息是否可编辑
    user_id: '', //对应user表中的_id字段
    username: '',
    mobile: '',
    province: '', //省
    city: '', //市
    detail_address: '',
    birthday: ""
  },
  onLoad: function(options) {
    var that = this
    app.dbconn.collection('user').where({
      openid: app.globalData.openid
    }).get({
      success: function(res) {
        if (res.data.length == 1) {
          that.setData({
            user_id: res.data[0]._id
          })
          if (res.data[0].username) {
            that.setData({
              is_disabled: true,
              // user_id: res.data[0]._id,
              username: res.data[0].username,
              mobile: res.data[0].mobile,
              province: res.data[0].province,
              city: res.data[0].city,
              detail_address: res.data[0].detail_address,
              birthday: util.formatTime(res.data[0].birthday, 'Y-M-D')
            })
          }
        } else {
          console.log("获取_id失败！")
        }

      },
      fail: console.error
    })
  },

  /**
   * 提交用户信息
   */
  formSubmit: function(e) {
    var user_id = e.detail.value.user_id
    var username = e.detail.value.username
    var mobile = e.detail.value.mobile
    var user_city = e.detail.value.user_city
    var detail_address = e.detail.value.detail_address
    var birthday = e.detail.value.birthday

    console.log("user_id:" + user_id)
    console.log("username:" + username)
    console.log("mobile:" + mobile)
    console.log("user_city:" + user_city)
    console.log("detail_address:" + detail_address)
    console.log("birthday:" + birthday)

    // //将生日转成时间戳
    var birthday = Date.parse(new Date(birthday)) / 1000;;

    if (username.length == 0 || mobile.length == 0 || user_city.length == 0 || detail_address.length == 0 || birthday.length == 0) {
      this.showTopTips('信息提交错误，所有信息不能为空')
    } else if (mobile.length != 11) {
      this.showTopTips('手机号码错误')
    } else {
      app.dbconn.collection('user').doc(user_id).update({
        data: {
          username: username,
          gender: wx.getStorageSync("userinfo").gender,
          mobile: mobile,
          birthday: birthday,
          province: this.data.province,
          city: this.data.city,
          detail_address: detail_address,
          udpate_time: Date.parse(new Date()) / 1000
        },
        success: function(res) {
          console.log("用户信息更新成功，更新记录数为：" + res.stats.updated + "条！")
          wx.showModal({
            content: '提交成功！',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.navigateBack({
                  // delta: 2
                })
              }
            }
          })
        },
        fail: console.error
      })
    }
  },

  /**
   * 显示页面错误提示信息
   */
  showTopTips: function(err_msg) {
    var that = this;
    this.setData({
      showTopTips: true,
      err_msg: err_msg
    });
    setTimeout(function() {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },

  /**
   * 选择出生日期
   */
  bindDateChange: function(e) {
    this.setData({
      birthday: e.detail.value
    })
  },

  /**
   * 以下两个方法，是选择省与城市的方法
   */
  handleClick: function() {
    this.setData({
      isActive: true
    });
  },
  handleSelect: function(event) {
    console.log(event.detail);
    var province = event.detail[0]
    var city = event.detail[1].fullname
    this.setData({
      isActive: false,
      province: province,
      city: city
    });
  }
})