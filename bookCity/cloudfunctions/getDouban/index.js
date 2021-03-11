// 云函数入口文件
const axios = require('axios')
const cheerio = require('cheerio')
const cloud = require('wx-server-sdk')
const doubanbook = require('doubanbook')
cloud.init()

async function searchDouban(isbn) {
  const url = 'https://book.douban.com/subject_search?search_text='+isbn
  let searchInfo = await axios.get(url)
  // console.log(searchInfo.data);
  //  获取window._DATA_ = 后面的数据
  let reg = /window\.__DATA__ = "(.*)"/
  if(reg.test(searchInfo.data)) {
    let searchData = doubanbook(RegExp.$1)[0]
    // console.log(searchData);
    return searchData
  }
}

async function getDouban(isbn) {
  //  根据 isbn 查询豆瓣url
  let detailInfo = await searchDouban(isbn)
  console.log(detailInfo.title, detailInfo.rating.value);
  let detailPage = await axios.get(detailInfo.url)
  // cheerio 在node里， 使用jquery的语法 解析文档
  const $ = cheerio.load(detailPage.data)
  const info = $('#info').text().split('\n').map(v => v.trim()).filter(v => v)
  let author = info[1]
  let publish = info[4]
  let infoDetail = info
  let tags = []
  $('#db-tags-section a.tag').each((i, v) => {
    tags.push({
      title: $(v).text()
    })
  })
  let comments = []
  $('#comment-list-wrapper .comment').each((i, v) => {
    comments.push({
      author: $(v).find('.comment-info a').text(),
      content: $(v).find('.comment-content').text(),
      date: $(v).find('.comment-time').text(),
    })
  })
  console.log(comments);
  const ret = {
    create_time: new Date().getTime(),
    title: detailInfo.title,
    rate: detailInfo.rating.value,
    image: detailInfo.cover_url,
    url: detailInfo.url,
    summary: $('#link-report .intro').text(),
    tags,
    author,
    comments,
    infoDetail,
    publish
  }
  // console.log(ret);
  return ret
}
// 云函数入口函数
console.log(getDouban('9787010009148'));
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const {isbn} = event
  // const isbn = '9787010009148'
  return getDouban(isbn)
}