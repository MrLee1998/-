// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = 'lizun-9gtuuwmq812c470e'

cloud.init()
const db = cloud.database({ env })
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  // const publishDataIndex = event.publishDataIndex
  const praiseUser = event.praiseUser
  const pariseId = event.pariseId
  console.log(praiseUser);
  return await db.collection('publishData').doc(pariseId).update({
    data: {
      praiseUser: _.push(praiseUser)
    }
  })
}