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


  app.router('u_insert_orders', async (ctx) => {
    const cloud = require('wx-server-sdk')
    cloud.init()
    const db = cloud.database()
      try {
        return await db.collection('order').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            description: "learn cloud database",
            due: new Date("2018-09-01"),
            tags: [
              "cloud",
              "database"
            ],
            // 位置（113°E，23°N）
            location: new db.Geo.Point(113, 23),
            done: false
          }
        })
      } catch (e) {
        console.error(e)
      }

    ctx.body = {
      code: 0,
      data: {
        book: 1,
        isBorrowed: 22,
        re_data: event.data,
        message: 'u_insert_orders'
      }
    }
  });

  return app.serve();
}