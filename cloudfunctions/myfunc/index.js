// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const app = new TcbRouter({event})

  // app.router('u_insert_orders', async(ctx, next) => {
  //   console.log(2222222222222);
  //   await next();

  // }, async(ctx, next) => {
  //   console.log(3333333333333);
  //   await next();

  // }, async(ctx) => {
  //   ctx.body = {
  //     code: 0,
  //     message: 'u_insert_orders'
  //   }
  // });

  // app.router('u_insert_orders', async (ctx) => {
  //     let result = await db.collection('book').doc(event.id).get()
  //     // 检查是否为已借书籍
  //     let result2 = await db.collection('borrow').where({
  //       bookId: event.id,
  //       userId: event.userId,
  //       status: 0
  //     }).count()
  //     ctx.body = {
  //       code: 0,
  //       data: {
  //         book: 1,
  //         isBorrowed: 22,
  //         re_data:event.data,
  //         message: 'u_insert_orders'
  //       }
  //     }
  // });


  app.router('u_insert_orders', async(ctx) => {
    const cloud = require('wx-server-sdk')
    cloud.init()
    const db = cloud.database()
    await db.collection('order').add({
      data: {
        openid:event.req_data.openid,
        order_id: event.order_id,
        logistics_id: '', //运单号
        logistics_fee: 0, //运费
        status: '0',
        create_time: Date.parse(new Date()) / 1000,
        delete_time: 0,
        udpate_time: Date.parse(new Date()) / 1000,
        username: event.req_data.username,
        mobile: event.req_data.mobile,
        province: event.req_data.province,
        city: event.req_data.city,
        detail_address: event.req_data.detail_address,
        amout: event.req_data.total,
        real_amout: event.req_data.total,
      }
    })
    ctx.body = {
      code: 0,
      req_data: event.req_data
    }
  });

  return app.serve();
}