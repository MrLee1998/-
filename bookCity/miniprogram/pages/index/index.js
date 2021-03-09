//index.js
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
   books: [],
   page: 0
  },
  onPullDownRefresh() {
    this.getList(true)
  },
  onReachBottom() {
    console.log('触底了, 加载下一页');
    this.setData({
      page: this.data.page + 1
    }, () => {
      this.getList()
    })
  },
  getList(init) {
    wx.showLoading()
    //  init 判断是不是初始化 初始化直接渲染 不考虑分页
    if(init) {
      this.setData({
        page: 0
      })
    }
    const PAGE = 3
    const offset = this.data.page * PAGE
    let ret = db.collection('doubanbooks').orderBy('create_time', 'desc')
    if(this.data.page > 0) {
      ret = ret.skip(offset)
    }
    ret = ret.limit(PAGE).get().then(res => {
      // console.log(res);
      if(init) {
        this.setData({
          books: res.data
        })
      } else {
        //  加载下一页
        this.setData({
          books: [...this.data.books, ...res.data]
        })
      }
      wx.hideLoading()
    })
  
  },
  onLoad: function() {
    this.getList(true)
  },

  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  },

  onGetUserInfo: function(e) {

  },

  onGetOpenid: function() {
    // 调用云函数
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
  },

})
