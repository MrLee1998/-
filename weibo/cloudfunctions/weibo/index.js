// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// db 必循初始化后才可用
const db = wx.cloud.database();
// const got = require('got')
// const APPID = 'wxee5934d1dea22e76'
// const APPSECRET = '29d7e784e81966141e9bb593c06432d0'

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);
  const content = event.content;
  const author = event.author;
  const location = event.location;
   return await db.collection('publishData').add({
    data: {
      content: content,
      location: location,
      author: author
    }
  })
}