const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function goToSouSuo () {  
  
  console.log(123);
  return 888888888888;
}

function get_db_conn(){
  var dbconn = wx.cloud.database({
    env: 'mywxweb-e946c5'
  })
  return dbconn;
}

module.exports = {
  formatTime: formatTime,
  goToSouSuo: goToSouSuo,
  get_db_conn: get_db_conn
}
