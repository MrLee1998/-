const cloud = require('wx-server-sdk')
const env = 'lizun-9gtuuwmq812c470e'

cloud.init()
const db = cloud.database({ env })

// 云函数入口函数
exports.main = async (event, context) => {
  let content = event.content;
  let author = event.author;
  let location = event.location;
  let chooseImages = event.chooseImages
  let imageNum = event.imageNum
  let currentTime = event.currentTime
  let chooseVideo = event.chooseVideo
  let type = event.type
  let device = event.device
  return await db.collection('publishData').add({
    data: {
      content: content,
      location: location,
      author: author,
      chooseImages: chooseImages,
      imageNum: imageNum,
      currentTime: currentTime,
      chooseVideo: chooseVideo,
      type: type,
      device: device
    }
  })
}