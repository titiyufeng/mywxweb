// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({ event })

  app.router('u_insert_orders', async (ctx, next) => {
    await next();
  }, async (ctx, next) => {
    await next();
  }, async (ctx) => {
    ctx.body = {
      code: 0,
      message: 'u_insert_orders'
    }
  });

  app.router('m_update_orders', async (ctx, next) => {
    await next();
  }, async (ctx, next) => {
    await next();
  }, async (ctx) => {
    ctx.body = {
      code: 0,
      message: 'm_update_orders'
    }
  });
  return app.serve(); 
}