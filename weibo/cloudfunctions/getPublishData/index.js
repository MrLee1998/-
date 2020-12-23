const cloud = require('wx-server-sdk')
const env = 'lizun-9gtuuwmq812c470e'

cloud.init()
const db = cloud.database({ env })

// 云函数入口函数
exports.main = async (event, context) => {
  let result =  await db.collection('publishData').get()
  return result
}