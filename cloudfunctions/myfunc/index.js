// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const app = new TcbRouter({event})
  
  app.router('m_get_orders', async(ctx) => {
    const cloud = require('wx-server-sdk')
    cloud.init()
    const db = cloud.database()
    const _ = db.command

    var result = []

    if(!(event.mobile)){
      result = await db.collection('order').where({
        delete_time: 0,
        create_time: _.and(_.gte(event.startTimestamp), _.lte(event.endTimestamp)),
        status: event.curent_status
      }).get()
    }else{

    }
    

    ctx.body = {
      code: 0,
      result: result
    }
  });

  return app.serve();
}