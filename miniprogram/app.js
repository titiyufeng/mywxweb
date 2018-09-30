//app.js
App({
  onLaunch: function() {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    //全局变量
    this.globalData = {
      env: 'mywxweb-e946c5' //云环境配置信息，注意切换
    }
    //全局数据库连接
    this.dbconn = wx.cloud.database({
      env: this.globalData.env
    })

    
    /**
     * 下面的这段代码的作用是
     * 1、获取数据库全局配置信息，并将不可能有变化的信息放入缓存，如appid，将可能有变化的数据放入全局变量globalData中，获取secret（获取一次）
     * 2、检查缓存中是否有openid，如果有则说明该用户已经有了登录态，如果没有则获取用户登录态（获取用户的openid），紧接着判断openid是否已经在系统中存在，如果不存在则在user表中
     *    增加一条记录，如果存在，什么都不做
     */
    var that = this
    this.dbconn.collection('config').get({
      success: function(res) {
        //将不敏感信息放入app全局变量中（如果有可能有变化就不能放在缓存中）
        that.globalData.appid = res.data[0]["appid"]
        that.globalData.final_text = res.data[0]["final_text"]
        that.globalData.wechat_id = res.data[0]["wechat_id"]
        that.globalData.wechat_name = res.data[0]["wechat_name"]

        //将配置信息放入缓存
        wx.setStorageSync('appid', res.data[0]["appid"])

        var secret = res.data[0]["secret"]

        //获取登录信息
        var openid = (wx.getStorageSync('openid'))
        if (openid) {
          console.log("缓存中已经有openid，自动获取登录态")
        } else {
          wx.login({
            success: function(res) {
              if (res.code) {
                withCredentials: true,
                wx.request({
                  //后台接口地址
                  url: 'https://api.weixin.qq.com/sns/jscode2session',
                  data: {
                    js_code: res.code,
                    appid: wx.getStorageSync('appid'),
                    secret: secret,
                    encryptedData: 'authorization_code',
                  },
                  method: 'GET',
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function(res) {
                    wx.setStorageSync('openid', res.data.openid)
                    //检查openid是否存在，如果存在什么都不做，如果不存在则创建用户信息：插入user表（id、openid，创建时间）
                    that.dbconn.collection('user').where({
                      openid: wx.getStorageSync('openid')
                    }).get({
                      success: function(res) {
                        if (res.data.length == 0) {
                          that.dbconn.collection('user').add({
                            data: {
                              openid: wx.getStorageSync('openid'),
                              create_date: Date.parse(new Date()) / 1000
                            },
                            success: function (res) {
                              console.log(res)
                              console.log("用户添加成功!")
                            },
                            fail: console.error
                          })
                        } else {
                          console.log("用户已经存在！")
                        }
                      },
                      fail: function(res) {
                        console.log(res.error)
                      }
                    })
                  },
                  fail: function(res) {
                    console.log("获取登录信息失败")
                  }
                })
              }
            }
          })
        }
      }
    })
  }
})