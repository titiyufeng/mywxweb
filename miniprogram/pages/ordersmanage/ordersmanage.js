// miniprogram/pages/ordersmanage/ordersmanage.js

var util = require("../../utils/util.js");
var app = getApp()

Page({
  data: {
    status_list: ["已提交", "已确认", "已发货", "已结款", "已撤销"],
    statusIndex: 0,
    listData: [],
    pagenum: 1,
    show: true,
    startdate: '2018-05-12',
    enddate: '2037-09-01',
    startTimestamp: 0,
    endTimestamp: 0,
    mobile: ''
  },
  onLoad: function() {
    var curent_date = Date.parse(new Date()) / 1000
    var startdate = util.formatTime(curent_date, 'Y-M-D')
    var enddate = util.formatTime(curent_date, 'Y-M-D')
    this.setData({
      startdate: startdate,
      enddate: enddate,
      startTimestamp: Date.parse(new Date(startdate + ' 00:00:00')) / 1000,
      endTimestamp: Date.parse(new Date(enddate + ' 23:59:59')) / 1000,
    })
  },
  onShow: function() {
    var listData = []
    var pagenum = 1
    this.get_orders(listData, pagenum)
    this.setData({
      pagenum: 2
    })
  },
  /**
   *获取订单数据
   */
  get_orders: function(listData, pagenum) {
    var status = {
      "0": "已提交",
      "1": "已确认",
      "2": "已发货",
      "3": "已结款",
      "4": "已撤销"
    }
    wx.cloud.callFunction({
        // 云函数名称
        name: 'myfunc',
        // 传给云函数的参数
        data: {
          $url: 'm_get_orders',
          startTimestamp: this.data.startTimestamp,
          pagenum: pagenum,
          mobile: this.data.mobile,
          endTimestamp: this.data.endTimestamp,
          curent_status: String(this.data.statusIndex)
        },
      })
      .then(res => {
        var tmplistData = []
        tmplistData = res.result.result.data
        if (tmplistData.length > 0) {
          for (var i = 0; i < tmplistData.length; i++) {
            tmplistData[i].create_time = util.formatTime(tmplistData[i].create_time, 'Y-M-D h:m:s')
            tmplistData[i].status = status[tmplistData[i].status]
          }
        }
        listData = listData.concat(tmplistData)
        this.setData({
          listData: listData,
        })
      })
  },

  onReachBottom: function() {
    var listData = this.data.listData
    var pagenum = this.data.pagenum

    this.get_orders(listData, pagenum)
    this.setData({
      pagenum: pagenum + 1
    })
  },

  /**
   *上拉触底事件：加载第二页 
   */
  // onReachBottom() {
  //   wx.showLoading({
  //     title: '加载中',
  //   })
  //   var status = {
  //     "0": "已提交",
  //     "1": "已确认",
  //     "2": "已发货",
  //     "3": "已结款",
  //     "4": "已撤销"
  //   }
  //   var that = this
  //   var openid = app.globalData.openid
  //   var manager_openid = wx.getStorageSync('manager_openid')
  //   var curent_status = String(that.data.statusIndex)
  //   var tmp_listData
  //   var pagenum = that.data.pagenum
  //   var mobile = that.data.mobile

  //   const _ = app.dbconn.command
  //   for (var i = 0; i < manager_openid.length; i++) {
  //     if (openid == manager_openid[i]) {
  //       if (mobile) { //判断是否有手机号码，如果有则指定手机号码查询，如果没有则查询全部
  //         app.dbconn.collection('order').where({
  //           delete_time: 0,
  //           create_time: _.and(_.gte(that.data.startTimestamp), _.lte(that.data.endTimestamp)),
  //           status: curent_status,
  //           mobile: _.eq(mobile)
  //         }).orderBy('create_time', 'desc').skip(pagenum * 20).limit(20).get({
  //           success: function(res) {
  //             if (res.data.length > 0) {
  //               var tmp_listData = res.data
  //               for (var i = 0; i < tmp_listData.length; i++) {
  //                 tmp_listData[i].create_time = util.formatTime(tmp_listData[i].create_time, 'Y-M-D h:m:s')
  //                 tmp_listData[i].status = status[tmp_listData[i].status]
  //               }
  //               var listData = that.data.listData
  //               var total_listData = []
  //               for (var i in listData) {
  //                 total_listData.push(listData[i])
  //               }
  //               var total_listData = total_listData.concat(tmp_listData)
  //               that.setData({
  //                 listData: total_listData,
  //                 pagenum: pagenum + 1
  //               })
  //             } else {
  //               wx.showToast({
  //                 icon: 'none',
  //                 title: '没有更多数据啦！'
  //               })
  //             }
  //           },
  //           fail: console.error
  //         })
  //       } else {
  //         app.dbconn.collection('order').where({
  //           delete_time: 0,
  //           create_time: _.and(_.gte(that.data.startTimestamp), _.lte(that.data.endTimestamp)),
  //           status: curent_status
  //         }).orderBy('create_time', 'desc').skip(pagenum * 20).limit(20).get({
  //           success: function(res) {
  //             if (res.data.length > 0) {
  //               var tmp_listData = res.data
  //               for (var i = 0; i < tmp_listData.length; i++) {
  //                 tmp_listData[i].create_time = util.formatTime(tmp_listData[i].create_time, 'Y-M-D h:m:s')
  //                 tmp_listData[i].status = status[tmp_listData[i].status]
  //               }
  //               var listData = that.data.listData
  //               var total_listData = []
  //               for (var i in listData) {
  //                 total_listData.push(listData[i])
  //               }
  //               var total_listData = total_listData.concat(tmp_listData)
  //               that.setData({
  //                 listData: total_listData,
  //                 pagenum: pagenum + 1
  //               })
  //             } else {
  //               wx.showToast({
  //                 icon: 'none',
  //                 title: '没有更多数据啦！'
  //               })
  //             }
  //           },
  //           fail: console.error
  //         })
  //       }
  //       break
  //     }
  //   }
  //   wx.hideLoading()
  // },

  /***
   *跳转修改订单 
   */
  update_order: function(e) {
    var url = '/pages/ordersmanage/order_manage_update/order_manage_update?_id=' + e.target.id
    wx.navigateTo({
      url: url
    })
  },
  /***
   *跳转修改订单详情
   */
  update_orderdetail: function(e) {
    var url = '/pages/ordersmanage/orderdetail_manage_update/orderdetail_manage_update?order_id=' + e.currentTarget.dataset.order_id + '&_id=' + e.currentTarget.dataset._id
    wx.navigateTo({
      url: url
    })
  },
  /**
   *切换订单状态 
   */
  statusChange: function(e) {
    this.setData({
      statusIndex: e.detail.value
    })
  },

  /**
   * 选择开始日期
   */
  bindStartDateChange: function(e) {
    this.setData({
      startdate: e.detail.value,
      startTimestamp: Date.parse(new Date(e.detail.value + ' 00:00:00')) / 1000,
    })
  },

  /**
   * 选择结束日期
   */
  bindEndDateChange: function(e) {
    this.setData({
      enddate: e.detail.value,
      endTimestamp: Date.parse(new Date(e.detail.value + ' 23:59:59')) / 1000,
    })
  },
  /**
   * 搜索订单
   */
  formSubmit: function(e) {
    this.data.mobile = e.detail.value.mobile
    // var mobile = e.detail.value.mobile
    var that = this
    that.setData({
      // pagenum:0
    })
    that.onShow()
  }
})