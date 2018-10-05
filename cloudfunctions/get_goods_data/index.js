// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const env = event.env
  const goods_no = event.goods_no
  const db = cloud.database({
    env: env
  })

  return await db.collection('goods_datas').where({
    goods_no: goods_no
  }).get()

}