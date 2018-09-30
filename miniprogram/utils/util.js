const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

var config = new Map();

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 获取数据库连接
 */
function get_db_conn() {
  var dbconn = wx.cloud.database({
    env: 'mywxweb-e946c5'
  })
  return dbconn;
}

function test(){
  that = this
  var dbconn = get_db_conn()
  dbconn.collection('config').get({
    success: function (res) {
      this.config.appid = res.data[0]["appid"]
      var secret = res.data[0]["secret"]
      console.log(appid)
      return 123
    }
  })

  return that.config
}


module.exports = {
  formatTime: formatTime,
  get_db_conn: get_db_conn,
  test: test
}