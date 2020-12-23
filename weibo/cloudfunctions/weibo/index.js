// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// db 必循初始化后才可用
const db = wx.cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  let content = event.content;
  let author = event.author;
  let location = event.location;
  await db.collection('publishData').add({
    data: {
      content: content,
      location: location,
      author: author
    }
  })
  return 'aaa'
}